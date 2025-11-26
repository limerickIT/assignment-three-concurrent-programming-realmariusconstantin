package com.example.assignment_three_zelora.dto;

/**
 * DTO for stock/inventory status information.
 * Used for inventory management and stock checks.
 */
public class StockStatusDto {
    
    private Integer productId;
    private String productName;
    private Integer quantityInStock;
    private Integer quantityReserved;
    private Integer availableQuantity;
    private Integer reorderPoint;
    private boolean inStock;
    private boolean lowStock;
    private String stockStatus; // "IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK", "RESERVED"
    
    // Default constructor
    public StockStatusDto() {
    }
    
    // Full constructor
    public StockStatusDto(Integer productId, String productName, Integer quantityInStock,
                         Integer quantityReserved, Integer availableQuantity,
                         Integer reorderPoint, boolean inStock, boolean lowStock,
                         String stockStatus) {
        this.productId = productId;
        this.productName = productName;
        this.quantityInStock = quantityInStock;
        this.quantityReserved = quantityReserved;
        this.availableQuantity = availableQuantity;
        this.reorderPoint = reorderPoint;
        this.inStock = inStock;
        this.lowStock = lowStock;
        this.stockStatus = stockStatus;
    }

    // Getters and Setters
    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getQuantityInStock() {
        return quantityInStock;
    }

    public void setQuantityInStock(Integer quantityInStock) {
        this.quantityInStock = quantityInStock;
    }

    public Integer getQuantityReserved() {
        return quantityReserved;
    }

    public void setQuantityReserved(Integer quantityReserved) {
        this.quantityReserved = quantityReserved;
    }

    public Integer getAvailableQuantity() {
        return availableQuantity;
    }

    public void setAvailableQuantity(Integer availableQuantity) {
        this.availableQuantity = availableQuantity;
    }

    public Integer getReorderPoint() {
        return reorderPoint;
    }

    public void setReorderPoint(Integer reorderPoint) {
        this.reorderPoint = reorderPoint;
    }

    public boolean isInStock() {
        return inStock;
    }

    public void setInStock(boolean inStock) {
        this.inStock = inStock;
    }

    public boolean isLowStock() {
        return lowStock;
    }

    public void setLowStock(boolean lowStock) {
        this.lowStock = lowStock;
    }

    public String getStockStatus() {
        return stockStatus;
    }

    public void setStockStatus(String stockStatus) {
        this.stockStatus = stockStatus;
    }
    
    /**
     * Calculate stock status based on quantities and reorder point.
     */
    public void calculateStatus() {
        int available = (quantityInStock != null ? quantityInStock : 0) 
                      - (quantityReserved != null ? quantityReserved : 0);
        this.availableQuantity = Math.max(0, available);
        
        if (this.availableQuantity <= 0) {
            this.inStock = false;
            this.lowStock = false;
            this.stockStatus = "OUT_OF_STOCK";
        } else if (reorderPoint != null && this.availableQuantity <= reorderPoint) {
            this.inStock = true;
            this.lowStock = true;
            this.stockStatus = "LOW_STOCK";
        } else {
            this.inStock = true;
            this.lowStock = false;
            this.stockStatus = "IN_STOCK";
        }
    }
}
