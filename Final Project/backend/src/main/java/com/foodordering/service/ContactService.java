package com.foodordering.service;

import com.foodordering.dto.ContactDto;
import com.foodordering.entity.Contact;
import com.foodordering.entity.ContactStatus;
import com.foodordering.exception.ResourceNotFoundException;
import com.foodordering.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ContactService {
    
    @Autowired
    private ContactRepository contactRepository;
    
    /**
     * Submit a new contact form.
     */
    public ContactDto submitContact(ContactDto contactDto) {
        Contact contact = new Contact(
            contactDto.getName(),
            contactDto.getEmail(),
            contactDto.getSubject(),
            contactDto.getMessage(),
            contactDto.getPhoneNumber()
        );
        
        Contact savedContact = contactRepository.save(contact);
        return convertToDto(savedContact);
    }
    
    /**
     * Get all contact submissions (admin only).
     */
    public List<ContactDto> getAllContacts() {
        return contactRepository.findAll().stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }
    
    /**
     * Get contact by ID.
     */
    public ContactDto getContactById(Long id) {
        Contact contact = contactRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Contact not found with id: " + id));
        return convertToDto(contact);
    }
    
    /**
     * Update contact status.
     */
    public ContactDto updateContactStatus(Long id, ContactStatus status) {
        Contact contact = contactRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Contact not found with id: " + id));
        
        contact.setStatus(status);
        Contact updatedContact = contactRepository.save(contact);
        return convertToDto(updatedContact);
    }
    
    /**
     * Get contacts by status.
     */
    public List<ContactDto> getContactsByStatus(ContactStatus status) {
        return contactRepository.findByStatus(status).stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }
    
    /**
     * Get contacts by email.
     */
    public List<ContactDto> getContactsByEmail(String email) {
        return contactRepository.findByEmail(email).stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }
    
    /**
     * Search contacts by keyword.
     */
    public List<ContactDto> searchContacts(String keyword) {
        return contactRepository.findByKeyword(keyword).stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }
    
    /**
     * Get contact statistics.
     */
    public ContactStatistics getContactStatistics() {
        long totalContacts = contactRepository.count();
        long pendingContacts = contactRepository.countByStatus(ContactStatus.PENDING);
        long resolvedContacts = contactRepository.countByStatus(ContactStatus.RESOLVED);
        long todayContacts = contactRepository.countByCreatedAtAfter(LocalDateTime.now().withHour(0).withMinute(0).withSecond(0));
        
        return new ContactStatistics(totalContacts, pendingContacts, resolvedContacts, todayContacts);
    }
    
    /**
     * Delete contact.
     */
    public void deleteContact(Long id) {
        if (!contactRepository.existsById(id)) {
            throw new ResourceNotFoundException("Contact not found with id: " + id);
        }
        contactRepository.deleteById(id);
    }
    
    /**
     * Convert entity to DTO.
     */
    private ContactDto convertToDto(Contact contact) {
        ContactDto dto = new ContactDto();
        dto.setId(contact.getId());
        dto.setName(contact.getName());
        dto.setEmail(contact.getEmail());
        dto.setSubject(contact.getSubject());
        dto.setMessage(contact.getMessage());
        dto.setPhoneNumber(contact.getPhoneNumber());
        dto.setStatus(contact.getStatus());
        dto.setCreatedAt(contact.getCreatedAt());
        dto.setUpdatedAt(contact.getUpdatedAt());
        return dto;
    }
    
    /**
     * Inner class for contact statistics.
     */
    public static class ContactStatistics {
        private final long totalContacts;
        private final long pendingContacts;
        private final long resolvedContacts;
        private final long todayContacts;
        
        public ContactStatistics(long totalContacts, long pendingContacts, long resolvedContacts, long todayContacts) {
            this.totalContacts = totalContacts;
            this.pendingContacts = pendingContacts;
            this.resolvedContacts = resolvedContacts;
            this.todayContacts = todayContacts;
        }
        
        public long getTotalContacts() { return totalContacts; }
        public long getPendingContacts() { return pendingContacts; }
        public long getResolvedContacts() { return resolvedContacts; }
        public long getTodayContacts() { return todayContacts; }
    }
} 