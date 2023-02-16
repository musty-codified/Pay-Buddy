package com.decagon.dev.paybuddy.models;

import com.decagon.dev.paybuddy.enums.WalletStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
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

    @CreationTimestamp
    private LocalDate createdAt;

    @UpdateTimestamp
    private LocalDate lastTransactionDate;
    @OneToMany
    private List<Transaction> transactionHistory;
}
