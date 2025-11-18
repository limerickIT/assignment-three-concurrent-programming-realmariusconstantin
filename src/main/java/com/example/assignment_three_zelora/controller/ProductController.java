package com.example.assignment_three_zelora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.assignment_three_zelora.model.entitys.Product;
import com.example.assignment_three_zelora.model.repos.ProductRepository;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("")
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
            return productRepository.save(p);
        }
        return null;
    }
    
    // Delete product
    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable Integer id) {
        productRepository.deleteById(id);
    }
    
    // Search products by query
    @GetMapping("/products/search")
    public List<Product> searchProducts(@RequestParam String query) {
        return productRepository.searchByNameOrDescription(query);
    }

    // Get products by category
    @GetMapping("/products/category/{categoryId}")
    public List<Product> getProductsByCategory(@PathVariable Integer categoryId) {
        return productRepository.findByCategory(categoryId);
    }
}
