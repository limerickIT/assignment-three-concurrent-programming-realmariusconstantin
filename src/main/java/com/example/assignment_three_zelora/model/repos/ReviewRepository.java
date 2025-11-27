package com.example.assignment_three_zelora.model.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.assignment_three_zelora.model.entitys.Review;
import com.example.assignment_three_zelora.model.entitys.Product;
import com.example.assignment_three_zelora.model.entitys.Customer;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    
    // Find reviews by product
    List<Review> findByProductId(Product productId);
    
    // Find reviews by customer
    List<Review> findByCustomerId(Customer customerId);
    
    // Find reviews by product with rating greater than or equal to minimum rating
    List<Review> findByProductIdAndRatingGreaterThanEqual(Product productId, Integer minRating);
    
    // Get average rating for a product
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.productId.productId = :productId AND COALESCE(r.flaggedAsSpam, false) = false AND r.rating IS NOT NULL")
    Double getAverageRatingByProductId(@Param("productId") Integer productId);
    
    // Get review count for a product
    @Query("SELECT COUNT(r) FROM Review r WHERE r.productId.productId = :productId AND COALESCE(r.flaggedAsSpam, false) = false")
    Long getReviewCountByProductId(@Param("productId") Integer productId);
    
    // Get max review ID for auto-increment
    @Query("SELECT COALESCE(MAX(r.reviewId), 0) FROM Review r")
    Integer findMaxReviewId();
}
