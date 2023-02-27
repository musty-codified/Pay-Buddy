package com.decagon.dev.paybuddy.models;

import com.decagon.dev.paybuddy.enums.TransactionStatus;
import com.decagon.dev.paybuddy.enums.TransactionType;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
@Entity
@Builder
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Table(name = "transaction_tbl")
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
    @JoinColumn(name = "wallet_tbl_id")
    private Wallet wallet;

}
