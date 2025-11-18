package com.example.assignment_three_zelora.model.entitys;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.List;


@Entity
@Table(name = "categories")
public class Category implements Serializable {

    @Id
    @Basic(optional = false)
    @Column(name = "category_id")
    private Integer categoryId;
    
    @Column(name = "category_name")
    private String categoryName;

    @Column(name = "category_image")
    private String categoryImage;
    
    @OneToMany(mappedBy = "categoryId")
    @JsonIgnore
    private List<Product> productList;

    public Category(Integer categoryId, String categoryName, String categoryImage, List<Product> productList) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.categoryImage = categoryImage;
        this.productList = productList;
    }

    public Category() {
    }

    public Integer getCategoryId() {
        return this.categoryId;
    }

    public String getCategoryName() {
        return this.categoryName;
    }

    public String getCategoryImage() {
        return this.categoryImage;
    }

    public List<Product> getProductList() {
        return this.productList;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public void setCategoryImage(String categoryImage) {
        this.categoryImage = categoryImage;
    }

    public void setProductList(List<Product> productList) {
        this.productList = productList;
    }

    public String toString() {
        return "Category(categoryId=" + this.getCategoryId() + ", categoryName=" + this.getCategoryName() + ", categoryImage=" + this.getCategoryImage() + ")";
    }
}