package com.budgetly.model.repository;

import com.budgetly.model.entity.Goal;
import com.budgetly.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GoalRepository extends JpaRepository<Goal, Long> {
    List<Goal> findAllByUserId(Long userId);
    boolean existsByNameAndUser(String name, User user);
}
