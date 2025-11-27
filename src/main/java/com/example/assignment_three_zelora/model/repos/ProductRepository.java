package com.example.assignment_three_zelora.model.repos;

import com.example.assignment_three_zelora.model.entitys.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Date;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    
    // Search products by name, description, manufacturer, colour, or material
    @Query("SELECT p FROM Product p WHERE " +
           "LOWER(p.productName) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(CAST(p.description AS STRING)) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(p.manufacturer) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(p.colour) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(p.material) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Product> searchByNameOrDescription(@Param("query") String query);
    
    // Search products by description only
    @Query("SELECT p FROM Product p WHERE LOWER(CAST(p.description AS STRING)) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> findByDescriptionContainingIgnoreCase(@Param("keyword") String keyword);
    
    // Find products by category
    @Query("SELECT p FROM Product p WHERE p.categoryId.categoryId = :categoryId")
    List<Product> findByCategory(@Param("categoryId") Integer categoryId);
    
    // Find recently added products (within 7 days)
    @Query("SELECT p FROM Product p WHERE p.releaseDate >= :date ORDER BY p.releaseDate DESC")
    List<Product> findRecentProducts(@Param("date") Date date);
    
    // Get random products for suggestions (limited)
    @Query(value = "SELECT * FROM products ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<Product> findRandomProducts(@Param("limit") int limit);
}