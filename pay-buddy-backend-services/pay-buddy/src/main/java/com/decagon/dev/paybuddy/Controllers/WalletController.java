package com.decagon.dev.paybuddy.Controllers;

import com.decagon.dev.paybuddy.dtos.requests.CreateTransactionPinDto;
import com.decagon.dev.paybuddy.dtos.requests.WithdrawalDto;
import com.decagon.dev.paybuddy.dtos.responses.WalletResponse;
import com.decagon.dev.paybuddy.restartifacts.BaseResponse;
import com.decagon.dev.paybuddy.services.WalletService;
import com.decagon.dev.paybuddy.services.paystack.payStackPojos.Bank;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

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
    @PostMapping("/getBankDetails")
    public ResponseEntity<List<Bank>> fetchBankDetails(){

        return walletService.getAllBanks();
    }
    @PostMapping("/sendMoney")
    public ResponseEntity<String> walletWithdrawal(@RequestBody WithdrawalDto withdrawalDto){
        return walletService.walletWithdrawal(withdrawalDto);
    }
    @PostMapping("/verifyAccountNumber")
    public ResponseEntity<String> verifyAccountNumber(@RequestParam String accountNumber, @RequestParam String bankCode){
        return walletService.verifyAccountNumber(accountNumber, bankCode);
    }
}
