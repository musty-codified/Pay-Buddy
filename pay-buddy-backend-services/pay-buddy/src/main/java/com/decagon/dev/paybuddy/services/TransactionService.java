package com.decagon.dev.paybuddy.services;


import com.decagon.dev.paybuddy.dtos.responses.TransactionResponse;

import java.util.List;


public interface TransactionService {
    List<TransactionResponse> viewWalletTransaction(int page, int limit);
}
