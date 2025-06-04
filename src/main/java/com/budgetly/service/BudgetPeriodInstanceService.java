package com.budgetly.service;
import com.budgetly.model.dto.BudgetPeriodInstanceCreationDto;
import com.budgetly.model.dto.BudgetPeriodInstanceDto;
import com.budgetly.model.entity.Budget;
import com.budgetly.model.entity.BudgetPeriodInstance;
import com.budgetly.model.entity.Transaction;
import com.budgetly.exception.ForbiddenException;
import com.budgetly.model.mapper.BudgetPeriodInstanceMapper;
import com.budgetly.model.repository.BudgetPeriodInstanceRepository;
import com.budgetly.model.repository.BudgetRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class BudgetPeriodInstanceService {
    private final BudgetPeriodInstanceRepository periodRepository;
    @Qualifier("budgetPeriodInstanceMapperImpl")
    private final BudgetPeriodInstanceMapper periodMapper;
    private final BudgetRepository budgetRepository;

    public BudgetPeriodInstanceDto getById(Long id, Long userId) {
        BudgetPeriodInstance period = periodRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Period not found"));

        if (!period.getBudget().getUser().getId().equals(userId)) {
            throw new ForbiddenException("Access denied");
        }

        return periodMapper.toDto(period);
    }

    public List<BudgetPeriodInstanceDto> getAllByBudgetId(Long budgetId, Long userId) {
        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new EntityNotFoundException("Budget not found"));

        if (!budget.getUser().getId().equals(userId)) {
            throw new ForbiddenException("Access denied");
        }

        return budget.getPeriods().stream()
                .map(periodMapper::toDto)
                .toList();
    }

    @Transactional
    public BudgetPeriodInstanceDto create(Long budgetId, BudgetPeriodInstanceCreationDto dto, Long userId) {
        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new EntityNotFoundException("Budget not found"));

        if (!budget.getUser().getId().equals(userId)) {
            throw new ForbiddenException("Access denied");
        }

        BudgetPeriodInstance period = periodMapper.toEntity(dto);
        period.setBudget(budget);
        period.setAmount(0.0);
        periodRepository.save(period);

        budget.setCurrentPeriod(period);
        budget.getPeriods().add(period);
        budgetRepository.save(budget);

        return periodMapper.toDto(period);
    }

    public void delete(Long periodId, Long userId) {
        BudgetPeriodInstance period = periodRepository.findById(periodId)
                .orElseThrow(() -> new EntityNotFoundException("Period not found"));

        if (!period.getBudget().getUser().getId().equals(userId)) {
            throw new ForbiddenException("Access denied");
        }

        for (Transaction transaction : period.getTransactions()) {
            transaction.setBudgetPeriodInstance(null);
        }
        period.getTransactions().clear();

        periodRepository.delete(period);
    }
}



