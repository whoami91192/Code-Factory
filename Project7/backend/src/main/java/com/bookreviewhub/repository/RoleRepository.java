package com.bookreviewhub.repository;

import com.bookreviewhub.model.Role;
import com.bookreviewhub.model.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleEnum name);
}
