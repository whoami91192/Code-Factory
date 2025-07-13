package com.foodordering.service;

import com.foodordering.entity.User;
import com.foodordering.entity.UserRole;
import com.foodordering.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/**
 * Unit tests for UserService.
 * 
 * @author Food Ordering Team
 * @version 1.0.0
 */
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setEmail("test@example.com");
        testUser.setPassword("encodedPassword");
        testUser.setRole(UserRole.USER);
        testUser.setActive(true);
    }

    @Test
    void testExistsByUsername_WhenUserExists_ReturnsTrue() {
        // Given
        String username = "testuser";
        when(userRepository.existsByUsername(username)).thenReturn(true);

        // When
        boolean result = userService.existsByUsername(username);

        // Then
        assertTrue(result);
    }

    @Test
    void testExistsByUsername_WhenUserDoesNotExist_ReturnsFalse() {
        // Given
        String username = "nonexistentuser";
        when(userRepository.existsByUsername(username)).thenReturn(false);

        // When
        boolean result = userService.existsByUsername(username);

        // Then
        assertFalse(result);
    }

    @Test
    void testExistsByEmail_WhenEmailExists_ReturnsTrue() {
        // Given
        String email = "test@example.com";
        when(userRepository.existsByEmail(email)).thenReturn(true);

        // When
        boolean result = userService.existsByEmail(email);

        // Then
        assertTrue(result);
    }

    @Test
    void testExistsByEmail_WhenEmailDoesNotExist_ReturnsFalse() {
        // Given
        String email = "nonexistent@example.com";
        when(userRepository.existsByEmail(email)).thenReturn(false);

        // When
        boolean result = userService.existsByEmail(email);

        // Then
        assertFalse(result);
    }
} 