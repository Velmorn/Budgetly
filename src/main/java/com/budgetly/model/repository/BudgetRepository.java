package com.budgetly.model.repository;

import com.budgetly.model.entity.Budget;
import com.budgetly.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findAllByUserId(Long userId);
    boolean existsByNameAndUser(String name, User user);
}
