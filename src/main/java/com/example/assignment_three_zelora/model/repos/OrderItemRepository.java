package com.example.assignment_three_zelora.model.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.assignment_three_zelora.model.entitys.Orderitem;
import com.example.assignment_three_zelora.model.entitys.Orders;
import java.util.List;

public interface OrderItemRepository extends JpaRepository<Orderitem, Integer> {
    List<Orderitem> findByOrderId(Orders order);
    
    @Query("SELECT COALESCE(MAX(o.orderItemId), 0) FROM Orderitem o")
    Integer findMaxOrderItemId();
}
