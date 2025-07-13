package com.foodordering.service;

import com.foodordering.dto.OrderDto;
import com.foodordering.dto.OrderItemDto;
import com.foodordering.entity.Order;
import com.foodordering.entity.OrderItem;
import com.foodordering.entity.OrderStatus;
import com.foodordering.entity.Product;
import com.foodordering.entity.User;
import com.foodordering.exception.ResourceNotFoundException;
import com.foodordering.repository.OrderItemRepository;
import com.foodordering.repository.OrderRepository;
import com.foodordering.repository.ProductRepository;
import com.foodordering.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class for handling order-related business logic.
 * 
 * Provides methods for creating, retrieving, and managing orders.
 * 
 * @author Food Ordering Team
 * @version 1.0.0
 */
@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    /**
     * Create a new order.
     */
    public OrderDto createOrder(OrderDto orderDto) {
        // Get user
        User user = userRepository.findById(orderDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + orderDto.getUserId()));

        // Calculate total amount from items
        BigDecimal totalAmount = orderDto.getItems().stream()
                .map(itemDto -> {
                    Product product = productRepository.findById(itemDto.getProductId())
                            .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + itemDto.getProductId()));
                    return product.getPrice().multiply(BigDecimal.valueOf(itemDto.getQuantity()));
                })
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Create order
        Order order = new Order();
        order.setUser(user);
        order.setTotalAmount(totalAmount);
        order.setStatus(OrderStatus.PENDING);
        order.setDeliveryAddress(orderDto.getDeliveryAddress());
        order.setDeliveryNotes(orderDto.getDeliveryNotes());
        order.setEstimatedDeliveryTime(LocalDateTime.now().plusMinutes(45)); // 45 minutes delivery time

        Order savedOrder = orderRepository.save(order);

        // Create order items
        List<OrderItem> orderItems = orderDto.getItems().stream()
                .map(itemDto -> {
                    Product product = productRepository.findById(itemDto.getProductId())
                            .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + itemDto.getProductId()));

                    OrderItem orderItem = new OrderItem();
                    orderItem.setOrder(savedOrder);
                    orderItem.setProduct(product);
                    orderItem.setQuantity(itemDto.getQuantity());
                    orderItem.setPrice(product.getPrice()); // Use product price from database
                    return orderItem;
                })
                .collect(Collectors.toList());

        orderItemRepository.saveAll(orderItems);

        return convertToDto(savedOrder);
    }

    /**
     * Get all orders for a specific user.
     */
    public List<OrderDto> getOrdersByUserId(Long userId) {
        List<Order> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return orders.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Get all orders (admin only).
     */
    public List<OrderDto> getAllOrders() {
        List<Order> orders = orderRepository.findAllByOrderByCreatedAtDesc();
        return orders.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Get order by ID.
     */
    public OrderDto getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
        return convertToDto(order);
    }

    /**
     * Update order status.
     */
    public OrderDto updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        OrderStatus orderStatus = OrderStatus.valueOf(status.toUpperCase());
        order.setStatus(orderStatus);

        // Set actual delivery time if status is DELIVERED
        if (orderStatus == OrderStatus.DELIVERED) {
            order.setActualDeliveryTime(LocalDateTime.now());
        }

        Order updatedOrder = orderRepository.save(order);
        return convertToDto(updatedOrder);
    }

    /**
     * Convert Order entity to OrderDto.
     */
    private OrderDto convertToDto(Order order) {
        List<OrderItemDto> itemDtos = order.getItems().stream()
                .map(this::convertItemToDto)
                .collect(Collectors.toList());

        return new OrderDto(
                order.getId(),
                order.getUser().getId(),
                itemDtos,
                order.getTotalAmount(),
                order.getStatus(),
                order.getCreatedAt(), // orderDate
                order.getDeliveryAddress(),
                order.getDeliveryNotes(),
                order.getEstimatedDeliveryTime(),
                order.getActualDeliveryTime()
        );
    }

    /**
     * Convert OrderItem entity to OrderItemDto.
     */
    private OrderItemDto convertItemToDto(OrderItem orderItem) {
        return new OrderItemDto(
                orderItem.getId(),
                orderItem.getOrder().getId(),
                orderItem.getProduct().getId(),
                orderItem.getProduct().getName(),
                orderItem.getProduct().getImageUrl(),
                orderItem.getQuantity(),
                orderItem.getPrice()
        );
    }
} 