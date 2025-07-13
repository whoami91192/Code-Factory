package com.bookreviewhub.config;

import com.bookreviewhub.model.Role;
import com.bookreviewhub.model.RoleEnum;
import com.bookreviewhub.repository.RoleRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RoleInitializer {

    private final RoleRepository roleRepository;

    @PostConstruct
    public void initRoles() {
        if (roleRepository.count() == 0) {
            roleRepository.save(new Role(RoleEnum.ROLE_USER));
            roleRepository.save(new Role(RoleEnum.ROLE_ADMIN));
            roleRepository.save(new Role(RoleEnum.ROLE_AUTHOR));
            roleRepository.save(new Role(RoleEnum.ROLE_MODERATOR));
        }
    }
}
