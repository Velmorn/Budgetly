package com.budgetly.service;

import com.budgetly.model.dto.BudgetCreationDto;
import com.budgetly.model.dto.BudgetDto;
import com.budgetly.model.dto.BudgetUpdateDto;
import com.budgetly.model.entity.Budget;
import com.budgetly.model.entity.BudgetPeriodInstance;
import com.budgetly.model.entity.Transaction;
import com.budgetly.model.entity.User;
import com.budgetly.exception.ObjectAlreadyExistException;
import com.budgetly.exception.ForbiddenException;
import com.budgetly.model.mapper.BudgetMapper;
import com.budgetly.model.mapper.BudgetPeriodInstanceMapper;
import com.budgetly.model.repository.BudgetPeriodInstanceRepository;
import com.budgetly.model.repository.BudgetRepository;
import com.budgetly.model.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class BudgetService {
    private final BudgetRepository budgetRepository;
    private final BudgetMapper budgetMapper;
    private final BudgetPeriodInstanceRepository budgetPeriodInstanceRepository;
    private final UserRepository userRepository;
    private final BudgetPeriodInstanceMapper budgetPeriodInstanceMapper;

    public BudgetDto getById(Long budgetId, Long userId) {
        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new EntityNotFoundException("Budget not found"));

        if (!budget.getUser().getId().equals(userId)) {
            throw new ForbiddenException("You do not have permission to access this budget.");
        }

        return budgetMapper.toDto(budget);
    }

    public List<BudgetDto> getAll(Long userId){
        List<Budget> budgets = budgetRepository.findAllByUserId(userId);
        return budgets.stream().map(budgetMapper::toDto).toList();
    }

    @Transactional
    public BudgetDto create(BudgetCreationDto budgetCreationDto, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (budgetRepository.existsByNameAndUser(budgetCreationDto.name(), user)) {
            throw new ObjectAlreadyExistException("Budget with name " + budgetCreationDto.name() + "already exists.");
        }

        Budget budget = budgetMapper.toEntity(budgetCreationDto);
        budget.setUser(user);

        BudgetPeriodInstance firstPeriod = new BudgetPeriodInstance();
        firstPeriod.setBudget(budget);
        firstPeriod.setStartDate(budgetCreationDto.startDate());
        firstPeriod.setEndDate(budgetCreationDto.endDate());
        firstPeriod.setAmount(0.0);

        budget.setCurrentPeriod(firstPeriod);
        budget.setPeriods(List.of(firstPeriod));

        budget = budgetRepository.save(budget);
        firstPeriod = budgetPeriodInstanceRepository.save(firstPeriod);

        return budgetMapper.toDto(budget);
    }

    @Transactional
    public BudgetDto update(Long budgetId, BudgetUpdateDto budgetUpdateDto, Long userId) {
        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new EntityNotFoundException("Budget not found"));

        if (!budget.getUser().getId().equals(userId)) {
            throw new ForbiddenException("You do not have permission to update this budget.");
        }

        if (budgetUpdateDto.period() != null && budgetUpdateDto.period() != budget.getPeriod()) {
            BudgetPeriodInstance budgetPeriodInstance = budget.getCurrentPeriod();
            budgetPeriodInstance.setStartDate(budgetUpdateDto.startDate());
            budgetPeriodInstance.setEndDate(budgetUpdateDto.endDate());
            budgetPeriodInstanceRepository.save(budgetPeriodInstance);
        }

        budgetMapper.partialUpdate(budgetUpdateDto, budget);

        return budgetMapper.toDto(budgetRepository.save(budget));
    }

    @Transactional
    public void delete(Long budgetId, Long userId) {
        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new EntityNotFoundException("Budget not found"));

        if (!budget.getUser().getId().equals(userId)) {
            throw new ForbiddenException("You do not have permission to delete this budget.");
        }

        for (BudgetPeriodInstance period : budget.getPeriods()) {
            for (Transaction transaction : period.getTransactions()) {
                transaction.setBudgetPeriodInstance(null);
            }
            period.getTransactions().clear();
        }

        budgetRepository.delete(budget);
    }
}
