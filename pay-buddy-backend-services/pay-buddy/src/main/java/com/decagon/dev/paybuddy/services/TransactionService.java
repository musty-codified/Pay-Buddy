package com.decagon.dev.paybuddy.services;


import com.decagon.dev.paybuddy.dtos.responses.WalletTransactionResponse;

public interface TransactionService {
    WalletTransactionResponse viewWalletTransaction();
}
