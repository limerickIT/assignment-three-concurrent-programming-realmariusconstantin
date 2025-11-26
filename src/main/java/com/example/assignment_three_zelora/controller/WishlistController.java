package com.example.assignment_three_zelora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.example.assignment_three_zelora.model.entitys.Wishlist;
import com.example.assignment_three_zelora.model.entitys.Customer;
import com.example.assignment_three_zelora.model.entitys.Product;
import com.example.assignment_three_zelora.model.repos.WishlistRepository;
import com.example.assignment_three_zelora.model.repos.CustomerRepository;
import com.example.assignment_three_zelora.model.repos.ProductRepository;
import com.example.assignment_three_zelora.dto.WishlistItemDto;
import com.example.assignment_three_zelora.service.DtoMapperService;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("")
@CrossOrigin(origins = "http://localhost:3000")
public class WishlistController {
    
    @Autowired
    private WishlistRepository wishlistRepository;
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private DtoMapperService dtoMapperService;
    
    // Get all wishlist items
    @GetMapping("/wishlist")
    public List<Wishlist> getAllWishlistItems() {
        return wishlistRepository.findAll();
    }
    
    // Get wishlist items for a customer (returns DTOs)
    @GetMapping("/wishlist/customer/{customerId}")
    public ResponseEntity<List<WishlistItemDto>> getWishlistByCustomer(@PathVariable Integer customerId) {
        Optional<Customer> customer = customerRepository.findById(customerId);
        if (customer.isPresent()) {
            List<Wishlist> items = wishlistRepository.findByCustomerId(customer.get());
            List<WishlistItemDto> dtos = items.stream()
                    .map(w -> dtoMapperService.toWishlistItemDto(w, null))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(dtos);
        }
        return ResponseEntity.ok(new ArrayList<>());
    }
    
    // Check if product is in customer's wishlist
    @GetMapping("/wishlist/check")
    public ResponseEntity<?> checkWishlistItem(
            @RequestParam Integer customerId,
            @RequestParam Integer productId) {
        Optional<Customer> customer = customerRepository.findById(customerId);
        Optional<Product> product = productRepository.findById(productId);
        
        if (customer.isPresent() && product.isPresent()) {
            boolean exists = wishlistRepository.existsByCustomerIdAndProductId(customer.get(), product.get());
            return ResponseEntity.ok(Map.of("inWishlist", exists));
        }
        return ResponseEntity.ok(Map.of("inWishlist", false));
    }
    
    // Add item to wishlist
    @PostMapping("/wishlist")
    public ResponseEntity<?> addToWishlist(@RequestBody Map<String, Object> data) {
        try {
            Integer customerId = ((Number) data.get("customerId")).intValue();
            Integer productId = ((Number) data.get("productId")).intValue();
            
            Optional<Customer> customer = customerRepository.findById(customerId);
            Optional<Product> product = productRepository.findById(productId);
            
            if (!customer.isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Customer not found"));
            }
            if (!product.isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Product not found"));
            }
            
            // Check if already in wishlist
            if (wishlistRepository.existsByCustomerIdAndProductId(customer.get(), product.get())) {
                return ResponseEntity.ok(Map.of("message", "Product already in wishlist", "exists", true));
            }
            
            // Create new wishlist item
            Integer maxId = wishlistRepository.findMaxWishlistId();
            Wishlist wishlist = new Wishlist();
            wishlist.setWishlistId(maxId + 1);
            wishlist.setCustomerId(customer.get());
            wishlist.setProductId(product.get());
            wishlist.setAddedDate(new Date());
            wishlist.setWishlistName((String) data.getOrDefault("wishlistName", "My Wishlist"));
            wishlist.setNotes((String) data.get("notes"));
            
            Wishlist saved = wishlistRepository.save(wishlist);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "success", true,
                "wishlistId", saved.getWishlistId(),
                "message", "Added to wishlist"
            ));
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to add to wishlist: " + e.getMessage()));
        }
    }
    
    // Remove item from wishlist
    @DeleteMapping("/wishlist/{id}")
    public ResponseEntity<Void> removeFromWishlist(@PathVariable Integer id) {
        if (wishlistRepository.existsById(id)) {
            wishlistRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    // Remove item from wishlist by customer and product
    @DeleteMapping("/wishlist/customer/{customerId}/product/{productId}")
    public ResponseEntity<?> removeFromWishlistByProduct(
            @PathVariable Integer customerId,
            @PathVariable Integer productId) {
        try {
            Optional<Customer> customer = customerRepository.findById(customerId);
            Optional<Product> product = productRepository.findById(productId);
            
            if (customer.isPresent() && product.isPresent()) {
                Optional<Wishlist> wishlistItem = wishlistRepository.findByCustomerIdAndProductId(customer.get(), product.get());
                if (wishlistItem.isPresent()) {
                    wishlistRepository.delete(wishlistItem.get());
                    return ResponseEntity.ok(Map.of("success", true, "message", "Removed from wishlist"));
                }
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to remove from wishlist"));
        }
    }
}
