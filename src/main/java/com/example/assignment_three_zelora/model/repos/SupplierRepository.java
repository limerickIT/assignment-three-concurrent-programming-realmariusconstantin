package com.example.assignment_three_zelora.model.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.assignment_three_zelora.model.entitys.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
    @Query("SELECT COALESCE(MAX(s.supplierId), 0) FROM Supplier s")
    Integer findMaxSupplierId();
}
