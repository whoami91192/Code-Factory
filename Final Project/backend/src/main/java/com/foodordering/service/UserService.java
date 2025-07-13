package com.foodordering.service;

import com.foodordering.dto.AdminUserDto;
import com.foodordering.dto.PasswordResetRequest;
import com.foodordering.dto.UserDto;
import com.foodordering.entity.User;
import com.foodordering.entity.UserRole;
import com.foodordering.exception.InvalidSecretKeyException;
import com.foodordering.exception.ResourceNotFoundException;
import com.foodordering.exception.UserAlreadyExistsException;
import com.foodordering.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class for user management operations.
 * 
 * Handles business logic for user registration, authentication,
 * and user data management.
 * 
 * @author Food Ordering Team
 * @version 1.0.0
 */
@Service
@Transactional
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .disabled(!user.isActive())
                .accountExpired(false)
                .credentialsExpired(false)
                .accountLocked(false)
                .build();
    }

    /**
     * Register a new user.
     */
    public UserDto registerUser(String username, String email, String password) {
        if (userRepository.existsByUsername(username)) {
            throw new UserAlreadyExistsException("Username already exists: " + username);
        }

        if (userRepository.existsByEmail(email)) {
            throw new UserAlreadyExistsException("Email already exists: " + email);
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(UserRole.USER);
        user.setActive(true);

        User savedUser = userRepository.save(user);
        return convertToDto(savedUser);
    }

    public UserDto adminCreateUser(AdminUserDto dto) {
        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new UserAlreadyExistsException("Username already exists: " + dto.getUsername());
        }
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new UserAlreadyExistsException("Email already exists: " + dto.getEmail());
        }
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        } else {
            user.setPassword(passwordEncoder.encode("123456")); // default password
        }
        if (dto.getRole() != null) {
            user.setRole(UserRole.valueOf(dto.getRole()));
        } else {
            user.setRole(UserRole.USER);
        }
        user.setActive(dto.isActive());
        User savedUser = userRepository.save(user);
        return convertToDto(savedUser);
    }

    public UserDto adminUpdateUser(Long id, AdminUserDto dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        if (dto.getUsername() != null && !dto.getUsername().equals(user.getUsername())) {
            if (userRepository.existsByUsername(dto.getUsername())) {
                throw new UserAlreadyExistsException("Username already exists: " + dto.getUsername());
            }
            user.setUsername(dto.getUsername());
        }
        if (dto.getEmail() != null && !dto.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(dto.getEmail())) {
                throw new UserAlreadyExistsException("Email already exists: " + dto.getEmail());
            }
            user.setEmail(dto.getEmail());
        }
        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }
        if (dto.getRole() != null) {
            user.setRole(UserRole.valueOf(dto.getRole()));
        }
        user.setActive(dto.isActive());
        User updatedUser = userRepository.save(user);
        return convertToDto(updatedUser);
    }

    /**
     * Find user by ID.
     */
    public UserDto findById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return convertToDto(user);
    }

    /**
     * Find user by username.
     */
    public UserDto findByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
        return convertToDto(user);
    }

    /**
     * Find user by email.
     */
    public UserDto findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return convertToDto(user);
    }

    /**
     * Get all users.
     */
    public List<UserDto> findAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Get users by role.
     */
    public List<UserDto> findUsersByRole(UserRole role) {
        return userRepository.findByRole(role).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Get active users.
     */
    public List<UserDto> findActiveUsers() {
        return userRepository.findByActiveTrue().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Update user information.
     */
    public UserDto updateUser(Long id, UserDto userDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        if (userDto.getUsername() != null && !userDto.getUsername().equals(user.getUsername())) {
            if (userRepository.existsByUsername(userDto.getUsername())) {
                throw new UserAlreadyExistsException("Username already exists: " + userDto.getUsername());
            }
            user.setUsername(userDto.getUsername());
        }

        if (userDto.getEmail() != null && !userDto.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(userDto.getEmail())) {
                throw new UserAlreadyExistsException("Email already exists: " + userDto.getEmail());
            }
            user.setEmail(userDto.getEmail());
        }

        if (userDto.getRole() != null) {
            user.setRole(userDto.getRole());
        }

        if (userDto.getAvatarUrl() != null) user.setAvatarUrl(userDto.getAvatarUrl());
        if (userDto.getAddress() != null) user.setAddress(userDto.getAddress());
        if (userDto.getPhone() != null) user.setPhone(userDto.getPhone());
        if (userDto.getPostalCode() != null) user.setPostalCode(userDto.getPostalCode());

        user.setActive(userDto.isActive());

        User updatedUser = userRepository.save(user);
        return convertToDto(updatedUser);
    }

    /**
     * Change user password.
     */
    public void changePassword(Long userId, String oldPassword, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new IllegalArgumentException("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    /**
     * Change any user's password (admin only)
     */
    public void changeUserPasswordByAdmin(Long userId, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    /**
     * Deactivate user.
     */
    public void deactivateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        user.setActive(false);
        userRepository.save(user);
    }

    /**
     * Activate user.
     */
    public void activateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        user.setActive(true);
        userRepository.save(user);
    }

    /**
     * Delete user.
     */
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    /**
     * Check if user exists by username.
     */
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    /**
     * Check if user exists by email.
     */
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    /**
     * Get user count by role.
     */
    public long countByRole(UserRole role) {
        return userRepository.countByRole(role);
    }

    /**
     * Get active user count.
     */
    public long countActiveUsers() {
        return userRepository.countByActiveTrue();
    }

    /**
     * Convert User entity to UserDto.
     */
    private UserDto convertToDto(User user) {
        UserDto dto = new UserDto(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getRole(),
            user.isActive(),
            user.getCreatedAt(),
            user.getUpdatedAt()
        );
        dto.setAvatarUrl(user.getAvatarUrl());
        dto.setAddress(user.getAddress());
        dto.setPhone(user.getPhone());
        dto.setPostalCode(user.getPostalCode());
        return dto;
    }
} 