package com.budgetly.service;

import com.budgetly.model.dto.GoalCreationDto;
import com.budgetly.model.dto.GoalDto;
import com.budgetly.model.entity.Goal;
import com.budgetly.model.entity.Transaction;
import com.budgetly.model.entity.User;
import com.budgetly.exception.ForbiddenException;
import com.budgetly.exception.ObjectAlreadyExistException;
import com.budgetly.model.mapper.GoalMapper;
import com.budgetly.model.repository.GoalRepository;
import com.budgetly.model.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class GoalService {
    private final GoalRepository goalRepository;
    private final GoalMapper goalMapper;
    private final UserRepository userRepository;

    public GoalDto getById(Long goalId, Long userId) {
        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new EntityNotFoundException("Goal not found"));

        if (!goal.getUser().getId().equals(userId)) {
            throw new ForbiddenException("You do not have permission to access this goal.");
        }

        return goalMapper.toDto(goal);
    }

    public List<GoalDto> getAll(Long userId) {
        List<Goal> goals = goalRepository.findAllByUserId(userId);
        return goals.stream().map(goalMapper::toDto).toList();
    }

    @Transactional
    public GoalDto create(GoalCreationDto goalCreationDto, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if(goalRepository.existsByNameAndUser(goalCreationDto.name(), user)){
            throw new ObjectAlreadyExistException("Goal with name" + goalCreationDto.name() + " already exists");
        }

        Goal goal = goalMapper.toEntity(goalCreationDto);
        goal.setUser(user);

        return goalMapper.toDto(goalRepository.save(goal));
    }

    @Transactional
    public GoalDto update(Long goalId, GoalDto goalDto, Long userId) {
        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new EntityNotFoundException("Goal not found"));


        if (!goal.getUser().getId().equals(userId)) {
            throw new ForbiddenException("You do not have permission to update this goal.");
        }

        goalMapper.partialUpdate(goalDto, goal);
        return goalMapper.toDto(goalRepository.save(goal));
    }

    @Transactional
    public void delete(Long goalId, Long userId) {
        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new EntityNotFoundException("Goal not found"));

        if (!goal.getUser().getId().equals(userId)) {
            throw new ForbiddenException("You do not have permission to delete this goal.");
        }

        for (Transaction transaction : goal.getTransactions()) {
            transaction.setGoal(null);
        }
        goal.getTransactions().clear();

        goalRepository.delete(goal);
    }
}
