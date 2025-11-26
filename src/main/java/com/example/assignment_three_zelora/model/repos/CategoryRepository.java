package com.example.assignment_three_zelora.model.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.assignment_three_zelora.model.entitys.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query("SELECT COALESCE(MAX(c.categoryId), 0) FROM Category c")
    Integer findMaxCategoryId();
}
