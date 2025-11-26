package com.example.assignment_three_zelora.model.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.assignment_three_zelora.model.entitys.Customer;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Optional<Customer> findByEmail(String email);
    boolean existsByEmail(String email);
}
