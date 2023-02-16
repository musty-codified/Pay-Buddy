package com.decagon.dev.paybuddy.services;

import com.decagon.dev.paybuddy.dtos.requests.SendMoneyRequest;
import com.decagon.dev.paybuddy.dtos.responses.WalletResponse;

import java.math.BigDecimal;

public interface WalletService {
    WalletResponse getWalletBalance();
    WalletResponse sendMoney(SendMoneyRequest sendMoneyRequest);
    WalletResponse fundWallet(BigDecimal bigDecimal, String transactionType);
}
