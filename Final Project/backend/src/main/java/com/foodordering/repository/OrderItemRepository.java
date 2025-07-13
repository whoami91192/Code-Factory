package com.foodordering.repository;

import com.foodordering.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for OrderItem entity.
 * 
 * Provides data access methods for order item operations.
 * 
 * @author Food Ordering Team
 * @version 1.0.0
 */
@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    /**
     * Find all order items by order ID.
     */
    List<OrderItem> findByOrderId(Long orderId);

    /**
     * Find all order items by product ID.
     */
    List<OrderItem> findByProductId(Long productId);
} 