package com.example.assignment_three_zelora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.example.assignment_three_zelora.model.entitys.Orders;
import com.example.assignment_three_zelora.model.entitys.Orderitem;
import com.example.assignment_three_zelora.model.entitys.Customer;
import com.example.assignment_three_zelora.model.entitys.Product;
import com.example.assignment_three_zelora.model.repos.OrdersRepository;
import com.example.assignment_three_zelora.model.repos.OrderItemRepository;
import com.example.assignment_three_zelora.model.repos.CustomerRepository;
import com.example.assignment_three_zelora.model.repos.ProductRepository;

import java.util.*;
import java.math.BigDecimal;

@RestController
@RequestMapping("")
@CrossOrigin(origins = "http://localhost:3000")
public class OrdersController {
    
    @Autowired
    private OrdersRepository ordersRepository;
    
    @Autowired
    private OrderItemRepository orderItemRepository;
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    // Get all orders
    @GetMapping("/orders")
    public List<Orders> getAllOrders() {
        return ordersRepository.findAll();
    }
    
    // Get order by ID
    @GetMapping("/orders/{id}")
    public ResponseEntity<Orders> getOrderById(@PathVariable Integer id) {
        Optional<Orders> order = ordersRepository.findById(id);
        if (order.isPresent()) {
            return ResponseEntity.ok(order.get());
        }
        return ResponseEntity.notFound().build();
    }
    
    // Get orders by customer ID
    @GetMapping("/orders/customer/{customerId}")
    public ResponseEntity<List<Orders>> getOrdersByCustomer(@PathVariable Long customerId) {
        Optional<Customer> customer = customerRepository.findById(customerId);
        if (customer.isPresent()) {
            List<Orders> orders = ordersRepository.findByCustomerId(customer.get());
            return ResponseEntity.ok(orders);
        }
        return ResponseEntity.ok(new ArrayList<>());
    }
    
    // Create a new order
    @PostMapping("/orders")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> orderData) {
        try {
            // Get customer
            Integer customerId = (Integer) orderData.get("customerId");
            if (customerId == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Customer ID is required"));
            }
            
            Optional<Customer> customer = customerRepository.findById(customerId.longValue());
            if (!customer.isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Customer not found"));
            }
            
            // Generate new order ID
            Integer maxOrderId = ordersRepository.findMaxOrderId();
            Integer newOrderId = maxOrderId + 1;
            
            // Create new order
            Orders order = new Orders();
            order.setOrderId(newOrderId);
            order.setCustomerId(customer.get());
            order.setOrderDate(new Date());
            order.setOrderStatus((String) orderData.getOrDefault("status", "Pending"));
            order.setPaymentMethod((String) orderData.getOrDefault("paymentPreference", "card"));
            order.setShippingMethod((String) orderData.getOrDefault("shippingMethod", "Standard"));
            
            // Set total amount
            Object totalObj = orderData.get("totalAmount");
            if (totalObj != null) {
                if (totalObj instanceof Number) {
                    order.setTotalAmount(BigDecimal.valueOf(((Number) totalObj).doubleValue()));
                }
            }
            
            // Save the order
            Orders savedOrder = ordersRepository.save(order);
            
            // Create order items
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> orderItems = (List<Map<String, Object>>) orderData.get("orderItems");
            if (orderItems != null && !orderItems.isEmpty()) {
                Integer maxItemId = orderItemRepository.findMaxOrderItemId();
                int itemIdCounter = maxItemId + 1;
                
                for (Map<String, Object> itemData : orderItems) {
                    Orderitem orderItem = new Orderitem();
                    orderItem.setOrderItemId(itemIdCounter++);
                    orderItem.setOrderId(savedOrder);
                    
                    // Get product
                    Object productIdObj = itemData.get("productId");
                    if (productIdObj != null) {
                        Integer productId = productIdObj instanceof Integer ? 
                            (Integer) productIdObj : Integer.valueOf(productIdObj.toString());
                        Optional<Product> product = productRepository.findById(productId);
                        if (product.isPresent()) {
                            orderItem.setProductId(product.get());
                        }
                    }
                    
                    // Set quantity
                    Object qtyObj = itemData.get("quantity");
                    if (qtyObj != null) {
                        orderItem.setQuantity(qtyObj instanceof Integer ? 
                            (Integer) qtyObj : Integer.valueOf(qtyObj.toString()));
                    } else {
                        orderItem.setQuantity(1);
                    }
                    
                    // Set price
                    Object priceObj = itemData.get("price");
                    if (priceObj != null) {
                        if (priceObj instanceof Number) {
                            BigDecimal price = BigDecimal.valueOf(((Number) priceObj).doubleValue());
                            orderItem.setItemPrice(price);
                            orderItem.setSubtotal(price.multiply(BigDecimal.valueOf(orderItem.getQuantity())));
                        }
                    }
                    
                    orderItemRepository.save(orderItem);
                }
            }
            
            // Return success response with order ID
            Map<String, Object> response = new HashMap<>();
            response.put("orderId", savedOrder.getOrderId());
            response.put("message", "Order created successfully");
            response.put("status", savedOrder.getOrderStatus());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to create order: " + e.getMessage()));
        }
    }
    
    // Update order status
    @PutMapping("/orders/{id}")
    public ResponseEntity<Orders> updateOrder(@PathVariable Integer id, @RequestBody Map<String, Object> updates) {
        Optional<Orders> orderOpt = ordersRepository.findById(id);
        if (orderOpt.isPresent()) {
            Orders order = orderOpt.get();
            
            if (updates.containsKey("orderStatus")) {
                order.setOrderStatus((String) updates.get("orderStatus"));
            }
            if (updates.containsKey("paymentMethod")) {
                order.setPaymentMethod((String) updates.get("paymentMethod"));
            }
            if (updates.containsKey("shippingMethod")) {
                order.setShippingMethod((String) updates.get("shippingMethod"));
            }
            if (updates.containsKey("deliveryDate")) {
                // Handle date parsing if needed
            }
            
            Orders savedOrder = ordersRepository.save(order);
            return ResponseEntity.ok(savedOrder);
        }
        return ResponseEntity.notFound().build();
    }
    
    // Delete order
    @DeleteMapping("/orders/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Integer id) {
        if (ordersRepository.existsById(id)) {
            ordersRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    // Get order items for an order
    @GetMapping("/orders/{id}/items")
    public ResponseEntity<List<Orderitem>> getOrderItems(@PathVariable Integer id) {
        Optional<Orders> order = ordersRepository.findById(id);
        if (order.isPresent()) {
            List<Orderitem> items = orderItemRepository.findByOrderId(order.get());
            return ResponseEntity.ok(items);
        }
        return ResponseEntity.ok(new ArrayList<>());
    }
}
