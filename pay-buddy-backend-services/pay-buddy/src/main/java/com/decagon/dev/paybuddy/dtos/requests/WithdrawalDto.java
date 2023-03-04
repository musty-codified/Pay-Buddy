package com.decagon.dev.paybuddy.dtos.requests;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Getter
@Setter
public class WithdrawalDto {
    @NotBlank
    private String accountNumber;
    @NotBlank
    private String bankCode;
    @NotNull
    private BigDecimal amount;
    @NotNull
    private String walletPin;
}
