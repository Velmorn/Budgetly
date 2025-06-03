package com.budgetly.model.repository;

import com.budgetly.model.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findAllByUserId (Long userId);
    Void deleteAllByBillId (Long billId);
}
