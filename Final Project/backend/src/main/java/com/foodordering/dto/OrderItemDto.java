package com.foodordering.dto;

import java.math.BigDecimal;

/**
 * Data Transfer Object for order item information.
 * 
 * Contains order item details including product information and quantity.
 * 
 * @author Food Ordering Team
 * @version 1.0.0
 */
public class OrderItemDto {

    private Long id;
    private Long orderId;
    private Long productId;
    private String productName;
    private String productImageUrl;
    private Integer quantity;
    private BigDecimal price;

    // Constructors
    public OrderItemDto() {}

    public OrderItemDto(Long id, Long orderId, Long productId, String productName,
                       String productImageUrl, Integer quantity, BigDecimal price) {
        this.id = id;
        this.orderId = orderId;
        this.productId = productId;
        this.productName = productName;
        this.productImageUrl = productImageUrl;
        this.quantity = quantity;
        this.price = price;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductImageUrl() {
        return productImageUrl;
    }

    public void setProductImageUrl(String productImageUrl) {
        this.productImageUrl = productImageUrl;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "OrderItemDto{" +
                "id=" + id +
                ", orderId=" + orderId +
                ", productId=" + productId +
                ", productName='" + productName + '\'' +
                ", productImageUrl='" + productImageUrl + '\'' +
                ", quantity=" + quantity +
                ", price=" + price +
                '}';
    }
} 