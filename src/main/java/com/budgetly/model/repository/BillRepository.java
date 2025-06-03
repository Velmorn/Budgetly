package com.budgetly.model.repository;

import com.budgetly.model.entity.Bill;
import com.budgetly.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Long> {

    boolean existsByNameAndUser(String name, User user);
    List<Bill> findAllByUserId(Long userId);
    int countAllByUserId(Long userId);
}
