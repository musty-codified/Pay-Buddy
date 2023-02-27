package com.decagon.dev.paybuddy.Controllers;

import com.decagon.dev.paybuddy.dtos.requests.CreateTransactionPinDto;
import com.decagon.dev.paybuddy.dtos.responses.WalletResponse;
import com.decagon.dev.paybuddy.restartifacts.BaseResponse;
import com.decagon.dev.paybuddy.services.WalletService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/wallet")
public class WalletController {
    private final WalletService walletService;
    @PutMapping("/updateWalletPin")
    public BaseResponse updateWalletPin(@RequestBody CreateTransactionPinDto createTransactionPinDto){
        return walletService.updateWalletPin(createTransactionPinDto);
    }

    @GetMapping("/balance")
    public ResponseEntity<WalletResponse> getBalance() {
        WalletResponse response = walletService.getWalletBalance();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping("/fundWallet")
    public ResponseEntity<String> fundWallet(@RequestParam BigDecimal amount){
        return walletService.fundWallet(amount, "fundwallet");
    }

    @GetMapping("/verifyPayment/{reference}/{paymentMethod}")
    public ResponseEntity<String> verifyPayment(@PathVariable String reference, @PathVariable  String paymentMethod){
        return walletService.verifyPayment(reference,paymentMethod);
    }
}
