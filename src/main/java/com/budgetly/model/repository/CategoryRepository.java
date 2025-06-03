package com.budgetly.model.repository;

import com.budgetly.model.entity.Category;
import com.budgetly.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findAllByUserId(Long userId);
    boolean existsByNameAndUser(String name, User user);
    int countAllByUserId(Long userId);
}
