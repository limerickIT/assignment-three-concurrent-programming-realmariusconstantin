package com.example.assignment_three_zelora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.assignment_three_zelora.model.entitys.Inventory;
import com.example.assignment_three_zelora.model.entitys.Product;
import com.example.assignment_three_zelora.model.repos.InventoryRepository;
import com.example.assignment_three_zelora.model.repos.ProductRepository;
import com.example.assignment_three_zelora.dto.StockStatusDto;
import com.example.assignment_three_zelora.service.DtoMapperService;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("")
@CrossOrigin(origins = "http://localhost:3000")
public class InventoryController {
    
    @Autowired
    private InventoryRepository inventoryRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private DtoMapperService dtoMapperService;
    
    // Get all inventory items
    @GetMapping("/inventory")
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }
    
    // Get all inventory as DTOs
    @GetMapping("/inventory/status")
    public List<StockStatusDto> getAllInventoryStatus() {
        return inventoryRepository.findAll().stream()
                .map(dtoMapperService::toStockStatusDto)
                .collect(Collectors.toList());
    }
    
    // Get stock status for a specific product
    @GetMapping("/inventory/product/{productId}")
    public ResponseEntity<StockStatusDto> getProductStockStatus(@PathVariable Integer productId) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()) {
            Optional<Inventory> inventory = inventoryRepository.findByProductId(product.get());
            if (inventory.isPresent()) {
                StockStatusDto dto = dtoMapperService.toStockStatusDto(inventory.get());
                return ResponseEntity.ok(dto);
            }
            // If no inventory record, assume out of stock
            StockStatusDto dto = new StockStatusDto();
            dto.setProductId(productId);
            dto.setProductName(product.get().getProductName());
            dto.setQuantityInStock(0);
            dto.setQuantityReserved(0);
            dto.calculateStatus();
            return ResponseEntity.ok(dto);
        }
        return ResponseEntity.notFound().build();
    }
    
    // Get low stock items
    @GetMapping("/inventory/low-stock")
    public List<StockStatusDto> getLowStockItems() {
        return inventoryRepository.findLowStockItems().stream()
                .map(dtoMapperService::toStockStatusDto)
                .collect(Collectors.toList());
    }
    
    // Get out of stock items
    @GetMapping("/inventory/out-of-stock")
    public List<StockStatusDto> getOutOfStockItems() {
        return inventoryRepository.findOutOfStockItems().stream()
                .map(dtoMapperService::toStockStatusDto)
                .collect(Collectors.toList());
    }
    
    // Update inventory quantity
    @PutMapping("/inventory/{inventoryId}")
    public ResponseEntity<?> updateInventory(
            @PathVariable Integer inventoryId,
            @RequestBody Map<String, Object> data) {
        try {
            Optional<Inventory> inventory = inventoryRepository.findById(inventoryId);
            if (inventory.isPresent()) {
                Inventory inv = inventory.get();
                
                if (data.containsKey("quantityInStock")) {
                    inv.setQuantityInStock(((Number) data.get("quantityInStock")).intValue());
                }
                if (data.containsKey("quantityReserved")) {
                    inv.setQuantityReserved(((Number) data.get("quantityReserved")).intValue());
                }
                if (data.containsKey("reorderPoint")) {
                    inv.setReorderPoint(((Number) data.get("reorderPoint")).intValue());
                }
                
                Inventory updated = inventoryRepository.save(inv);
                return ResponseEntity.ok(dtoMapperService.toStockStatusDto(updated));
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Failed to update inventory: " + e.getMessage()));
        }
    }
}
