package com.foodordering.controller;

import com.foodordering.dto.AddressDto;
import com.foodordering.service.AddressService;
import com.foodordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/addresses")
public class AddressController {
    @Autowired
    private AddressService addressService;
    
    @Autowired
    private UserService userService;

    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userService.findByUsername(username).getId();
    }

    @GetMapping
    public List<AddressDto> getAddresses() {
        return addressService.getAddressesByUserId(getCurrentUserId());
    }

    @PostMapping
    public AddressDto createAddress(@RequestBody AddressDto dto) {
        return addressService.createAddress(getCurrentUserId(), dto);
    }

    @PutMapping("/{id}")
    public AddressDto updateAddress(@PathVariable Long id, @RequestBody AddressDto dto) {
        return addressService.updateAddress(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAddress(@PathVariable Long id) {
        addressService.deleteAddress(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/default")
    public ResponseEntity<?> setDefault(@PathVariable Long id) {
        addressService.setDefaultAddress(getCurrentUserId(), id);
        return ResponseEntity.ok().build();
    }
} 