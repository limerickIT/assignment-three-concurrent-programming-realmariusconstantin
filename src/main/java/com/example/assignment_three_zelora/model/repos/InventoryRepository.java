package com.example.assignment_three_zelora.model.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.assignment_three_zelora.model.entitys.Inventory;
import com.example.assignment_three_zelora.model.entitys.Product;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
    
    // Find inventory by product (returns list to handle potential duplicates)
    List<Inventory> findByProductId(Product productId);
    
    // Find all low stock items (quantity <= reorder point)
    @Query("SELECT i FROM Inventory i WHERE i.quantityInStock <= i.reorderPoint")
    List<Inventory> findLowStockItems();
    
    // Find out of stock items
    @Query("SELECT i FROM Inventory i WHERE i.quantityInStock <= 0")
    List<Inventory> findOutOfStockItems();
}
