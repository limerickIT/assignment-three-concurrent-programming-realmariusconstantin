package com.example.assignment_three_zelora.model.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.assignment_three_zelora.model.entitys.Review;
import com.example.assignment_three_zelora.model.entitys.Product;
import com.example.assignment_three_zelora.model.entitys.Customer;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    
    // Find reviews by product
    List<Review> findByProductId(Product productId);
    
    // Find reviews by customer
    List<Review> findByCustomerId(Customer customerId);
    
    // Get max review ID for auto-increment
    @Query("SELECT COALESCE(MAX(r.reviewId), 0) FROM Review r")
    Integer findMaxReviewId();
}
