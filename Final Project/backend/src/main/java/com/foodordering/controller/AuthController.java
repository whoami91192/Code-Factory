package com.foodordering.controller;

import com.foodordering.dto.AuthRequest;
import com.foodordering.dto.AuthResponse;
import com.foodordering.dto.UserDto;
import com.foodordering.entity.User;
import com.foodordering.security.JwtTokenProvider;
import com.foodordering.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * Authentication Controller for handling user registration and login.
 * 
 * Provides endpoints for user authentication, registration, and token management.
 * 
 * @author Food Ordering Team
 * @version 1.0.0
 */
@RestController
@RequestMapping("/auth")
@Tag(name = "Authentication", description = "Authentication management APIs")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    /**
     * Register a new user.
     */
    @PostMapping("/signup")
    @Operation(summary = "Register a new user", description = "Creates a new user account")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "User registered successfully",
                    content = @Content(schema = @Schema(implementation = AuthResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data"),
        @ApiResponse(responseCode = "409", description = "Username or email already exists")
    })
    public ResponseEntity<AuthResponse> registerUser(
            @Parameter(description = "User registration data", required = true)
            @Valid @RequestBody AuthRequest authRequest) {
        
        UserDto userDto = userService.registerUser(
                authRequest.getUsername(),
                authRequest.getEmail(),
                authRequest.getPassword()
        );
        
        // Create user object for token generation
        User user = new User();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setRole(userDto.getRole());

        // Generate tokens
        String accessToken = tokenProvider.generateAccessToken(user);
        String refreshToken = tokenProvider.generateRefreshToken(user);

        LocalDateTime expiresAt = LocalDateTime.now().plusSeconds(tokenProvider.getJwtExpirationMs() / 1000);

        AuthResponse authResponse = new AuthResponse(
                accessToken,
                refreshToken,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                expiresAt
        );
        
        return ResponseEntity.status(HttpStatus.CREATED).body(authResponse);
    }

    /**
     * Authenticate user and return JWT tokens.
     */
    @PostMapping("/login")
    @Operation(summary = "User login", description = "Authenticates user and returns JWT tokens")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Login successful",
                    content = @Content(schema = @Schema(implementation = AuthResponse.class))),
        @ApiResponse(responseCode = "401", description = "Invalid credentials"),
        @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    public ResponseEntity<AuthResponse> login(
            @Parameter(description = "User login credentials", required = true)
            @Valid @RequestBody AuthRequest authRequest) {
        
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getUsername(),
                        authRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDto userDto = userService.findByUsername(authRequest.getUsername());
        User user = new User();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setRole(userDto.getRole());

        String accessToken = tokenProvider.generateAccessToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(user);

        LocalDateTime expiresAt = LocalDateTime.now().plusSeconds(tokenProvider.getJwtExpirationMs() / 1000);

        AuthResponse authResponse = new AuthResponse(
                accessToken,
                refreshToken,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                expiresAt
        );

        return ResponseEntity.ok(authResponse);
    }

    /**
     * Refresh JWT token.
     */
    @PostMapping("/refresh")
    @Operation(summary = "Refresh JWT token", description = "Refreshes the access token using refresh token")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Token refreshed successfully",
                    content = @Content(schema = @Schema(implementation = AuthResponse.class))),
        @ApiResponse(responseCode = "401", description = "Invalid refresh token")
    })
    public ResponseEntity<AuthResponse> refreshToken(
            @Parameter(description = "Refresh token", required = true)
            @RequestBody AuthRequest authRequest) {
        
        String refreshToken = authRequest.getPassword(); // Using password field for refresh token
        
        if (!tokenProvider.validateToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String username = tokenProvider.getUsernameFromToken(refreshToken);
        UserDto userDto = userService.findByUsername(username);
        User user = new User();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setRole(userDto.getRole());

        String newAccessToken = tokenProvider.generateAccessToken(user);
        String newRefreshToken = tokenProvider.generateRefreshToken(user);

        LocalDateTime expiresAt = LocalDateTime.now().plusSeconds(tokenProvider.getJwtExpirationMs() / 1000);

        AuthResponse authResponse = new AuthResponse(
                newAccessToken,
                newRefreshToken,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                expiresAt
        );

        return ResponseEntity.ok(authResponse);
    }

    /**
     * Logout user (client-side token removal).
     */
    @PostMapping("/logout")
    @Operation(summary = "User logout", description = "Logs out the current user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Logout successful")
    })
    public ResponseEntity<String> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logged out successfully");
    }

    /**
     * Get current user information.
     */
    @GetMapping("/me")
    @Operation(summary = "Get current user", description = "Returns information about the currently authenticated user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User information retrieved successfully",
                    content = @Content(schema = @Schema(implementation = UserDto.class))),
        @ApiResponse(responseCode = "401", description = "Not authenticated")
    })
    public ResponseEntity<UserDto> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        UserDto userDto = userService.findByUsername(username);
        return ResponseEntity.ok(userDto);
    }

    /**
     * Update current user profile.
     */
    @PutMapping("/me")
    @Operation(summary = "Update current user profile", description = "Updates the profile of the currently authenticated user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User profile updated successfully",
                    content = @Content(schema = @Schema(implementation = UserDto.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data"),
        @ApiResponse(responseCode = "401", description = "Not authenticated")
    })
    public ResponseEntity<UserDto> updateCurrentUser(@Valid @RequestBody UserDto userDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        UserDto currentUser = userService.findByUsername(username);
        UserDto updatedUser = userService.updateUser(currentUser.getId(), userDto);
        return ResponseEntity.ok(updatedUser);
    }

    /**
     * Change password for current user.
     */
    @PostMapping("/change-password")
    @Operation(summary = "Change password", description = "Change password for the currently authenticated user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Password changed successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input data or old password incorrect"),
        @ApiResponse(responseCode = "401", description = "Not authenticated")
    })
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> payload) {
        String oldPassword = payload.get("oldPassword");
        String newPassword = payload.get("newPassword");
        if (oldPassword == null || newPassword == null) {
            return ResponseEntity.badRequest().body("Both oldPassword and newPassword are required.");
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        UserDto user = userService.findByUsername(username);
        try {
            userService.changePassword(user.getId(), oldPassword, newPassword);
            return ResponseEntity.ok("Password changed successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
} 