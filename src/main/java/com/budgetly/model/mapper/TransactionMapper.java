package com.budgetly.model.mapper;

import com.budgetly.model.dto.TransactionCreationDto;
import com.budgetly.model.dto.TransactionDto;
import com.budgetly.model.dto.TransactionUpdateDto;
import com.budgetly.model.entity.Transaction;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)public interface TransactionMapper {
    Transaction toEntity(TransactionDto transactionDto);

    TransactionDto toDto(Transaction transaction);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)

    Transaction partialUpdate(TransactionDto transactionDto, @MappingTarget Transaction transaction);

    Transaction toEntity(TransactionCreationDto transactionCreationDto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Transaction partialUpdate(TransactionUpdateDto transactionUpdateDto, @MappingTarget Transaction transaction);

}