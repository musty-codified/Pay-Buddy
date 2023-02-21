package com.decagon.dev.paybuddy.serviceImpl;

import com.decagon.dev.paybuddy.dtos.requests.TransactionRequest;
import com.decagon.dev.paybuddy.dtos.responses.TransactionResponse;
import com.decagon.dev.paybuddy.enums.ResponseCodeEnum;
import com.decagon.dev.paybuddy.models.Transaction;
import com.decagon.dev.paybuddy.models.User;
import com.decagon.dev.paybuddy.models.Wallet;
import com.decagon.dev.paybuddy.repositories.UserRepository;
import com.decagon.dev.paybuddy.restartifacts.BaseResponse;
import com.decagon.dev.paybuddy.services.TransactionService;
import com.decagon.dev.paybuddy.utilities.ResponseCodeUtil;
import com.decagon.dev.paybuddy.utilities.UserUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class TransactionServiceImpl implements TransactionService {

    private final UserRepository userRepository;
    private final UserUtil userUtil;

    private final ResponseCodeUtil responseCodeUtil;
    @Override
    public BaseResponse viewTransaction() {

        String userEmail = userUtil.getAuthenticatedUserEmail();
        Optional<User> loggedInUser = userRepository.findByEmail(userEmail);

        if (loggedInUser.isPresent()){
            Wallet userWallet = loggedInUser.get().getWallet();
            List<Transaction> walletTransaction = userWallet.getTransaction();

            List<TransactionRequest> transactionList =  new ArrayList<>();

            TransactionRequest transactionRequest = new TransactionRequest();

            for (Transaction transaction: walletTransaction){
                transactionRequest.setAmount(transaction.getAmount());
                transactionRequest.setTransactionType(transaction.getTransactionType());
                transactionRequest.setDateOfTransaction(transaction.getDateOfTransaction());
                transactionRequest.setTransactionStatus(transaction.getTransactionStatus());
                transactionRequest.setDescription(transaction.getDescription());

                transactionList.add(transactionRequest);
            }

            TransactionResponse transactionResponse = TransactionResponse.builder()
                    .transactionResponseList(transactionList)
                    .build();

            return responseCodeUtil.updateResponseData(transactionResponse, ResponseCodeEnum.SUCCESS);
        }
        return responseCodeUtil.updateResponseData(new TransactionResponse(),ResponseCodeEnum.ERROR);
    }
}
