package com.example.coursemanager.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class User {
    @Id @GeneratedValue
    private Long id;
    private String username;
    private String password;
    private String role;

    // getters and setters
}