package com.foodordering.service;

import com.foodordering.dto.AddressDto;
import com.foodordering.entity.Address;
import com.foodordering.entity.User;
import com.foodordering.exception.ResourceNotFoundException;
import com.foodordering.repository.AddressRepository;
import com.foodordering.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AddressService {
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private UserRepository userRepository;

    public List<AddressDto> getAddressesByUserId(Long userId) {
        return addressRepository.findByUserId(userId).stream().map(this::toDto).collect(Collectors.toList());
    }

    public AddressDto getAddress(Long id) {
        return toDto(addressRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Address not found")));
    }

    public AddressDto createAddress(Long userId, AddressDto dto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Address address = new Address();
        address.setUser(user);
        address.setLabel(dto.getLabel());
        address.setAddress(dto.getAddress());
        address.setPostalCode(dto.getPostalCode());
        address.setPhone(dto.getPhone());
        address.setDefault(dto.isDefault());
        if (dto.isDefault()) {
            setDefaultAddress(userId, null); // unset previous default
        }
        return toDto(addressRepository.save(address));
    }

    public AddressDto updateAddress(Long id, AddressDto dto) {
        Address address = addressRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Address not found"));
        address.setLabel(dto.getLabel());
        address.setAddress(dto.getAddress());
        address.setPostalCode(dto.getPostalCode());
        address.setPhone(dto.getPhone());
        if (dto.isDefault()) {
            setDefaultAddress(address.getUser().getId(), id);
            address.setDefault(true);
        }
        return toDto(addressRepository.save(address));
    }

    public void deleteAddress(Long id) {
        addressRepository.deleteById(id);
    }

    public void setDefaultAddress(Long userId, Long addressId) {
        List<Address> addresses = addressRepository.findByUserId(userId);
        for (Address addr : addresses) {
            if (addressId != null && addr.getId().equals(addressId)) {
                addr.setDefault(true);
            } else {
                addr.setDefault(false);
            }
            addressRepository.save(addr);
        }
    }

    private AddressDto toDto(Address address) {
        return new AddressDto(
            address.getId(),
            address.getUser().getId(),
            address.getLabel(),
            address.getAddress(),
            address.getPostalCode(),
            address.getPhone(),
            address.isDefault()
        );
    }
} 