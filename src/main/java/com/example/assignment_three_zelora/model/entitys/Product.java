package com.example.assignment_three_zelora.model.entitys;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "products")
public class Product implements Serializable {

  
    @Id
    @Basic(optional = false)
    @Column(name = "product_id")
    private Integer productId;
    
    @Column(name = "product_name")
    private String productName;
   
    @Lob
    @Column(name = "description")
    private String description;
    
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "price")
    private BigDecimal price;
   
    @Column(name = "size")
    private String size;
   
    @Column(name = "colour")
    private String colour;
   
    @Column(name = "material")
    private String material;
    
    @Column(name = "sustainability_rating")
    private Integer sustainabilityRating;
    
    @Column(name = "manufacturer")
    private String manufacturer;
   
    @Column(name = "release_date")
    @Temporal(TemporalType.DATE)
    private Date releaseDate;
    
    @Column(name = "discounted_price")
    private BigDecimal discountedPrice;
    
    @Basic(optional = false)
    @Column(name = "feature_image")
    private String featureImage;
   
    @OneToMany(mappedBy = "productId")
    @JsonIgnore
    private List<Orderitem> orderitemList;
    
    @OneToMany(mappedBy = "productId")
    @JsonIgnore
    private List<Review> reviewList;
   
    @OneToMany(mappedBy = "productId")
    @JsonIgnore
    private List<Wishlist> wishlistList;
   
    @OneToMany(mappedBy = "productId")
    @JsonIgnore
    private List<Inventory> inventoryList;
   
    @JoinColumn(name = "supplier_Id", referencedColumnName = "supplier_id")
    @ManyToOne(optional = false)
    @JsonIgnore
    private Supplier supplierId;
   
    @JoinColumn(name = "category_id", referencedColumnName = "category_id")
    @ManyToOne
    private Category categoryId;

    public Product(Integer productId, String productName, String description, BigDecimal price, String size, String colour, String material, Integer sustainabilityRating, String manufacturer, Date releaseDate, BigDecimal discountedPrice, String featureImage, List<Orderitem> orderitemList, List<Review> reviewList, List<Wishlist> wishlistList, List<Inventory> inventoryList, Supplier supplierId, Category categoryId) {
        this.productId = productId;
        this.productName = productName;
        this.description = description;
        this.price = price;
        this.size = size;
        this.colour = colour;
        this.material = material;
        this.sustainabilityRating = sustainabilityRating;
        this.manufacturer = manufacturer;
        this.releaseDate = releaseDate;
        this.discountedPrice = discountedPrice;
        this.featureImage = featureImage;
        this.orderitemList = orderitemList;
        this.reviewList = reviewList;
        this.wishlistList = wishlistList;
        this.inventoryList = inventoryList;
        this.supplierId = supplierId;
        this.categoryId = categoryId;
    }

    public Product() {
    }

    public Integer getProductId() {
        return this.productId;
    }

    public String getProductName() {
        return this.productName;
    }

    public String getDescription() {
        return this.description;
    }

    public BigDecimal getPrice() {
        return this.price;
    }

    public String getSize() {
        return this.size;
    }

    public String getColour() {
        return this.colour;
    }

    public String getMaterial() {
        return this.material;
    }

    public Integer getSustainabilityRating() {
        return this.sustainabilityRating;
    }

    public String getManufacturer() {
        return this.manufacturer;
    }

    public Date getReleaseDate() {
        return this.releaseDate;
    }

    public BigDecimal getDiscountedPrice() {
        return this.discountedPrice;
    }

    public String getFeatureImage() {
        return this.featureImage;
    }

    public List<Orderitem> getOrderitemList() {
        return this.orderitemList;
    }

    public List<Review> getReviewList() {
        return this.reviewList;
    }

    public List<Wishlist> getWishlistList() {
        return this.wishlistList;
    }

    public List<Inventory> getInventoryList() {
        return this.inventoryList;
    }

    public Supplier getSupplierId() {
        return this.supplierId;
    }

    public Category getCategoryId() {
        return this.categoryId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public void setSustainabilityRating(Integer sustainabilityRating) {
        this.sustainabilityRating = sustainabilityRating;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public void setDiscountedPrice(BigDecimal discountedPrice) {
        this.discountedPrice = discountedPrice;
    }

    public void setFeatureImage(String featureImage) {
        this.featureImage = featureImage;
    }

    public void setOrderitemList(List<Orderitem> orderitemList) {
        this.orderitemList = orderitemList;
    }

    public void setReviewList(List<Review> reviewList) {
        this.reviewList = reviewList;
    }

    public void setWishlistList(List<Wishlist> wishlistList) {
        this.wishlistList = wishlistList;
    }

    public void setInventoryList(List<Inventory> inventoryList) {
        this.inventoryList = inventoryList;
    }

    public void setSupplierId(Supplier supplierId) {
        this.supplierId = supplierId;
    }

    public void setCategoryId(Category categoryId) {
        this.categoryId = categoryId;
    }

    public String toString() {
        return "Product(productId=" + this.getProductId() + ", productName=" + this.getProductName() + ", description=" + this.getDescription() + ", price=" + this.getPrice() + ", size=" + this.getSize() + ", colour=" + this.getColour() + ", material=" + this.getMaterial() + ", sustainabilityRating=" + this.getSustainabilityRating() + ", manufacturer=" + this.getManufacturer() + ", releaseDate=" + this.getReleaseDate() + ", discountedPrice=" + this.getDiscountedPrice() + ", featureImage=" + this.getFeatureImage() + ")";
    }
}