package com.foodordering.entity;

/**
 * Enum representing order statuses in the food ordering system.
 * 
 * Defines the different stages an order goes through:
 * - PENDING: Order placed but not yet confirmed
 * - CONFIRMED: Order confirmed by restaurant
 * - PREPARING: Order is being prepared
 * - READY: Order is ready for delivery
 * - OUT_FOR_DELIVERY: Order is being delivered
 * - DELIVERED: Order has been delivered
 * - CANCELLED: Order has been cancelled
 * 
 * @author Food Ordering Team
 * @version 1.0.0
 */
public enum OrderStatus {
    PENDING,
    CONFIRMED,
    PREPARING,
    READY,
    OUT_FOR_DELIVERY,
    DELIVERED,
    CANCELLED
} 