package com.foodordering.repository;

import com.foodordering.entity.Address;
import com.foodordering.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUser(User user);
    List<Address> findByUserId(Long userId);
    Address findByUserIdAndIsDefaultTrue(Long userId);
} 