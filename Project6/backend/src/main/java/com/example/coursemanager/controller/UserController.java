package com.example.coursemanager.controller;

import com.example.coursemanager.model.User;
import com.example.coursemanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> allUsers() {
        return userService.getAllUsers();
    }
}