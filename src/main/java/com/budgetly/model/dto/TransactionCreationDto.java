package com.budgetly.model.dto;

import com.budgetly.model.entity.Transaction;

import java.io.Serializable;
import java.util.Date;

/**
 * DTO for {@link Transaction}
 */
public record TransactionCreationDto(
        String title,
        String type,
        String note,
        Double amount,
        Date date,
        Long billId,
        Long categoryId,
        Long goalId,
        Long budgetId) implements Serializable {
  }