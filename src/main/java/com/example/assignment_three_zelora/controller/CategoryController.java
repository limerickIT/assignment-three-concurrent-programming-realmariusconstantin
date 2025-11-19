package com.example.assignment_three_zelora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.assignment_three_zelora.model.entitys.Category;
import com.example.assignment_three_zelora.model.repos.CategoryRepository;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    // Get all categories
    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    
    // Get category by ID
    @GetMapping("/categories/{id}")
    public Optional<Category> getCategoryById(@PathVariable Long id) {
        return categoryRepository.findById(id);
    }
    
    // Create new category
    @PostMapping("/categories")
    public Category createCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }
    
    // Update category
    @PutMapping("/categories/{id}")
    public Category updateCategory(@PathVariable Long id, @RequestBody Category categoryDetails) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            Category c = category.get();
            if (categoryDetails.getCategoryName() != null) c.setCategoryName(categoryDetails.getCategoryName());
            if (categoryDetails.getCategoryImage() != null) c.setCategoryImage(categoryDetails.getCategoryImage());
            return categoryRepository.save(c);
        }
        return null;
    }
    
    // Delete category
    @DeleteMapping("/categories/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryRepository.deleteById(id);
    }
}
