package com.example.assignment_three_zelora.model.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.assignment_three_zelora.model.entitys.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
