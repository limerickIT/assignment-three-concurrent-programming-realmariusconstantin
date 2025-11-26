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
    
    @Lob
    @Column(name = "category_description")
    private String categoryDescription;
    
    @OneToMany(mappedBy = "categoryId")
    @JsonIgnore
    private List<Product> productList;

    public Category(Integer categoryId, String categoryName, String categoryImage, String categoryDescription, List<Product> productList) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.categoryImage = categoryImage;
        this.categoryDescription = categoryDescription;
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
    
    public String getCategoryDescription() {
        return this.categoryDescription;
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
    
    public void setCategoryDescription(String categoryDescription) {
        this.categoryDescription = categoryDescription;
    }

    public void setProductList(List<Product> productList) {
        this.productList = productList;
    }

    public String toString() {
        return "Category(categoryId=" + this.getCategoryId() + ", categoryName=" + this.getCategoryName() + ", categoryImage=" + this.getCategoryImage() + ", categoryDescription=" + this.getCategoryDescription() + ")";
    }
}