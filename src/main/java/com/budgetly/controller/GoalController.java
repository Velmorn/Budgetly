package com.budgetly.controller;

import com.budgetly.model.dto.GoalCreationDto;
import com.budgetly.model.dto.GoalDto;
import com.budgetly.model.entity.User;
import com.budgetly.service.GoalService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class GoalController {
    private final GoalService goalService;

    @GetMapping("{id}")
    public ResponseEntity<GoalDto> getGoalById(@PathVariable Long id, @RequestAttribute("user") User user){
        return ResponseEntity.ok(goalService.getById(id, user.getId()));
    }

    @GetMapping
    public ResponseEntity<List<GoalDto>> getAllGoal(@RequestAttribute("user") User user){
        return ResponseEntity.ok(goalService.getAll(user.getId()));
    }

    @PostMapping
    public ResponseEntity<GoalDto> createGoal(@Valid @RequestBody GoalCreationDto goalCreationDto,
                                              @RequestAttribute("user") User user){
        return new ResponseEntity(goalService.create(goalCreationDto, user.getId()), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<GoalDto> updateGoal(@PathVariable Long id,
                                              @RequestBody GoalDto goalDto,
                                              @RequestAttribute("user") User user ){
        return new ResponseEntity(goalService.update(id, goalDto, user.getId()), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long id,  @RequestAttribute("user") User user){
        goalService.delete(id, user.getId());
        return ResponseEntity.noContent().build();
    }
}
