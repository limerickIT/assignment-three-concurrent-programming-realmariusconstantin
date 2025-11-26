package com.example.assignment_three_zelora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.assignment_three_zelora.model.entitys.Product;
import com.example.assignment_three_zelora.model.repos.ProductRepository;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;
import java.util.stream.Collectors;

@RestController
@RequestMapping("")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    
    @Autowired
    private ProductRepository productRepository;
    
    // Get all products
    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    // Get product by ID
    @GetMapping("/products/{id}")
    public Optional<Product> getProductById(@PathVariable Integer id) {
        return productRepository.findById(id);
    }
    
    // Create new product
    @PostMapping("/products")
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }
    
    // Update product
    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable Integer id, @RequestBody Product productDetails) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            Product p = product.get();
            if (productDetails.getProductName() != null) p.setProductName(productDetails.getProductName());
            if (productDetails.getDescription() != null) p.setDescription(productDetails.getDescription());
            if (productDetails.getPrice() != null) p.setPrice(productDetails.getPrice());
            if (productDetails.getFeatureImage() != null) p.setFeatureImage(productDetails.getFeatureImage());
            if (productDetails.getCategoryId() != null) p.setCategoryId(productDetails.getCategoryId());
            return productRepository.save(p);
        }
        return null;
    }
    
    // Delete product
    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable Integer id) {
        productRepository.deleteById(id);
    }
    
    // Search products by query with fuzzy matching
    @GetMapping("/products/search")
    public List<Product> searchProducts(@RequestParam String query) {
        // Direct search first
        List<Product> results = productRepository.searchByNameOrDescription(query);
        
        // If no results, try searching each word individually for partial matching
        if (results.isEmpty() && query.contains(" ")) {
            String[] words = query.split("\\s+");
            for (String word : words) {
                if (word.length() >= 3) { // Only search words with 3+ characters
                    List<Product> partialResults = productRepository.searchByNameOrDescription(word);
                    results.addAll(partialResults);
                }
            }
            // Remove duplicates
            results = results.stream().distinct().collect(Collectors.toList());
        }
        
        return results;
    }

    // Get products by category
    @GetMapping("/products/category/{categoryId}")
    public List<Product> getProductsByCategory(@PathVariable Integer categoryId) {
        return productRepository.findByCategory(categoryId);
    }
    
    // Get random product suggestions
    @GetMapping("/products/suggestions")
    public List<Product> getProductSuggestions(@RequestParam(defaultValue = "8") int limit) {
        try {
            return productRepository.findRandomProducts(limit);
        } catch (Exception e) {
            // Fallback if RAND() not supported - get first N products
            return productRepository.findAll().stream().limit(limit).collect(Collectors.toList());
        }
    }
}
