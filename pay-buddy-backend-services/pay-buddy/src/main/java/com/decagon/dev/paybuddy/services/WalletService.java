package com.decagon.dev.paybuddy.services;

import com.decagon.dev.paybuddy.dtos.requests.CreateTransactionPinDto;
import com.decagon.dev.paybuddy.dtos.requests.WithDrawalDto;
import com.decagon.dev.paybuddy.dtos.responses.WalletResponse;
import com.decagon.dev.paybuddy.restartifacts.BaseResponse;
import com.decagon.dev.paybuddy.services.paystack.payStackPojos.Bank;
import org.springframework.http.ResponseEntity;
import java.math.BigDecimal;
import java.util.List;

public interface WalletService {
    WalletResponse getWalletBalance();
    ResponseEntity<String> fundWallet(BigDecimal bigDecimal, String transactionType);
    ResponseEntity<String> verifyPayment(String reference, String transactionType);
    BaseResponse updateWalletPin(CreateTransactionPinDto createTransactionPinDto);
    ResponseEntity<List<Bank>> getAllBanks();
    ResponseEntity<String> walletWithdrawal(WithDrawalDto withDrawalDto);
    ResponseEntity<String> verifyAccountNumber(String account_number, String bank_code);

}
