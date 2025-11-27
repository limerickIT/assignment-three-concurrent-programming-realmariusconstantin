package com.example.assignment_three_zelora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.assignment_three_zelora.model.entitys.Customer;
import com.example.assignment_three_zelora.model.repos.CustomerRepository;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {
    
    @Autowired
    private CustomerRepository customerRepository;
    
    // Get all customers
    @GetMapping("/customers")
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }
    
    // Get customer by ID
    @GetMapping("/customers/{id}")
    public Optional<Customer> getCustomerById(@PathVariable Integer id) {
        return customerRepository.findById(id);
    }
    
    // Update customer
    @PutMapping("/customers/{id}")
    public Customer updateCustomer(@PathVariable Integer id, @RequestBody Customer customerDetails) {
        Optional<Customer> customer = customerRepository.findById(id);
        if (customer.isPresent()) {
            Customer c = customer.get();
            if (customerDetails.getFirstName() != null) c.setFirstName(customerDetails.getFirstName());
            if (customerDetails.getLastName() != null) c.setLastName(customerDetails.getLastName());
            if (customerDetails.getEmail() != null) c.setEmail(customerDetails.getEmail());
            if (customerDetails.getPhoneNumber() != null) c.setPhoneNumber(customerDetails.getPhoneNumber());
            if (customerDetails.getDateOfBirth() != null) c.setDateOfBirth(customerDetails.getDateOfBirth());
            if (customerDetails.getAddress() != null) c.setAddress(customerDetails.getAddress());
            if (customerDetails.getCity() != null) c.setCity(customerDetails.getCity());
            if (customerDetails.getRole() != null) c.setRole(customerDetails.getRole());
            c.setVipStatus(customerDetails.getVipStatus());
            return customerRepository.save(c);
        }
        return null;
    }
    
    // Delete customer
    @DeleteMapping("/customers/{id}")
    public void deleteCustomer(@PathVariable Integer id) {
        customerRepository.deleteById(id);
    }
}
