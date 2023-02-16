package com.decagon.dev.paybuddy.repositories;

import com.decagon.dev.paybuddy.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
