package com.budgetly.model.mapper;

import com.budgetly.model.dto.BudgetCreationDto;
import com.budgetly.model.dto.BudgetDto;
import com.budgetly.model.dto.BudgetUpdateDto;
import com.budgetly.model.entity.Budget;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)public interface BudgetMapper {
    Budget toEntity(BudgetDto budgetDto);

    BudgetDto toDto(Budget budget);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)Budget
    partialUpdate(BudgetDto budgetDto, @MappingTarget Budget budget);

    Budget toEntity(BudgetCreationDto budgetCreationDto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)Budget
    partialUpdate(BudgetUpdateDto budgetUpdateDto, @MappingTarget Budget budget);
}