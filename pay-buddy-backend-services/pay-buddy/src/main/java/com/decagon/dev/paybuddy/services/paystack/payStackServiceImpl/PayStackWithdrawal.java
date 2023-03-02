package com.decagon.dev.paybuddy.services.paystack.payStackServiceImpl;

import com.decagon.dev.paybuddy.dtos.requests.EmailSenderDto;
import com.decagon.dev.paybuddy.dtos.requests.WithdrawalDto;
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


    private HttpHeaders getHeaders() {
        final HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + PayStackUtil.SECRET_KEY);
        return headers;
    }

    private User getUserObjectWithEmail() {
        final String email = userUtil.getAuthenticatedUserEmail();
        final Optional<User> dbUser = userRepository.findByEmail(email);
        return dbUser.isPresent() ? dbUser.get() : null;
    }

    @Override
    public ResponseEntity<List<Bank>> getAllBanks() {
        RestTemplate restTemplate = new RestTemplate();
        BankDetailsResponse response = restTemplate.getForObject(PayStackUtil.GET_ALL_BANKS, BankDetailsResponse.class);
        if(response != null){
            List<BankResponseDto> banks = response.getData();
            List<Bank> bankList = new ArrayList<>();

            for (BankResponseDto bank : banks) {
                bankList.add(new Bank(bank.getName(), bank.getCode()));
            }
            return ResponseEntity.ok(bankList);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @Override
    public ResponseEntity<String> withDrawFromWallet(WithdrawalDto withdrawalDto) {
        final User users = getUserObjectWithEmail();
        if(users == null) {
            return new ResponseEntity<>("User not found", HttpStatus.UNAUTHORIZED);
        }
        Wallet wallet = walletRepository.findByUser_UserId(users.getUserId());

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> allBankResponse;

        //QUERY TO FETCH FULL BANK DETAILS USING ACCOUNT NUMBER AND CORRESPONDING BANK CODE
        try {
            allBankResponse = restTemplate.exchange(PayStackUtil.RESOLVE_BANK
                            + "?account_number=" + withdrawalDto.getAccountNumber()
                            + "&bank_code=" + withdrawalDto.getBankCode(),
                    HttpMethod.GET, new HttpEntity<>(getHeaders()), String.class);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Incorrect bank details", HttpStatus.BAD_REQUEST);
        }

        if (!allBankResponse.getStatusCode().is2xxSuccessful()) {
            return new ResponseEntity<>("An error occurred", HttpStatus.BAD_REQUEST);
        }

        try {
            ObjectMapper mapper = new ObjectMapper();
            WithdrawalResponse verifiedBankDetails = mapper.readValue(allBankResponse.getBody(),
                    WithdrawalResponse.class);

            if (verifyWithdrawalAmount(withdrawalDto.getAmount(), wallet) > 0) {
                BankDetails bankDetails = bankDetailsRepository.findByAccountNumberAndBankCode(
                        withdrawalDto.getAccountNumber(), withdrawalDto.getBankCode());

                //IF BANK DETAILS IS NOT SAVED, SAVE IT AND PROCEED WITH TRANSACTION
                if (Objects.isNull(bankDetails)) {
                    bankDetails = new BankDetails();

                    bankDetails.setWallet(walletRepository.findByUser_UserId(users.getUserId()));
                    bankDetails.setAccountName(verifiedBankDetails.getData().getAccountName());
                    bankDetails.setAccountNumber(verifiedBankDetails.getData().getAccountNumber());
                    bankDetails.setBankCode(withdrawalDto.getBankCode());
                    bankDetails.setBankId(verifiedBankDetails.getData().getBankId());

                    bankDetailsRepository.save(bankDetails);
                    wallet.getBankDetails().add(bankDetails);
                }

                TransferRecipient transferRecipient = TransferRecipient.builder()
                        .name(bankDetails.getAccountName())
                        .accountNumber(bankDetails.getAccountNumber())
                        .bankCode(bankDetails.getBankCode())
                        .email(users.getEmail())
                        .amount(withdrawalDto.getAmount())
                        .build();

                return createTransferRecipient(transferRecipient, bankDetails, wallet);
            } else {
                    return new ResponseEntity<>("Insufficient Balance in your wallet", HttpStatus.BAD_REQUEST);
            }

        } catch(IOException e){
            e.printStackTrace();
            return new ResponseEntity<>("Check your bank details", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<String> verifyAccountNumber(String accountNumber, String bankCode) {
        ResponseEntity<WithdrawalResponse> response = new RestTemplate().exchange(PayStackUtil.RESOLVE_BANK +
                        "?account_number=" + accountNumber + "&bank_code=" + bankCode,
                HttpMethod.GET, new HttpEntity<>(getHeaders()), WithdrawalResponse.class);

        WithdrawalResponse withdrawalResponse = response.getBody();
        String accountName = withdrawalResponse.getData().getAccountName(); //TODO: this would throw a nullPointerException if Data is null

        if (response.getStatusCode().is2xxSuccessful()){
            return new ResponseEntity<>(accountName, HttpStatus.ACCEPTED);
        }
        return  new ResponseEntity<>("Account number not found", HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<String> createTransferRecipient(TransferRecipient transferRecipient, BankDetails bankDetails, Wallet wallet) {
        HttpEntity<TransferRecipient> request = new HttpEntity<>(transferRecipient, getHeaders());

        ResponseEntity<WithdrawalResponse> response = new RestTemplate().postForEntity(PayStackUtil.CREATE_TRANSFER_RECEIPIENT
                , request, WithdrawalResponse.class);

        WithdrawalResponse transferRecipientResponse = response.getBody();
        String recipient = transferRecipientResponse.getData().getRecipientCode(); //TODO: this would throw a nullPointerException if Data is null

        if (response.getStatusCode().is2xxSuccessful()) {
            TransferRequest transferRequest = TransferRequest.builder()
                    .recipient(recipient)
                    .amount(transferRecipient.getAmount())
                    .reference(PayStackUtil.generateTransactionReference())
                    .build();
            return initiateTransfer(transferRequest, bankDetails, wallet);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<String> initiateTransfer(TransferRequest transferRequest, BankDetails bankDetails, Wallet wallet){
        HttpEntity<TransferRequest> request = new HttpEntity<>(transferRequest, getHeaders());

        ResponseEntity<String> response = new RestTemplate().postForEntity(PayStackUtil.INITIATE_TRANSFER, request,
                String.class);

        if (response.getStatusCodeValue() == 200) {
            updateWallet(transferRequest, wallet, bankDetails);
            return new ResponseEntity<>("Your account "+bankDetails.getAccountName()+
                ": "+bankDetails.getAccountNumber()+" has been successfully credited with "
                +transferRequest.getAmount(),HttpStatus.OK);
        }
        return new ResponseEntity<>("Transfer Failed. Try again",HttpStatus.BAD_REQUEST);
    }

    //CHECKS IF AMOUNT TO BE WITHDRAWN IS LESS OR EQUAL TO WALLET BALANCE

    public int verifyWithdrawalAmount(BigDecimal amount, Wallet wallet){
        if(wallet.getAccountBalance().compareTo(amount)>=0)
            return 1;
        return -1;
    }

    public void updateWallet(TransferRequest transferRequest, Wallet wallet, BankDetails bankDetails){
        BigDecimal balance = wallet.getAccountBalance().subtract(transferRequest.getAmount());
        wallet.setAccountBalance(balance);
        walletRepository.save(wallet);

        Transaction walletTransaction = Transaction.builder()
                .wallet(wallet)
                .transactionType(TransactionType.WITHDRAWAL)
                .amount(transferRequest.getAmount())
                .transactionReference(transferRequest.getReference())
                .build();
        walletTransactionRepository.save(walletTransaction);

        EmailSenderDto mailDto = EmailSenderDto.builder()
                .to(wallet.getUser().getEmail())
                .subject("Wallet debit"+ " Your wallet has been debited with "+ transferRequest.getAmount())
                .content("A withdrawal of "+ transferRequest.getAmount()+" has been sent to your account: "+bankDetails.getAccountName()+" "
                        +bankDetails.getAccountNumber()+ " Your new balance is now: "+ wallet.getAccountBalance()
                        +"Reference: "+ transferRequest.getReference())
                .build();
        emailService.sendMail(mailDto);
    }
}
