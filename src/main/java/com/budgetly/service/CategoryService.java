package com.budgetly.service;

import com.budgetly.model.dto.CategoryCreationDto;
import com.budgetly.model.dto.CategoryDto;
import com.budgetly.model.entity.Category;
import com.budgetly.model.entity.User;
import com.budgetly.exception.ObjectAlreadyExistException;
import com.budgetly.exception.ForbiddenException;
import com.budgetly.model.mapper.CategoryMapper;
import com.budgetly.model.repository.CategoryRepository;
import com.budgetly.model.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final UserRepository userRepository;

    public List<CategoryDto> getAll(Long userId){
        List<Category> categories = categoryRepository.findAllByUserId(userId);
        return categories.stream().map(categoryMapper::toDto).toList();
    }

    public CategoryDto getById(Long categoryId, Long userId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        if (!category.getUser().getId().equals(userId)) {
            throw new ForbiddenException("You do not have permission to access this category.");
        }

        return categoryMapper.toDto(category);
    }

    @Transactional
    public CategoryDto create(CategoryCreationDto categoryCreationDto, Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (categoryRepository.existsByNameAndUser(categoryCreationDto.name(), user)) {
            throw new ObjectAlreadyExistException("Category with name " + categoryCreationDto.name() + "already exists.");
        }

        Category category = categoryMapper.toEntity(categoryCreationDto);
        category.setUser(user);
        return categoryMapper.toDto(categoryRepository.save(category));
    }

    @Transactional
    public CategoryDto update(Long categoryId, CategoryDto categoryDto, Long userId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        if (!category.getUser().getId().equals(userId)) {
            throw new ForbiddenException("You do not have permission to update this category.");
        }

        categoryMapper.partialUpdate(categoryDto, category);
        return categoryMapper.toDto(categoryRepository.save(category));
    }

    @Transactional
    public void delete(Long categoryId, Long userId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        if (!category.getUser().getId().equals(userId)) {
            throw new ForbiddenException("You do not have permission to delete this category.");
        }

        if (categoryRepository.countAllByUserId(userId) <= 1) {
            throw new IllegalStateException("You must have at least one category.");
        }

        categoryRepository.delete(category);
    }
}
