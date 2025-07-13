package com.bookreviewhub.service;

import com.bookreviewhub.dto.JwtResponse;
import com.bookreviewhub.dto.RegisterRequest;
import com.bookreviewhub.model.Role;
import com.bookreviewhub.model.RoleEnum;
import com.bookreviewhub.model.User;
import com.bookreviewhub.repository.RoleRepository;
import com.bookreviewhub.repository.UserRepository;
import com.bookreviewhub.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    public User register(RegisterRequest request) {
        Role userRole = roleRepository.findByName(RoleEnum.USER)
                .orElseThrow(() -> new RuntimeException("Role USER not found"));

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .avatarUrl(request.getAvatarUrl())
                .roles(Collections.singleton(userRole))
                .build();

        return userRepository.save(user);
    }

    public JwtResponse authenticate(String email, String password) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtTokenProvider.generateToken(user.getEmail());

        return JwtResponse.builder()
                .token(token)
                .username(user.getUsername())
                .avatarUrl(user.getAvatarUrl())
                .role(user.getRoles().stream()
                        .findFirst()
                        .map(role -> role.getName().name())
                        .orElse("USER"))
                .build();
    }
}
