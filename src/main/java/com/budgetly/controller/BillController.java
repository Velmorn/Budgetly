package com.budgetly.controller;

import com.budgetly.model.dto.BillCreationDto;
import com.budgetly.model.dto.BillDto;
import com.budgetly.model.dto.TransferDto;
import com.budgetly.model.enums.CurrencyData;
import com.budgetly.model.entity.User;
import com.budgetly.service.BillService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bills")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
@Slf4j
public class BillController {
    private final BillService billService;

    @GetMapping("{id}")
    public ResponseEntity<BillDto> getBillById(@PathVariable Long id, @RequestAttribute("user") User user) {
        return ResponseEntity.ok(billService.getById(id, user.getId()));
    }

    @GetMapping
    public ResponseEntity<List<BillDto>> getAllBills(@RequestAttribute("user") User user) {
        return ResponseEntity.ok(billService.getAll(user.getId()));
    }

    @PostMapping
    public ResponseEntity<BillDto> createBill(@Valid @RequestBody BillCreationDto billCreationDto, @RequestAttribute("user") User user){
        return new ResponseEntity<>(billService.create(billCreationDto, user.getId()), HttpStatus.CREATED);
    }


    @PatchMapping("/{id}")
    public ResponseEntity<BillDto> updateBill(@PathVariable Long id,
                                              @RequestAttribute("user") User user,
                                              @RequestBody BillDto billDto) {
        return ResponseEntity.ok(billService.update(id, user.getId(), billDto));
    }

    @PostMapping("/transfer")
    public ResponseEntity<Void> transfer(@RequestBody TransferDto transferDto,
                                         @RequestAttribute("user") User user) {
        billService.transfer( transferDto, user.getId());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBill(@PathVariable Long id, @RequestAttribute("user") User user) {
        billService.delete(id, user.getId());
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/currencies")
    public List<Map<String, Object>> getAvailableCurrencies() {
        return Arrays.stream(CurrencyData.values())
                .map(c -> {
                    Map<String, Object> currencyMap = new HashMap<>();
                    currencyMap.put("code", c.name());
                    currencyMap.put("name", c.getName());
                    currencyMap.put("symbol", c.getSymbol());
                    currencyMap.put("rateToUSD", c.getRateToUSD());
                    return currencyMap;
                })
                .toList();
    }

}
