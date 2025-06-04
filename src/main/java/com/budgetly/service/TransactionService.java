package com.budgetly.service;

import com.budgetly.model.dto.TransactionCreationDto;
import com.budgetly.model.dto.TransactionDto;
import com.budgetly.model.dto.TransactionUpdateDto;
import com.budgetly.exception.ForbiddenException;
import com.budgetly.model.entity.*;
import com.budgetly.model.enums.TransactionType;
import com.budgetly.model.mapper.TransactionMapper;
import com.budgetly.model.repository.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.budgetly.model.entity.Transaction.convertToMainCurrency;

@Service
@Transactional
@AllArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;
    private final BillRepository billRepository;
    private final CategoryRepository categoryRepository;
    private final BudgetRepository budgetRepository;
    private final BudgetPeriodInstanceRepository budgetPeriodInstanceRepository;
    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    public TransactionDto getById(Long id, Long userId) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Transaction not found"));

        if (!transaction.getUser().getId().equals(userId)) {
            throw new ForbiddenException("You do not have permission to access this transaction.");
        }

        return transactionMapper.toDto(transaction);
    }

    public List<TransactionDto> getAll(Long userId) {
        List<Transaction> transactions = transactionRepository.findAllByUserId(userId);
        return transactions.stream()
                .map(transactionMapper::toDto)
                .toList();
    }

    public List<TransactionDto> getTransactionsByBillId(Long billId) {
        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new EntityNotFoundException("Bill not found"));

        return bill.getTransactions().stream()
                .map(transactionMapper::toDto)
                .toList();
    }

    public List<TransactionDto> getTransactionsByGoalId(Long goalId) {
        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new EntityNotFoundException("Goal not found"));

        return goal.getTransactions().stream()
                .map(transactionMapper::toDto)
                .toList();
    }


    public List<TransactionDto> getTransactionsByBudgetPeriodInstanceId(Long budgetPeriodInstanceId) {
        BudgetPeriodInstance budgetPeriodInstance = budgetPeriodInstanceRepository.findById(budgetPeriodInstanceId)
                .orElseThrow(() -> new EntityNotFoundException("Budget not found"));

        return budgetPeriodInstance.getTransactions().stream()
                .map(transactionMapper::toDto)
                .toList();
    }

    @Transactional
    public TransactionDto create(TransactionCreationDto dto, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Bill bill = billRepository.findById(dto.billId())
                .orElseThrow(() -> new EntityNotFoundException("Bill not found"));

        Category category = categoryRepository.findById(dto.categoryId())
                .orElse(null);

        Transaction transaction = transactionMapper.toEntity(dto);
        transaction.setBill(bill);
        transaction.setCategory(category);
        transaction.setUser(user);
        transaction.setCurrency(bill.getCurrency());


        if (transaction.getType() == TransactionType.EXPENSE) {
            bill.setBalance(bill.getBalance() - transaction.getAmount());

            if (dto.budgetId() != null) {
                Budget budget = budgetRepository.findById(dto.budgetId())
                        .orElseThrow(() -> new RuntimeException("Budget not found"));
                BudgetPeriodInstance budgetPeriodInstance = budget.getCurrentPeriod();
                transaction.setBudgetPeriodInstance(budgetPeriodInstance);
                budgetPeriodInstance.setAmount(budgetPeriodInstance.getAmount() + convertToMainCurrency(bill.getCurrency(), transaction.getAmount(), user));
                budgetPeriodInstance.getTransactions().add(transaction);
                budgetPeriodInstanceRepository.save(budgetPeriodInstance);
            }

        } else if (transaction.getType() == TransactionType.INCOME) {
            bill.setBalance(bill.getBalance() + transaction.getAmount());

            if (dto.goalId() != null) {
                Goal goal = goalRepository.findById(dto.goalId())
                        .orElseThrow(() -> new RuntimeException("Goal not found"));
                transaction.setGoal(goal);
                goal.setAmount(goal.getAmount() + convertToMainCurrency(bill.getCurrency(), transaction.getAmount(), user));
                goal.getTransactions().add(transaction);
                goalRepository.save(goal);
            }
        }

        bill.getTransactions().add(transaction);
        billRepository.save(bill);

        return transactionMapper.toDto(transactionRepository.save(transaction));
    }

    @Transactional
    public TransactionDto update(Long transactionId, Long userId, TransactionUpdateDto transactionUpdateDto) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new EntityNotFoundException("Transaction not found"));

        if (!transaction.getUser().getId().equals(userId)) {
            throw new ForbiddenException("You do not have permission to update this transaction.");
        }

        if (transactionUpdateDto.categoryId() != null
                && !transactionUpdateDto.categoryId().equals(transaction.getCategory().getId())) {
            Category category = categoryRepository.findById(transactionUpdateDto.categoryId())
                    .orElseThrow(() -> new EntityNotFoundException("Category not found"));
            transaction.setCategory(category);
        }

        if (transactionUpdateDto.amount() != null
                && !transaction.getAmount().equals(transactionUpdateDto.amount())) {
            if (transaction.getType() == TransactionType.EXPENSE) {
                transaction.getBill().setBalance(transaction.getBill().getBalance() + transaction.getAmount() - transactionUpdateDto.amount());
                if (transaction.getBudgetPeriodInstance() != null) {
                    transaction.getBudgetPeriodInstance().setAmount(
                            transaction.getBudgetPeriodInstance().getAmount() - convertToMainCurrency(transaction.getBill().getCurrency(), transaction.getAmount(), transaction.getUser())
                                    + convertToMainCurrency(transaction.getBill().getCurrency(), transactionUpdateDto.amount(), transaction.getUser()));
                }
            } else if (transaction.getType() == TransactionType.INCOME) {
                transaction.getBill().setBalance(transaction.getBill().getBalance() - transaction.getAmount() + transactionUpdateDto.amount());
                if (transaction.getGoal() != null) {
                    transaction.getGoal().setAmount(
                            transaction.getGoal().getAmount() - convertToMainCurrency(transaction.getBill().getCurrency(), transaction.getAmount(), transaction.getUser())
                                    + convertToMainCurrency(transaction.getBill().getCurrency(), transactionUpdateDto.amount(), transaction.getUser()));
                }
            }
        }

        transactionMapper.partialUpdate(transactionUpdateDto, transaction);
        return transactionMapper.toDto(transactionRepository.save(transaction));
    }

    @Transactional
    public void delete(Long transactionId, Long userId) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new EntityNotFoundException("Transaction not found"));

        if (!transaction.getUser().getId().equals(userId)) {
            throw new ForbiddenException("You do not have permission to delete this transaction.");
        }

        Bill bill = transaction.getBill();
        if (transaction.getType() == TransactionType.EXPENSE) {
            bill.setBalance(bill.getBalance() + transaction.getAmount());
            if (transaction.getBudgetPeriodInstance() != null) {
                BudgetPeriodInstance budgetPeriodInstance = transaction.getBudgetPeriodInstance();
                budgetPeriodInstance.setAmount(budgetPeriodInstance.getAmount() - convertToMainCurrency(bill.getCurrency(), transaction.getAmount(), transaction.getUser()));
                budgetPeriodInstance.getTransactions().remove(transaction);
                budgetPeriodInstanceRepository.save(budgetPeriodInstance);
            }
        } else if (transaction.getType() == TransactionType.INCOME) {
            bill.setBalance(bill.getBalance() - transaction.getAmount());
            if (transaction.getGoal() != null) {
                Goal goal = transaction.getGoal();
                goal.setAmount(goal.getAmount() - convertToMainCurrency(bill.getCurrency(), transaction.getAmount(), transaction.getUser()));
                goal.getTransactions().remove(transaction);
                goalRepository.save(goal);
            }
        }

        bill.getTransactions().remove(transaction);
        billRepository.save(bill);
        transactionRepository.delete(transaction);
    }
}
