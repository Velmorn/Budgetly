package com.budgetly.model.dto;

import com.budgetly.model.entity.Goal;

import java.io.Serializable;
import java.util.Date;

/**
 * DTO for {@link Goal}
 */
public record GoalCreationDto(String name, Double targetAmount, Double amount, Date startDate,
                              Date endDate, String iconUrl, String color) implements Serializable {
}