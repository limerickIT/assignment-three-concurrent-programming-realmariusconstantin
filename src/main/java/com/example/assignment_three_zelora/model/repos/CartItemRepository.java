package com.example.assignment_three_zelora.model.repos;

import com.example.assignment_three_zelora.model.entitys.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    
    // Find all cart items for a specific user
    List<CartItem> findByUserId(Integer userId);
    
    // Find a specific product in a user's cart
    @Query("SELECT c FROM CartItem c WHERE c.userId = :userId AND c.productId.productId = :productId")
    Optional<CartItem> findByUserIdAndProductId(@Param("userId") Integer userId, @Param("productId") Integer productId);
    
    // Delete a specific item from user's cart
    void deleteByCartItemIdAndUserId(Integer cartItemId, Integer userId);
    
    // Clear entire cart for a user
    void deleteByUserId(Integer userId);
}
