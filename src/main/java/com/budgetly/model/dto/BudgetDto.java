package com.budgetly.model.dto;

import com.budgetly.model.entity.Budget;
import com.budgetly.model.enums.BudgetPeriod;
import com.budgetly.model.entity.BudgetPeriodInstance;

import java.io.Serializable;

/**
 * DTO for {@link Budget}
 */
public record BudgetDto(Long id,
                        String name,
                        BudgetPeriod period,
                        Integer periodCount,
                        Double budgetLimit,
                        String color,
                        BudgetPeriodInstance currentPeriod) implements Serializable {
}