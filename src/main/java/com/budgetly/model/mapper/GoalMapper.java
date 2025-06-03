package com.budgetly.model.mapper;

import com.budgetly.model.dto.GoalCreationDto;
import com.budgetly.model.dto.GoalDto;
import com.budgetly.model.entity.Goal;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)public interface GoalMapper {
    Goal toEntity(GoalDto goalDto);

    GoalDto toDto(Goal goal);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)Goal
    partialUpdate(GoalDto goalDto, @MappingTarget Goal goal);

    Goal toEntity(GoalCreationDto goalCreationDto);
}