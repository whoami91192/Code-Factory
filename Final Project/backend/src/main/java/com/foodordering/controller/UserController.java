package com.foodordering.controller;

import com.foodordering.dto.UserDto;
import com.foodordering.dto.AdminUserDto;
import com.foodordering.dto.PasswordResetRequest;
import com.foodordering.entity.UserRole;
import com.foodordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserDto> getAllUsers() {
        return userService.findAllUsers();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public UserDto createUser(@RequestBody AdminUserDto userDto) {
        return userService.adminCreateUser(userDto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public UserDto updateUser(@PathVariable Long id, @RequestBody AdminUserDto userDto) {
        return userService.adminUpdateUser(id, userDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public void toggleUserStatus(@PathVariable Long id, @RequestBody Map<String, Boolean> body) {
        boolean enabled = body.getOrDefault("enabled", true);
        if (enabled) {
            userService.activateUser(id);
        } else {
            userService.deactivateUser(id);
        }
    }

    @PatchMapping("/{id}/change-password")
    @PreAuthorize("hasRole('ADMIN')")
    public void changeUserPasswordByAdmin(@PathVariable Long id, @RequestBody PasswordResetRequest request) {
        userService.changeUserPasswordByAdmin(id, request.getNewPassword());
    }
} 