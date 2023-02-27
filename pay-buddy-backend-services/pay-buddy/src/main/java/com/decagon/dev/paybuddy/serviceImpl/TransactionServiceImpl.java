package com.decagon.dev.paybuddy.serviceImpl;

import com.decagon.dev.paybuddy.dtos.responses.TransactionResponse;
import com.decagon.dev.paybuddy.models.Transaction;
import com.decagon.dev.paybuddy.repositories.TransactionRepository;
import com.decagon.dev.paybuddy.repositories.UserRepository;
import com.decagon.dev.paybuddy.services.TransactionService;
import com.decagon.dev.paybuddy.utilities.UserUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TransactionServiceImpl implements TransactionService {

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final UserUtil userUtil;

    @Override
    public List<TransactionResponse> viewWalletTransaction(int page, int limit) {

        String userEmail = userUtil.getAuthenticatedUserEmail();
        userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not Found"));

        if (page > 0) page -= 1;
        Pageable pageable = PageRequest.of(page, limit);
        Page<Transaction> pagelist = transactionRepository.findAll(pageable);

        List<Transaction> transactionList = pagelist.getContent();

        return TransactionResponse.mapFromTransaction(transactionList);

    }
}
