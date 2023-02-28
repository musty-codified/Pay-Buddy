package com.decagon.dev.paybuddy.dtos.responses;

import com.decagon.dev.paybuddy.restartifacts.BaseResponse;
import lombok.*;

import java.math.BigDecimal;
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class WalletResponse extends BaseResponse {
    private String userName;
    private BigDecimal walletBalance;
}
