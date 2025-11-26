package com.example.assignment_three_zelora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
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
    public Optional<Category> getCategoryById(@PathVariable Integer id) {
        return categoryRepository.findById(id);
    }
    
    // Create new category
    @PostMapping("/categories")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        try {
            // Generate new ID
            Integer maxId = categoryRepository.findMaxCategoryId();
            category.setCategoryId(maxId + 1);
            Category saved = categoryRepository.save(category);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Update category
    @PutMapping("/categories/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Integer id, @RequestBody Category categoryDetails) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            Category c = category.get();
            if (categoryDetails.getCategoryName() != null) c.setCategoryName(categoryDetails.getCategoryName());
            if (categoryDetails.getCategoryImage() != null) c.setCategoryImage(categoryDetails.getCategoryImage());
            if (categoryDetails.getCategoryDescription() != null) c.setCategoryDescription(categoryDetails.getCategoryDescription());
            Category saved = categoryRepository.save(c);
            return ResponseEntity.ok(saved);
        }
        return ResponseEntity.notFound().build();
    }
    
    // Delete category
    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Integer id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
