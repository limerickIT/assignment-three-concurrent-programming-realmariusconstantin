package com.example.assignment_three_zelora.model.entitys;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "suppliers")
public class Supplier implements Serializable {


    @Id
    @Basic(optional = false)
    @Column(name = "supplier_id")
    private Integer supplierId;
   
    @Column(name = "supplier_name")
    private String supplierName;
    
    @Column(name = "contact_name")
    private String contactName;
    
    @Column(name = "contact_email")
    private String contactEmail;
    
    @Column(name = "contact_phone")
    private String contactPhone;
    
    @Lob
    @Column(name = "address")
    private String address;
    
    @Column(name = "website")
    private String website;
    
    @Lob
    @Column(name = "description")
    private String description;
    
    @OneToMany(mappedBy = "supplierId")
    @JsonIgnore
    private List<Inventory> inventoryList;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "supplierId")
    @JsonIgnore
    private List<Product> productList;

    public Supplier(Integer supplierId, String supplierName, String contactName, String contactEmail, String contactPhone, String address, String website, String description, List<Inventory> inventoryList, List<Product> productList) {
        this.supplierId = supplierId;
        this.supplierName = supplierName;
        this.contactName = contactName;
        this.contactEmail = contactEmail;
        this.contactPhone = contactPhone;
        this.address = address;
        this.website = website;
        this.description = description;
        this.inventoryList = inventoryList;
        this.productList = productList;
    }

    public Supplier() {
    }

    public Integer getSupplierId() {
        return this.supplierId;
    }

    public String getSupplierName() {
        return this.supplierName;
    }

    public String getContactName() {
        return this.contactName;
    }

    public String getContactEmail() {
        return this.contactEmail;
    }

    public String getContactPhone() {
        return this.contactPhone;
    }

    public String getAddress() {
        return this.address;
    }

    public String getWebsite() {
        return this.website;
    }

    public String getDescription() {
        return this.description;
    }

    public List<Inventory> getInventoryList() {
        return this.inventoryList;
    }

    public List<Product> getProductList() {
        return this.productList;
    }

    public void setSupplierId(Integer supplierId) {
        this.supplierId = supplierId;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setInventoryList(List<Inventory> inventoryList) {
        this.inventoryList = inventoryList;
    }

    public void setProductList(List<Product> productList) {
        this.productList = productList;
    }

    public String toString() {
        return "Supplier(supplierId=" + this.getSupplierId() + ", supplierName=" + this.getSupplierName() + ", contactName=" + this.getContactName() + ", contactEmail=" + this.getContactEmail() + ", contactPhone=" + this.getContactPhone() + ", address=" + this.getAddress() + ", website=" + this.getWebsite() + ", description=" + this.getDescription() + ")";
    }
}