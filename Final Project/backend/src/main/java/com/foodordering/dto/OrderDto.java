package com.foodordering.dto;

import com.foodordering.entity.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Data Transfer Object for order information.
 * 
 * Contains order details including items, status, and delivery information.
 * 
 * @author Food Ordering Team
 * @version 1.0.0
 */
public class OrderDto {

    private Long id;
    private Long userId;
    private List<OrderItemDto> items;
    private BigDecimal totalAmount;
    private OrderStatus status;
    private LocalDateTime orderDate;
    private String deliveryAddress;
    private String deliveryNotes;
    private LocalDateTime estimatedDeliveryTime;
    private LocalDateTime actualDeliveryTime;

    // Constructors
    public OrderDto() {}

    public OrderDto(Long id, Long userId, List<OrderItemDto> items, BigDecimal totalAmount,
                   OrderStatus status, LocalDateTime orderDate, String deliveryAddress,
                   String deliveryNotes, LocalDateTime estimatedDeliveryTime,
                   LocalDateTime actualDeliveryTime) {
        this.id = id;
        this.userId = userId;
        this.items = items;
        this.totalAmount = totalAmount;
        this.status = status;
        this.orderDate = orderDate;
        this.deliveryAddress = deliveryAddress;
        this.deliveryNotes = deliveryNotes;
        this.estimatedDeliveryTime = estimatedDeliveryTime;
        this.actualDeliveryTime = actualDeliveryTime;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<OrderItemDto> getItems() {
        return items;
    }

    public void setItems(List<OrderItemDto> items) {
        this.items = items;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public String getDeliveryNotes() {
        return deliveryNotes;
    }

    public void setDeliveryNotes(String deliveryNotes) {
        this.deliveryNotes = deliveryNotes;
    }

    public LocalDateTime getEstimatedDeliveryTime() {
        return estimatedDeliveryTime;
    }

    public void setEstimatedDeliveryTime(LocalDateTime estimatedDeliveryTime) {
        this.estimatedDeliveryTime = estimatedDeliveryTime;
    }

    public LocalDateTime getActualDeliveryTime() {
        return actualDeliveryTime;
    }

    public void setActualDeliveryTime(LocalDateTime actualDeliveryTime) {
        this.actualDeliveryTime = actualDeliveryTime;
    }

    @Override
    public String toString() {
        return "OrderDto{" +
                "id=" + id +
                ", userId=" + userId +
                ", items=" + items +
                ", totalAmount=" + totalAmount +
                ", status=" + status +
                ", orderDate=" + orderDate +
                ", deliveryAddress='" + deliveryAddress + '\'' +
                ", deliveryNotes='" + deliveryNotes + '\'' +
                ", estimatedDeliveryTime=" + estimatedDeliveryTime +
                ", actualDeliveryTime=" + actualDeliveryTime +
                '}';
    }
} 