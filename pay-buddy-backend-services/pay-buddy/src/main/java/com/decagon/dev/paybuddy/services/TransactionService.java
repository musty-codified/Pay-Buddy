package com.decagon.dev.paybuddy.services;


import com.decagon.dev.paybuddy.dtos.responses.TransactionResponse;
import com.decagon.dev.paybuddy.dtos.responses.TransactionResponseViewModel;

import java.util.List;


public interface TransactionService {
    TransactionResponseViewModel viewWalletTransaction(int page, int limit);
}
