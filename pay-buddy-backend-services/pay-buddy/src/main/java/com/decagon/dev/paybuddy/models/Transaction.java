package com.decagon.dev.paybuddy.models;


import com.decagon.dev.paybuddy.enums.TransactionStatus;
import com.decagon.dev.paybuddy.enums.TransactionType;
import lombok.*;

import javax.persistence.*;
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
    private Double amount;
    private TransactionType transactionType;
    private LocalDate dateOfTransaction;
    private TransactionStatus transactionStatus;
    private String description;
    @ManyToOne
    @JoinColumn(name = "wallet_wallet_id")
    private Wallet wallet;



}
