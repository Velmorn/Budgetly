package com.budgetly.controller;

import com.budgetly.model.dto.CategoryCreationDto;
import com.budgetly.model.dto.CategoryDto;
import com.budgetly.model.entity.User;
import com.budgetly.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("{id}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable Long id,  @RequestAttribute("user") User user){
        return ResponseEntity.ok(categoryService.getById(id, user.getId()));
    }

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAllCategories(@RequestAttribute("user") User user){
        return ResponseEntity.ok(categoryService.getAll(user.getId()));
    }

    @PostMapping
    public ResponseEntity<CategoryDto> createCategory(@RequestBody CategoryCreationDto categoryCreationDto,
                                                      @RequestAttribute("user") User user){
        return new ResponseEntity(categoryService.create(categoryCreationDto, user.getId()), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<CategoryDto> updateBudget(@PathVariable Long id,
                                                  @RequestBody CategoryDto categoryDto,
                                                  @RequestAttribute("user") User user){
        return new ResponseEntity(categoryService.update(id, categoryDto, user.getId()), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteBudget(@PathVariable Long id, @RequestAttribute("user") User user){
        categoryService.delete(id, user.getId());
        return ResponseEntity.noContent().build();
    }
}
