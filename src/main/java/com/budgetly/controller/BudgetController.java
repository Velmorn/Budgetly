package com.budgetly.controller;

import com.budgetly.model.dto.*;
import com.budgetly.model.entity.User;
import com.budgetly.service.BudgetPeriodInstanceService;
import com.budgetly.service.BudgetService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class BudgetController {
    private final BudgetService budgetService;
    private final BudgetPeriodInstanceService periodService;


    @GetMapping("{id}")
    public ResponseEntity<BudgetDto> getBudgetById(@PathVariable Long id, @RequestAttribute("user") User user ){
        return ResponseEntity.ok(budgetService.getById(id, user.getId()));
    }

    @GetMapping
    public ResponseEntity<List<BudgetDto>> getAllBudget(@RequestAttribute("user") User user){
        return ResponseEntity.ok(budgetService.getAll(user.getId()));
    }

    @PostMapping
    public ResponseEntity<BudgetDto> createBudget(@Valid @RequestBody BudgetCreationDto budgetCreationDto,
                                                  @RequestAttribute("user") User user){
        return new ResponseEntity(budgetService.create(budgetCreationDto, user.getId()), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<BudgetDto> updateBudget(@PathVariable Long id,
                                                  @RequestBody BudgetUpdateDto budgetUpdateDto,
                                                  @RequestAttribute("user") User user){
        return new ResponseEntity(budgetService.update(id, budgetUpdateDto, user.getId()), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteBudget(@PathVariable Long id, @RequestAttribute("user") User user){
        budgetService.delete(id, user.getId());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("{budgetId}/periods")
    public ResponseEntity<List<BudgetPeriodInstanceDto>> getAllPeriodsByBudgetId(
            @PathVariable Long budgetId,
            @RequestAttribute("user") User user) {
        List<BudgetPeriodInstanceDto> periods = periodService.getAllByBudgetId(budgetId, user.getId());
        return ResponseEntity.ok(periods);
    }

    @GetMapping("periods/{periodId}")
    public ResponseEntity<BudgetPeriodInstanceDto> getPeriodById(
            @PathVariable Long periodId,
            @RequestAttribute("user") User user) {
        BudgetPeriodInstanceDto period = periodService.getById(periodId, user.getId());
        return ResponseEntity.ok(period);
    }

    @PostMapping("{budgetId}/periods")
    public ResponseEntity<BudgetPeriodInstanceDto> createPeriod(
            @PathVariable Long budgetId,
            @Valid @RequestBody BudgetPeriodInstanceCreationDto dto,
            @RequestAttribute("user") User user) {
        BudgetPeriodInstanceDto createdPeriod = periodService.create(budgetId, dto, user.getId());
        return new ResponseEntity<>(createdPeriod, HttpStatus.CREATED);
    }

    @DeleteMapping("periods/{periodId}")
    public ResponseEntity<Void> deletePeriod(
            @PathVariable Long periodId,
            @RequestAttribute("user") User user) {
        periodService.delete(periodId, user.getId());
        return ResponseEntity.noContent().build();
    }


}
