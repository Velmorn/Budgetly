package com.budgetly.model.mapper;

import com.budgetly.model.dto.BudgetPeriodInstanceCreationDto;
import com.budgetly.model.dto.BudgetPeriodInstanceDto;
import com.budgetly.model.entity.BudgetPeriodInstance;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface BudgetPeriodInstanceMapper {
    BudgetPeriodInstance toEntity(BudgetPeriodInstanceDto budgetPeriodInstanceDto);

    BudgetPeriodInstanceDto toDto(BudgetPeriodInstance budgetPeriodInstance);


    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    BudgetPeriodInstance partialUpdate(BudgetPeriodInstanceDto budgetPeriodInstanceDto, @MappingTarget BudgetPeriodInstance budgetPeriodInstance);

    BudgetPeriodInstance toEntity(BudgetPeriodInstanceCreationDto budgetPeriodInstanceCreationDto);

}