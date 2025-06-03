package com.budgetly.model.dto;

import com.budgetly.model.entity.Budget;
import com.budgetly.model.enums.BudgetPeriod;

import java.io.Serializable;
import java.util.Date;

/**
 * DTO for {@link Budget}
 */
public record BudgetUpdateDto(Long id, String name, BudgetPeriod period, Integer periodCount, Double budgetLimit, Date startDate,
                              Date endDate, String color) implements Serializable {
}