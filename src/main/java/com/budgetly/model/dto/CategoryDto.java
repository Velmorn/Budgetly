package com.budgetly.model.dto;

import com.budgetly.model.entity.Category;

import java.io.Serializable;

/**
 * DTO for {@link Category}
 */
public record CategoryDto(Long id, String name, String iconUrl, String color) implements Serializable {
}