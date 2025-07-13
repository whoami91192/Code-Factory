package com.foodordering.dto;

public class AddressDto {
    private Long id;
    private Long userId;
    private String label;
    private String address;
    private String postalCode;
    private String phone;
    private boolean isDefault;

    public AddressDto() {}

    public AddressDto(Long id, Long userId, String label, String address, String postalCode, String phone, boolean isDefault) {
        this.id = id;
        this.userId = userId;
        this.label = label;
        this.address = address;
        this.postalCode = postalCode;
        this.phone = phone;
        this.isDefault = isDefault;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getPostalCode() { return postalCode; }
    public void setPostalCode(String postalCode) { this.postalCode = postalCode; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public boolean isDefault() { return isDefault; }
    public void setDefault(boolean aDefault) { isDefault = aDefault; }
} 