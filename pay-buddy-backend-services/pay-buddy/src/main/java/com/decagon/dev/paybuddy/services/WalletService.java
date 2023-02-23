package com.decagon.dev.paybuddy.services;

import com.decagon.dev.paybuddy.dtos.requests.CreateTransactionPinDto;
import com.decagon.dev.paybuddy.restartifacts.BaseResponse;

public interface WalletService {
    BaseResponse updateWalletPin(CreateTransactionPinDto createTransactionPinDto);

}
