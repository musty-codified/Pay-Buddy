package com.decagon.dev.paybuddy.repositories;

import com.decagon.dev.paybuddy.models.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {
}