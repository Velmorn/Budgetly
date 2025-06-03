package com.budgetly.model.mapper;

import com.budgetly.model.dto.CategoryCreationDto;
import com.budgetly.model.dto.CategoryDto;
import com.budgetly.model.entity.Category;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface CategoryMapper {

    Category toEntity(CategoryDto categoryDto);

    CategoryDto toDto(Category category);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Category partialUpdate(CategoryDto categoryDto, @MappingTarget Category category);

    Category toEntity(CategoryCreationDto categoryCreationDto);
}