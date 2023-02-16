package com.decagon.dev.paybuddy.serviceImpl;

import com.decagon.dev.paybuddy.dtos.requests.SendMoneyRequest;
import com.decagon.dev.paybuddy.dtos.responses.WalletResponse;
import com.decagon.dev.paybuddy.repositories.WalletRepository;
import com.decagon.dev.paybuddy.services.WalletService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@AllArgsConstructor
public class WalletServiceImpl implements WalletService {

    private final WalletRepository walletRepository;

    @Override
    public WalletResponse getWalletBalance() {
        return null;
    }

    @Override
    public WalletResponse sendMoney(SendMoneyRequest sendMoneyRequest) {
        return null;
    }

    @Override
    public WalletResponse fundWallet(BigDecimal bigDecimal, String transactionType) {
        return null;
    }
}
