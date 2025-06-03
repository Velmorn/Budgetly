package com.budgetly.model.dto;

import com.budgetly.model.entity.Transaction;

import java.io.Serializable;
import java.util.Date;

/**
 * DTO for {@link Transaction}
 */
public record TransactionUpdateDto(String title, String note, Double amount, Date date, Long categoryId) implements Serializable {
}