package com.decagon.dev.paybuddy.services.paystack;

import com.decagon.dev.paybuddy.services.paystack.payStackPojos.Bank;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.List;

public interface PayStackWithdrawalService {
    ResponseEntity<List<Bank>> getAllBanks();
    ResponseEntity<String> withDrawFromWallet(String account_number, String bank_code, BigDecimal amount);
}
