package com.example.assignment_three_zelora.model.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.assignment_three_zelora.model.entitys.Orders;
import com.example.assignment_three_zelora.model.entitys.Customer;
import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {
    List<Orders> findByCustomerId(Customer customer);
    
    @Query("SELECT COALESCE(MAX(o.orderId), 0) FROM Orders o")
    Integer findMaxOrderId();
}
