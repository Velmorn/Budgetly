package com.budgetly.model.dto;

import com.budgetly.model.entity.Bill;

import java.io.Serializable;

/**
 * DTO for {@link Bill}
 */
public record BillDto(Long id, String name, String currency, Double balance, String color) implements Serializable {
  }