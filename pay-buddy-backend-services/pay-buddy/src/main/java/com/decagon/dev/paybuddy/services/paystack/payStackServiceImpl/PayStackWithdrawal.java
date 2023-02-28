package com.decagon.dev.paybuddy.services.paystack.payStackServiceImpl;

import com.decagon.dev.paybuddy.dtos.requests.EmailSenderDto;
import com.decagon.dev.paybuddy.enums.TransactionType;
import com.decagon.dev.paybuddy.models.BankDetails;
import com.decagon.dev.paybuddy.models.Transaction;
import com.decagon.dev.paybuddy.models.User;
import com.decagon.dev.paybuddy.models.Wallet;
import com.decagon.dev.paybuddy.repositories.BankDetailsRepository;
import com.decagon.dev.paybuddy.repositories.TransactionRepository;
import com.decagon.dev.paybuddy.repositories.UserRepository;
import com.decagon.dev.paybuddy.repositories.WalletRepository;
import com.decagon.dev.paybuddy.services.EmailService;
import com.decagon.dev.paybuddy.services.paystack.PayStackWithdrawalService;
import com.decagon.dev.paybuddy.services.paystack.payStackPojos.*;
import com.decagon.dev.paybuddy.utilities.PayStackUtil;
import com.decagon.dev.paybuddy.utilities.UserUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class PayStackWithdrawal implements PayStackWithdrawalService {
    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
    private final BankDetailsRepository bankDetailsRepository;
    private final TransactionRepository walletTransactionRepository;
    private final EmailService emailService;
    private final UserUtil userUtil;
    private HttpHeaders headers;
    private String email ;
    private Wallet wallet;
    private User users;
    private BigDecimal requestAmount;
    private BankDetails bankDetails;
    private TransferRequest transferRequest;

    @Override
    public ResponseEntity<List<Bank>> getAllBanks() {
            RestTemplate restTemplate = new RestTemplate();
            BankDetailsResponse response = restTemplate.getForObject(PayStackUtil.GET_ALL_BANKS, BankDetailsResponse.class);

            List<BankResponseDto> banks = response.getData();
            List<Bank> bankList = new ArrayList<>();
            for (BankResponseDto bank : banks) {
                bankList.add(new Bank(bank.getName(), bank.getCode()));
            }
            return ResponseEntity.ok(bankList);
    }
    @Override
    public ResponseEntity<String> withDrawFromWallet(String account_number, String bank_code, BigDecimal amount) {
        email = userUtil.getAuthenticatedUserEmail();
        users = userRepository.findByEmail(email).get();
        wallet = walletRepository.findByUser_UserId(users.getUserId());
        requestAmount = amount;

        headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + PayStackUtil.SECRET_KEY);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> allBankResponse;
        //QUERY TO FETCH FULL BANK DETAILS USING ACCOUNT NUMBER AND CORRESPONDING BANK CODE
        try{
        allBankResponse = restTemplate.exchange(PayStackUtil.RESOLVE_BANK + "?account_number=" + account_number + "&bank_code=" + bank_code,
                HttpMethod.GET, new HttpEntity<>(headers), String.class);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Incorrect bank details", HttpStatus.BAD_REQUEST);
        }

        ObjectMapper mapper = new ObjectMapper();
        try {
            if (allBankResponse.getStatusCodeValue() == 200) {
                WithdrawalResponse verifiedBankDetails = mapper.readValue(allBankResponse.getBody(), WithdrawalResponse.class);
                Optional<User> user = userRepository.findByEmail(email);

         //VERIFY IF USER IS AUTHORIZED AND GET USER'S WALLET
                if (user.isPresent()) {
                    users = user.get();
                } else {return new ResponseEntity<>("User not Authorized to make this request", HttpStatus.UNAUTHORIZED);}

                wallet = walletRepository.findByUser_UserId(users.getUserId());

                if (verifyWithdrawalAmount(requestAmount) > 0)
                {
                    bankDetails = bankDetailsRepository.findByAccountNumberAndBankCode(account_number, bank_code);
                    TransferRecipient transferRecipient;
                    if (Objects.isNull(bankDetails))
                    {
          //IF BANK DETAILS IS NOT SAVED, SAVE IT AND PROCEED WITH TRANSACTION
                        bankDetails = new BankDetails();
                        //bankDetails.setWallet(users.getWallet());
                        bankDetails.setWallet(walletRepository.findByUser_UserId(users.getUserId()));

                        bankDetails.setAccountName(verifiedBankDetails.getData().getAccount_name());
                        bankDetails.setAccountNumber(verifiedBankDetails.getData().getAccount_number());
                        bankDetails.setBankCode(bank_code);
                        bankDetails.setBankId(verifiedBankDetails.getData().getBank_id());

                        bankDetailsRepository.save(bankDetails);
                        wallet.getBankDetails().add(bankDetails);
                        userRepository.save(users);

                    }
                    transferRecipient = TransferRecipient.builder()
                            .name(bankDetails.getAccountName())
                            .account_number(bankDetails.getAccountNumber())
                            .bank_code(bankDetails.getBankCode())
                            .email(email)
                            .amount(requestAmount)
                            .build();
                    return createTransferRecipient(transferRecipient);
                }else{
                    return new ResponseEntity<>("Insufficient Balance in your wallet", HttpStatus.BAD_REQUEST);
                    }
                }
                return new ResponseEntity<>("success", HttpStatus.ACCEPTED);
            } catch(IOException e){
                e.printStackTrace();
                return new ResponseEntity<>("Check your bank details", HttpStatus.BAD_REQUEST);
            }
        }

    @Override
    public ResponseEntity<String> verifyAccountNumber(String account_number, String bank_code) {
        headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + PayStackUtil.SECRET_KEY);
        RestTemplate restTemplate = new RestTemplate();
        String accountName;
        ResponseEntity<WithdrawalResponse> response = restTemplate.exchange(PayStackUtil.RESOLVE_BANK + "?account_number=" + account_number + "&bank_code=" + bank_code,
                HttpMethod.GET, new HttpEntity<>(headers), WithdrawalResponse.class);
        if (response.getStatusCodeValue() == 200){
            WithdrawalResponse withdrawalResponse;
            withdrawalResponse = response.getBody();
            accountName = withdrawalResponse.getData().getAccount_name();
            return new ResponseEntity<>(accountName, HttpStatus.ACCEPTED);
        }
        return  new ResponseEntity<>("Account number not found", HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<String> createTransferRecipient(TransferRecipient transferRecipient) {
        HttpEntity<TransferRecipient> request = new HttpEntity<>(transferRecipient, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<WithdrawalResponse> response = restTemplate.postForEntity(PayStackUtil.CREATE_TRANSFER_RECEIPIENT, request, WithdrawalResponse.class);
        if (response.getStatusCodeValue() == 201) {
            WithdrawalResponse transferRecipientResponse = response.getBody();
            String recipient = transferRecipientResponse.getData().getRecipient_code();
            transferRequest = TransferRequest.builder()
                    .recipient(recipient)
                    .amount(requestAmount)
                    .reference(PayStackUtil.generateTransactionReference())
                    .build();
            return initiateTransfer(transferRequest);
        }
        return new ResponseEntity<>("hello",HttpStatus.ACCEPTED);
    }

    public ResponseEntity<String> initiateTransfer(TransferRequest transferRequest){
        HttpEntity<TransferRequest> request = new HttpEntity<>(transferRequest, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(PayStackUtil.INITIATE_TRANSFER, request, String.class);
        WithdrawalResponse newResponse = new WithdrawalResponse();

        if(response.getStatusCodeValue()==200){
            updateWallet(requestAmount);
        return new ResponseEntity<>("Your account "+bankDetails.getAccountName()+": "+bankDetails.getAccountNumber()+" has been successfully credited with "+transferRequest.getAmount(),HttpStatus.OK);
        }
        return new ResponseEntity<>("Transfer Failed. Try again",HttpStatus.BAD_REQUEST);
    }
    //CHECKS IF AMOUNT TO BE WITHDRAWN IS LESS OR EQUAL TO WALLET BALANCE
    public int verifyWithdrawalAmount(BigDecimal amount){
        if(wallet.getAccountBalance().compareTo(amount)>=0)
            return 1;
        return -1;
    }

    public void updateWallet(BigDecimal amount){
        BigDecimal balance = wallet.getAccountBalance().subtract(amount);
        wallet.setAccountBalance(balance);
        walletRepository.save(wallet);

        Transaction walletTransaction = Transaction.builder()
                .wallet(wallet)
                .transactionType(TransactionType.WITHDRAWAL)
                .amount(amount)
                .transactionReference(transferRequest.getReference())
                .build();
        walletTransactionRepository.save(walletTransaction);

        EmailSenderDto mailDto = EmailSenderDto.builder()
                .to(users.getEmail())
                .subject("Wallet debit"+ " Your wallet has been debited with "+ amount)
                .content("A withdrawal of "+ amount+" has been sent to your account: "+bankDetails.getAccountName()+" "
                        +bankDetails.getAccountNumber()+ " Your new balance is now: "+ wallet.getAccountBalance()
                        +"Reference: "+ transferRequest.getReference())
                .build();
        emailService.sendMail(mailDto);
    }

}
