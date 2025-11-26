package com.example.assignment_three_zelora.model.repos;

import com.example.assignment_three_zelora.model.entitys.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
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
    @Transactional
    @Modifying
    @Query("DELETE FROM CartItem c WHERE c.cartItemId = :cartItemId AND c.userId = :userId")
    void deleteByCartItemIdAndUserId(@Param("cartItemId") Integer cartItemId, @Param("userId") Integer userId);
    
    // Clear entire cart for a user
    @Transactional
    @Modifying
    @Query("DELETE FROM CartItem c WHERE c.userId = :userId")
    void deleteByUserId(@Param("userId") Integer userId);
}
