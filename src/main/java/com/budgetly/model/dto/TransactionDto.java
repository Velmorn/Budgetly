package com.budgetly.model.dto;

import com.budgetly.model.entity.Category;
import com.budgetly.model.entity.Transaction;

import java.io.Serializable;
import java.util.Date;

/**
 * DTO for {@link Transaction}
 */
public record TransactionDto(
        Long id,
        String title,
        String type,
        String note,
        Double amount,
        Date date,
        String currency,
        Category category) implements Serializable {
  }