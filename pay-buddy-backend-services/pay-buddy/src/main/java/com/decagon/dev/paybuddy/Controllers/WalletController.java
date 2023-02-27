package com.decagon.dev.paybuddy.Controllers;

import com.decagon.dev.paybuddy.dtos.requests.CreateTransactionPinDto;
import com.decagon.dev.paybuddy.restartifacts.BaseResponse;
import com.decagon.dev.paybuddy.serviceImpl.WalletServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/wallet")
public class WalletController {
    private final WalletServiceImpl walletService;
    @PutMapping("/updateWalletPin")
    public BaseResponse updateWalletPin(@RequestBody CreateTransactionPinDto createTransactionPinDto){
        return walletService.updateWalletPin(createTransactionPinDto);
    }
}
