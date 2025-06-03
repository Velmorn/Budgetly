package com.budgetly.model.mapper;

import com.budgetly.model.dto.BillCreationDto;
import com.budgetly.model.dto.BillDto;
import com.budgetly.model.entity.Bill;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)public interface BillMapper {
    Bill toEntity(BillDto billDto);

    BillDto toDto(Bill bill);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Bill partialUpdate(BillDto billDto, @MappingTarget Bill bill);

    Bill toEntity(BillCreationDto billCreationDto);
}