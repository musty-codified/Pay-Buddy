package com.decagon.dev.paybuddy.serviceImpl;

import com.decagon.dev.paybuddy.dtos.requests.CreateTransactionPinDto;
import com.decagon.dev.paybuddy.dtos.responses.WalletResponse;
import com.decagon.dev.paybuddy.enums.ResponseCodeEnum;
import com.decagon.dev.paybuddy.models.User;
import com.decagon.dev.paybuddy.models.Wallet;
import com.decagon.dev.paybuddy.repositories.WalletRepository;
import com.decagon.dev.paybuddy.restartifacts.BaseResponse;
import com.decagon.dev.paybuddy.services.WalletService;
import com.decagon.dev.paybuddy.utilities.ResponseCodeUtil;
import com.decagon.dev.paybuddy.utilities.UserUtil;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@AllArgsConstructor
public class WalletServiceImpl implements WalletService {

    private final WalletRepository walletRepository;
    private final UserUtil userUtil;
    private final PasswordEncoder passwordEncoder;
    private final ResponseCodeUtil responseCodeUtil = new ResponseCodeUtil();

    @Override
    public WalletResponse getWalletBalance() {
        return null;
    }

    @Override
    public WalletResponse fundWallet(BigDecimal bigDecimal, String transactionType) {
        return null;
    }

    @Override
    public BaseResponse updateWalletPin(CreateTransactionPinDto createTransactionPinDto) {
        BaseResponse baseResponse = new BaseResponse();
        String authEmail = userUtil.getAuthenticatedUserEmail();
//        User walletOwner = userUtil.currentUser();
//        Wallet userWallet = walletRepository.findByUser_UserId(walletOwner.getUserId());
        Wallet userWallet = walletRepository.findWalletByUser_Email(authEmail);
        if (userWallet != null){
//            userWallet.setPin(passwordEncoder.encode(createTransactionPinDto.getPin()));
            userWallet.setPin(createTransactionPinDto.getPin());
            walletRepository.save(userWallet);
            return responseCodeUtil.updateResponseData(baseResponse, ResponseCodeEnum.SUCCESS,
                    "Wallet pin successfully changed");
        }
        return responseCodeUtil.updateResponseData(baseResponse, ResponseCodeEnum.ERROR,
                "Wallet not found");
    }
}
