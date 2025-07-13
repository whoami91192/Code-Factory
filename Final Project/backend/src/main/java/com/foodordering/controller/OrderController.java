package com.foodordering.controller;

import com.foodordering.dto.OrderDto;
import com.foodordering.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.foodordering.service.UserService;

/**
 * Order Controller for handling order-related operations.
 * 
 * Provides endpoints for creating, retrieving, and managing orders.
 * 
 * @author Food Ordering Team
 * @version 1.0.0
 */
@RestController
@RequestMapping("/orders")
@Tag(name = "Orders", description = "Order management APIs")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;

    /**
     * Create a new order.
     */
    @PostMapping
    @Operation(summary = "Create a new order", description = "Creates a new order for the authenticated user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Order created successfully",
                    content = @Content(schema = @Schema(implementation = OrderDto.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data"),
        @ApiResponse(responseCode = "401", description = "Not authenticated")
    })
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<OrderDto> createOrder(
            @Parameter(description = "Order data", required = true)
            @RequestBody OrderDto orderDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Long userId = userService.findByUsername(username).getId();
        orderDto.setUserId(userId);
        OrderDto createdOrder = orderService.createOrder(orderDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
    }

    /**
     * Get all orders for the authenticated user.
     */
    @GetMapping("/user/{userId}")
    @Operation(summary = "Get user orders", description = "Retrieves all orders for a specific user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Orders retrieved successfully",
                    content = @Content(schema = @Schema(implementation = OrderDto.class))),
        @ApiResponse(responseCode = "401", description = "Not authenticated"),
        @ApiResponse(responseCode = "403", description = "Access forbidden")
    })
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<OrderDto>> getUserOrders(
            @Parameter(description = "User ID", required = true)
            @PathVariable Long userId) {
        
        List<OrderDto> orders = orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(orders);
    }

    /**
     * Get all orders (admin only).
     */
    @GetMapping
    @Operation(summary = "Get all orders", description = "Retrieves all orders (admin only)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Orders retrieved successfully",
                    content = @Content(schema = @Schema(implementation = OrderDto.class))),
        @ApiResponse(responseCode = "401", description = "Not authenticated"),
        @ApiResponse(responseCode = "403", description = "Access forbidden")
    })
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        List<OrderDto> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    /**
     * Get order by ID.
     */
    @GetMapping("/{orderId}")
    @Operation(summary = "Get order by ID", description = "Retrieves a specific order by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Order retrieved successfully",
                    content = @Content(schema = @Schema(implementation = OrderDto.class))),
        @ApiResponse(responseCode = "404", description = "Order not found"),
        @ApiResponse(responseCode = "401", description = "Not authenticated")
    })
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<OrderDto> getOrderById(
            @Parameter(description = "Order ID", required = true)
            @PathVariable Long orderId) {
        
        OrderDto order = orderService.getOrderById(orderId);
        return ResponseEntity.ok(order);
    }

    /**
     * Update order status.
     */
    @PatchMapping("/{orderId}/status")
    @Operation(summary = "Update order status", description = "Updates the status of an order")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Order status updated successfully",
                    content = @Content(schema = @Schema(implementation = OrderDto.class))),
        @ApiResponse(responseCode = "404", description = "Order not found"),
        @ApiResponse(responseCode = "401", description = "Not authenticated"),
        @ApiResponse(responseCode = "403", description = "Access forbidden")
    })
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OrderDto> updateOrderStatus(
            @Parameter(description = "Order ID", required = true)
            @PathVariable Long orderId,
            @Parameter(description = "New status", required = true)
            @RequestParam String status) {
        
        OrderDto updatedOrder = orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok(updatedOrder);
    }
} 