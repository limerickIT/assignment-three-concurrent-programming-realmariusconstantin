package com.example.assignment_three_zelora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.assignment_three_zelora.model.entitys.Product;
import com.example.assignment_three_zelora.model.entitys.Inventory;
import com.example.assignment_three_zelora.model.entitys.Review;
import com.example.assignment_three_zelora.model.repos.ProductRepository;
import com.example.assignment_three_zelora.model.repos.InventoryRepository;
import com.example.assignment_three_zelora.model.repos.ReviewRepository;
import com.example.assignment_three_zelora.dto.ProductDetailDto;
import com.example.assignment_three_zelora.service.DtoMapperService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private InventoryRepository inventoryRepository;
    
    @Autowired
    private ReviewRepository reviewRepository;
    
    @Autowired
    private DtoMapperService dtoMapperService;
    
    // Get all products
    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    // Get all products with review counts and ratings (for product cards)
    @GetMapping("/products/with-reviews")
    public List<java.util.Map<String, Object>> getAllProductsWithReviews() {
        return productRepository.findAll().stream()
                .map(this::enrichProductWithReviews)
                .collect(Collectors.toList());
    }
    
    // Get product by ID
    @GetMapping("/products/{id}")
    public Optional<Product> getProductById(@PathVariable Integer id) {
        return productRepository.findById(id);
    }
    
    // Create new product
    @PostMapping("/products")
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }
    
    // Update product
    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable Integer id, @RequestBody Product productDetails) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            Product p = product.get();
            if (productDetails.getProductName() != null) p.setProductName(productDetails.getProductName());
            if (productDetails.getDescription() != null) p.setDescription(productDetails.getDescription());
            if (productDetails.getPrice() != null) p.setPrice(productDetails.getPrice());
            if (productDetails.getFeatureImage() != null) p.setFeatureImage(productDetails.getFeatureImage());
            if (productDetails.getCategoryId() != null) p.setCategoryId(productDetails.getCategoryId());
            return productRepository.save(p);
        }
        return null;
    }
    
    // Delete product
    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable Integer id) {
        productRepository.deleteById(id);
    }
    
    // Helper method to enrich product with review data (simplified for performance)
    private java.util.Map<String, Object> enrichProductWithReviews(Product product) {
        java.util.Map<String, Object> productData = new java.util.HashMap<>();
        productData.put("productId", product.getProductId());
        productData.put("productName", product.getProductName());
        productData.put("description", product.getDescription());
        productData.put("price", product.getPrice());
        productData.put("discountedPrice", product.getDiscountedPrice());
        productData.put("featureImage", product.getFeatureImage());
        productData.put("size", product.getSize());
        productData.put("colour", product.getColour());
        productData.put("material", product.getMaterial());
        productData.put("sustainabilityRating", product.getSustainabilityRating());
        productData.put("manufacturer", product.getManufacturer());
        productData.put("releaseDate", product.getReleaseDate());
        
        // Category info
        if (product.getCategoryId() != null) {
            productData.put("categoryId", product.getCategoryId().getCategoryId());
            productData.put("categoryName", product.getCategoryId().getCategoryName());
        }
        
        // Get inventory
        List<Inventory> inventories = inventoryRepository.findByProductId(product);
        if (!inventories.isEmpty()) {
            Inventory inv = inventories.get(0); // Take first if duplicates exist
            int quantityInStock = inv.getQuantityInStock() != null ? inv.getQuantityInStock() : 0;
            int quantityReserved = inv.getQuantityReserved() != null ? inv.getQuantityReserved() : 0;
            int available = quantityInStock - quantityReserved;
            productData.put("stockQuantity", available);
        } else {
            productData.put("stockQuantity", 0);
        }
        
        // Get review statistics using single queries
        Double avgRating = reviewRepository.getAverageRatingByProductId(product.getProductId());
        productData.put("averageRating", avgRating != null ? Math.round(avgRating * 10.0) / 10.0 : 0.0);
        
        // Get total review count using optimized query
        Long reviewCount = reviewRepository.getReviewCountByProductId(product.getProductId());
        productData.put("totalReviews", reviewCount != null ? reviewCount.intValue() : 0);
        
        return productData;
    }

    // Search products by query with fuzzy matching
    @GetMapping("/products/search")
    public List<java.util.Map<String, Object>> searchProducts(@RequestParam String query) {
        // Direct search first
        List<Product> results = productRepository.searchByNameOrDescription(query);
        
        // If no results, try searching each word individually for partial matching
        if (results.isEmpty() && query.contains(" ")) {
            String[] words = query.split("\\s+");
            for (String word : words) {
                if (word.length() >= 3) { // Only search words with 3+ characters
                    List<Product> partialResults = productRepository.searchByNameOrDescription(word);
                    results.addAll(partialResults);
                }
            }
            // Remove duplicates
            results = results.stream().distinct().collect(Collectors.toList());
        }
        
        return results.stream()
                .map(this::enrichProductWithReviews)
                .collect(Collectors.toList());
    }

    // Get products by category
    @GetMapping("/products/category/{categoryId}")
    public List<java.util.Map<String, Object>> getProductsByCategory(@PathVariable Integer categoryId) {
        return productRepository.findByCategory(categoryId).stream()
                .map(this::enrichProductWithReviews)
                .collect(Collectors.toList());
    }
    
    // Get random product suggestions
    @GetMapping("/products/suggestions")
    public List<java.util.Map<String, Object>> getProductSuggestions(@RequestParam(defaultValue = "8") int limit) {
        List<Product> products;
        try {
            products = productRepository.findRandomProducts(limit);
        } catch (Exception e) {
            // Fallback if RAND() not supported - get first N products
            products = productRepository.findAll().stream().limit(limit).collect(Collectors.toList());
        }
        return products.stream()
                .map(this::enrichProductWithReviews)
                .collect(Collectors.toList());
    }
    
    // Search products by description keyword
    @GetMapping("/products/search/description")
    public List<java.util.Map<String, Object>> searchByDescription(@RequestParam String keyword) {
        return productRepository.findByDescriptionContainingIgnoreCase(keyword).stream()
                .map(this::enrichProductWithReviews)
                .collect(Collectors.toList());
    }
    
    // Get recently added products (within last 7 days)
    @GetMapping("/products/recent")
    public List<java.util.Map<String, Object>> getRecentProducts() {
        java.util.Calendar cal = java.util.Calendar.getInstance();
        cal.add(java.util.Calendar.DAY_OF_MONTH, -7);
        java.util.Date sevenDaysAgo = cal.getTime();
        return productRepository.findRecentProducts(sevenDaysAgo).stream()
                .map(this::enrichProductWithReviews)
                .collect(Collectors.toList());
    }
    
    // Get detailed product information with inventory and reviews
    @GetMapping("/products/{id}/details")
    public ResponseEntity<ProductDetailDto> getProductDetails(@PathVariable Integer id) {
        Optional<Product> productOpt = productRepository.findById(id);
        
        if (!productOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        Product product = productOpt.get();
        
        // Get inventory information
        List<Inventory> inventories = inventoryRepository.findByProductId(product);
        Inventory inventory = !inventories.isEmpty() ? inventories.get(0) : null;
        
        // Get reviews with rating >= 3 (as per assignment requirement)
        List<Review> reviews = reviewRepository.findByProductIdAndRatingGreaterThanEqual(product, 3)
                .stream()
                .filter(r -> !Boolean.TRUE.equals(r.getFlaggedAsSpam()))
                .collect(Collectors.toList());
        
        // Get average rating from repository
        Double avgRating = reviewRepository.getAverageRatingByProductId(id);
        
        // Build ProductDetailDto
        ProductDetailDto dto = new ProductDetailDto();
        dto.setProductId(product.getProductId());
        dto.setProductName(product.getProductName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setDiscountedPrice(product.getDiscountedPrice());
        dto.setFeatureImage(product.getFeatureImage());
        dto.setSize(product.getSize());
        dto.setColour(product.getColour());
        dto.setMaterial(product.getMaterial());
        dto.setSustainabilityRating(product.getSustainabilityRating());
        dto.setManufacturer(product.getManufacturer());
        dto.setReleaseDate(product.getReleaseDate());
        
        // Category info
        if (product.getCategoryId() != null) {
            dto.setCategoryId(product.getCategoryId().getCategoryId());
            dto.setCategoryName(product.getCategoryId().getCategoryName());
        }
        
        // Inventory logic: available = quantity_in_stock - quantity_reserved
        if (inventory != null) {
            int quantityInStock = inventory.getQuantityInStock() != null ? inventory.getQuantityInStock() : 0;
            int quantityReserved = inventory.getQuantityReserved() != null ? inventory.getQuantityReserved() : 0;
            int reorderPoint = inventory.getReorderPoint() != null ? inventory.getReorderPoint() : 0;
            int available = quantityInStock - quantityReserved;
            
            dto.setStockQuantity(quantityInStock);
            dto.setQuantityReserved(quantityReserved);
            dto.setAvailableQuantity(available);
            dto.setReorderPoint(reorderPoint);
            
            // Calculate stock status based on available quantity
            String stockStatus;
            if (available <= 0) {
                stockStatus = "Out of Stock";
                dto.setInStock(false);
            } else if (available <= reorderPoint) {
                stockStatus = "Low Stock";
                dto.setInStock(true);
            } else {
                stockStatus = "In Stock";
                dto.setInStock(true);
            }
            dto.setStockStatus(stockStatus);
        } else {
            dto.setStockQuantity(0);
            dto.setQuantityReserved(0);
            dto.setAvailableQuantity(0);
            dto.setReorderPoint(0);
            dto.setStockStatus("Out of Stock");
            dto.setInStock(false);
        }
        
        // Reviews with customer first name and city
        List<com.example.assignment_three_zelora.dto.ReviewDto> reviewDtos = reviews.stream()
                .map(dtoMapperService::toReviewDto)
                .collect(Collectors.toList());
        dto.setReviews(reviewDtos);
        dto.setTotalReviews(reviews.size());
        
        // Average rating
        dto.setAverageRating(avgRating != null ? Math.round(avgRating * 10.0) / 10.0 : 0.0);
        
        return ResponseEntity.ok(dto);
    }
}
