package com.foodordering;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * Basic integration test for the Food Ordering Application.
 * 
 * Tests that the Spring context loads successfully.
 * 
 * @author Food Ordering Team
 * @version 1.0.0
 */
@SpringBootTest
@ActiveProfiles("test")
class FoodOrderingApplicationTests {

    @Test
    void contextLoads() {
        // This test will pass if the Spring context loads successfully
    }
} 