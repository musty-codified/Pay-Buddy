package com.decagon.dev.paybuddy.services;

import com.decagon.dev.paybuddy.dtos.requests.CreateTransactionPinDto;
import com.decagon.dev.paybuddy.dtos.responses.WalletResponse;
import com.decagon.dev.paybuddy.models.Wallet;
import com.decagon.dev.paybuddy.restartifacts.BaseResponse;

import java.math.BigDecimal;

public interface WalletService {
    WalletResponse getWalletBalance();
    WalletResponse fundWallet(BigDecimal bigDecimal, String transactionType);
    BaseResponse updateWalletPin(CreateTransactionPinDto createTransactionPinDto);

}
