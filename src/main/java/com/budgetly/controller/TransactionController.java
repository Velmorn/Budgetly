package com.budgetly.controller;

import com.budgetly.model.dto.TransactionCreationDto;
import com.budgetly.model.dto.TransactionDto;
import com.budgetly.model.dto.TransactionUpdateDto;
import com.budgetly.model.entity.User;
import com.budgetly.service.TransactionService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @GetMapping("{id}")
    public ResponseEntity<TransactionDto> getTransactionById(@PathVariable Long id,  @RequestAttribute("user") User user){
        return ResponseEntity.ok(transactionService.getById(id, user.getId()));
    }

    @GetMapping("/bill/{billId}/transactions")
    public ResponseEntity<List<TransactionDto>> getTransactionsByBillId(@PathVariable Long billId) {
        return ResponseEntity.ok(transactionService.getTransactionsByBillId(billId));
    }

    @GetMapping("/budget/{periodId}/transactions")
    public ResponseEntity<List<TransactionDto>> getTransactionsByBudgetPeriodId(@PathVariable Long periodId) {
        return ResponseEntity.ok(transactionService.getTransactionsByBudgetPeriodInstanceId(periodId));
    }

    @GetMapping("/goal/{goalId}/transactions")
    public ResponseEntity<List<TransactionDto>> getTransactionsByGoalId(@PathVariable Long goalId) {
        return ResponseEntity.ok(transactionService.getTransactionsByGoalId(goalId));
    }

    @GetMapping
    public ResponseEntity<List<TransactionDto>> getAllTransaction(@RequestAttribute("user") User user){
        return ResponseEntity.ok(transactionService.getAll(user.getId()));
    }

    @PostMapping
    public ResponseEntity<TransactionDto> createTransaction(@Valid @RequestBody TransactionCreationDto transactionCreationDto,
                                                            @RequestAttribute("user") User user){
        return new ResponseEntity(transactionService.create(transactionCreationDto, user.getId()), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<TransactionDto> updateTransaction(@PathVariable Long id,
                                                            @RequestBody TransactionUpdateDto transactionUpdateDto,
                                                            @RequestAttribute("user") User user){
        return new ResponseEntity(transactionService.update(id, user.getId(), transactionUpdateDto), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id, @RequestAttribute("user") User user){
        transactionService.delete(id, user.getId());
        return ResponseEntity.noContent().build();
    }
}
