package com.budgetly.model.dto;

import com.budgetly.model.entity.BudgetPeriodInstance;

import java.io.Serializable;
import java.util.Date;

/**
 * DTO for {@link BudgetPeriodInstance}
 */
public record BudgetPeriodInstanceCreationDto(Date startDate, Date endDate) implements Serializable {
}