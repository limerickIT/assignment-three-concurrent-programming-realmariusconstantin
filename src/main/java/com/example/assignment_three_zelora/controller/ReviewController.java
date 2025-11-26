package com.example.assignment_three_zelora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.example.assignment_three_zelora.model.entitys.Review;
import com.example.assignment_three_zelora.model.entitys.Customer;
import com.example.assignment_three_zelora.model.entitys.Product;
import com.example.assignment_three_zelora.model.repos.ReviewRepository;
import com.example.assignment_three_zelora.model.repos.CustomerRepository;
import com.example.assignment_three_zelora.model.repos.ProductRepository;
import com.example.assignment_three_zelora.dto.ReviewDto;
import com.example.assignment_three_zelora.service.DtoMapperService;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {
    
    @Autowired
    private ReviewRepository reviewRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @Autowired
    private DtoMapperService dtoMapperService;
    
    // Get all reviews
    @GetMapping("/reviews")
    public List<ReviewDto> getAllReviews() {
        return reviewRepository.findAll().stream()
                .map(dtoMapperService::toReviewDto)
                .collect(Collectors.toList());
    }
    
    // Get review by ID
    @GetMapping("/reviews/{id}")
    public ResponseEntity<ReviewDto> getReviewById(@PathVariable Integer id) {
        Optional<Review> review = reviewRepository.findById(id);
        return review.map(r -> ResponseEntity.ok(dtoMapperService.toReviewDto(r)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get reviews for a product
    @GetMapping("/reviews/product/{productId}")
    public ResponseEntity<List<ReviewDto>> getReviewsByProduct(@PathVariable Integer productId) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()) {
            List<Review> reviews = reviewRepository.findByProductId(product.get());
            List<ReviewDto> dtos = reviews.stream()
                    .filter(r -> !Boolean.TRUE.equals(r.getFlaggedAsSpam()))
                    .map(dtoMapperService::toReviewDto)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(dtos);
        }
        return ResponseEntity.ok(new ArrayList<>());
    }
    
    // Get reviews by customer
    @GetMapping("/reviews/customer/{customerId}")
    public ResponseEntity<List<ReviewDto>> getReviewsByCustomer(@PathVariable Long customerId) {
        Optional<Customer> customer = customerRepository.findById(customerId);
        if (customer.isPresent()) {
            List<Review> reviews = reviewRepository.findByCustomerId(customer.get());
            List<ReviewDto> dtos = reviews.stream()
                    .map(dtoMapperService::toReviewDto)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(dtos);
        }
        return ResponseEntity.ok(new ArrayList<>());
    }
    
    // Get average rating for a product
    @GetMapping("/reviews/product/{productId}/rating")
    public ResponseEntity<?> getProductAverageRating(@PathVariable Integer productId) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()) {
            List<Review> reviews = reviewRepository.findByProductId(product.get());
            List<Review> validReviews = reviews.stream()
                    .filter(r -> !Boolean.TRUE.equals(r.getFlaggedAsSpam()) && r.getRating() != null)
                    .collect(Collectors.toList());
            
            double avgRating = validReviews.stream()
                    .mapToInt(Review::getRating)
                    .average()
                    .orElse(0.0);
            
            return ResponseEntity.ok(Map.of(
                "productId", productId,
                "averageRating", Math.round(avgRating * 10.0) / 10.0,
                "totalReviews", validReviews.size()
            ));
        }
        return ResponseEntity.notFound().build();
    }
    
    // Create new review
    @PostMapping("/reviews")
    public ResponseEntity<?> createReview(@RequestBody Map<String, Object> data) {
        try {
            Integer productId = ((Number) data.get("productId")).intValue();
            Long customerId = ((Number) data.get("customerId")).longValue();
            Integer rating = ((Number) data.get("rating")).intValue();
            String reviewText = (String) data.get("reviewText");
            
            Optional<Product> product = productRepository.findById(productId);
            Optional<Customer> customer = customerRepository.findById(customerId);
            
            if (!product.isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Product not found"));
            }
            if (!customer.isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Customer not found"));
            }
            
            // Check if customer already reviewed this product
            boolean alreadyReviewed = reviewRepository.findByProductId(product.get()).stream()
                    .anyMatch(r -> r.getCustomerId() != null && 
                             r.getCustomerId().getCustomerId().equals(customer.get().getCustomerId()));
            
            if (alreadyReviewed) {
                return ResponseEntity.badRequest().body(Map.of("error", "You have already reviewed this product"));
            }
            
            // Get next ID
            Integer maxId = reviewRepository.findMaxReviewId();
            
            Review review = new Review();
            review.setReviewId(maxId + 1);
            review.setProductId(product.get());
            review.setCustomerId(customer.get());
            review.setRating(rating);
            review.setReviewText(reviewText);
            review.setReviewDate(new Date());
            review.setFlaggedAsSpam(false);
            
            Review saved = reviewRepository.save(review);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(dtoMapperService.toReviewDto(saved));
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to create review: " + e.getMessage()));
        }
    }
    
    // Delete review
    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Integer id) {
        if (reviewRepository.existsById(id)) {
            reviewRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    // Flag review as spam (admin)
    @PutMapping("/reviews/{id}/flag")
    public ResponseEntity<?> flagReview(@PathVariable Integer id) {
        Optional<Review> review = reviewRepository.findById(id);
        if (review.isPresent()) {
            Review r = review.get();
            r.setFlaggedAsSpam(true);
            reviewRepository.save(r);
            return ResponseEntity.ok(Map.of("success", true, "message", "Review flagged as spam"));
        }
        return ResponseEntity.notFound().build();
    }
}
