package com.example.assignment_three_zelora.model.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.assignment_three_zelora.model.entitys.Wishlist;
import com.example.assignment_three_zelora.model.entitys.Customer;
import com.example.assignment_three_zelora.model.entitys.Product;
import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {
    List<Wishlist> findByCustomerId(Customer customer);
    
    Optional<Wishlist> findByCustomerIdAndProductId(Customer customer, Product product);
    
    boolean existsByCustomerIdAndProductId(Customer customer, Product product);
    
    @Query("SELECT COALESCE(MAX(w.wishlistId), 0) FROM Wishlist w")
    Integer findMaxWishlistId();
}
