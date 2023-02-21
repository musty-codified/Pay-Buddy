package com.decagon.dev.paybuddy.models;

import com.decagon.dev.paybuddy.enums.WalletStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long walletId;

    private String accountNumber;
    private BigDecimal accountBalance;
//    @Max(value = 4) @Min(value = 4)
    private String pin;
    @OneToOne
    private User user;
    private WalletStatus status;
    private LocalDate lastTransactionDate;

    @OneToMany
    private List<Transaction> transaction;
}
