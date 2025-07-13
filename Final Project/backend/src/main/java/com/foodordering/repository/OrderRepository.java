package com.foodordering.repository;

import com.foodordering.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Order entity.
 * 
 * Provides data access methods for order operations.
 * 
 * @author Food Ordering Team
 * @version 1.0.0
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    /**
     * Find all orders by user ID, ordered by creation date descending.
     */
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);

    /**
     * Find all orders ordered by creation date descending.
     */
    List<Order> findAllByOrderByCreatedAtDesc();
} 