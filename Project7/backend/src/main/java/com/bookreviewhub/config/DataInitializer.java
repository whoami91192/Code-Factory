package com.bookreviewhub.config;

import com.bookreviewhub.model.Role;
import com.bookreviewhub.model.RoleEnum;
import com.bookreviewhub.repository.RoleRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final RoleRepository roleRepository;

    @PostConstruct
    public void init() {
        for (RoleEnum roleEnum : RoleEnum.values()) {
            roleRepository.findByName(roleEnum)
                .orElseGet(() -> roleRepository.save(new Role(roleEnum)));
        }
    }
}
