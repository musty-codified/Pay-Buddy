package com.decagon.dev.paybuddy.models;

import com.decagon.dev.paybuddy.enums.TransactionStatus;
import com.decagon.dev.paybuddy.enums.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.math.BigDecimal;
import java.time.LocalDate;
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    private Long transactionId;
    private String referenceNumber;
    private BigDecimal amount;
    private String transactionReference;
    private TransactionType transactionType;
    private LocalDate dateOfTransaction;
    private TransactionStatus transactionStatus;
    private String description;
    @ManyToOne
    @JoinColumn(name = "wallet_wallet_id")
    private Wallet wallet;

}
