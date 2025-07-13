package com.foodordering;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * Main Spring Boot application class for the Food Ordering Platform.
 * 
 * This application provides a RESTful API for a food ordering system with
 * user management, product catalog, shopping cart, and order processing.
 * 
 * Features:
 * - JWT-based authentication and authorization
 * - PostgreSQL database with JPA/Hibernate
 * - Swagger/OpenAPI documentation
 * - Comprehensive testing with JUnit and TestContainers
 * 
 * @author Food Ordering Team
 * @version 1.0.0
 */
@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
public class FoodOrderingApplication {

    public static void main(String[] args) {
        SpringApplication.run(FoodOrderingApplication.class, args);
    }
} 