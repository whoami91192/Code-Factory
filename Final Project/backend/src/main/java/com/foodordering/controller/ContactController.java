package com.foodordering.controller;

import com.foodordering.dto.ContactDto;
import com.foodordering.entity.ContactStatus;
import com.foodordering.service.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Contact Controller for handling contact form submissions.
 * 
 * Provides endpoints for submitting contact forms and managing them (admin only).
 * 
 * @author Food Ordering Team
 * @version 1.0.0
 */
@RestController
@RequestMapping("/contacts")
@Tag(name = "Contact", description = "Contact form management APIs")
public class ContactController {

    @Autowired
    private ContactService contactService;

    /**
     * Submit a new contact form (public endpoint).
     */
    @PostMapping
    @Operation(summary = "Submit contact form", description = "Submit a new contact form")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Contact form submitted successfully",
                    content = @Content(schema = @Schema(implementation = ContactDto.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    public ResponseEntity<ContactDto> submitContact(
            @Parameter(description = "Contact form data", required = true)
            @Valid @RequestBody ContactDto contactDto) {
        
        ContactDto savedContact = contactService.submitContact(contactDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedContact);
    }

    /**
     * Get all contact submissions (admin only).
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all contacts", description = "Get all contact form submissions (admin only)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Contacts retrieved successfully",
                    content = @Content(schema = @Schema(implementation = ContactDto.class))),
        @ApiResponse(responseCode = "403", description = "Access forbidden")
    })
    public ResponseEntity<List<ContactDto>> getAllContacts() {
        List<ContactDto> contacts = contactService.getAllContacts();
        return ResponseEntity.ok(contacts);
    }

    /**
     * Get contact by ID (admin only).
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get contact by ID", description = "Get a specific contact form submission (admin only)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Contact retrieved successfully",
                    content = @Content(schema = @Schema(implementation = ContactDto.class))),
        @ApiResponse(responseCode = "404", description = "Contact not found"),
        @ApiResponse(responseCode = "403", description = "Access forbidden")
    })
    public ResponseEntity<ContactDto> getContactById(
            @Parameter(description = "Contact ID", required = true)
            @PathVariable Long id) {
        
        ContactDto contact = contactService.getContactById(id);
        return ResponseEntity.ok(contact);
    }

    /**
     * Update contact status (admin only).
     */
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update contact status", description = "Update the status of a contact form submission (admin only)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Contact status updated successfully",
                    content = @Content(schema = @Schema(implementation = ContactDto.class))),
        @ApiResponse(responseCode = "404", description = "Contact not found"),
        @ApiResponse(responseCode = "403", description = "Access forbidden")
    })
    public ResponseEntity<ContactDto> updateContactStatus(
            @Parameter(description = "Contact ID", required = true)
            @PathVariable Long id,
            @Parameter(description = "New status", required = true)
            @RequestBody ContactStatus status) {
        
        ContactDto updatedContact = contactService.updateContactStatus(id, status);
        return ResponseEntity.ok(updatedContact);
    }

    /**
     * Get contacts by status (admin only).
     */
    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get contacts by status", description = "Get contact form submissions by status (admin only)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Contacts retrieved successfully",
                    content = @Content(schema = @Schema(implementation = ContactDto.class))),
        @ApiResponse(responseCode = "403", description = "Access forbidden")
    })
    public ResponseEntity<List<ContactDto>> getContactsByStatus(
            @Parameter(description = "Contact status", required = true)
            @PathVariable ContactStatus status) {
        
        List<ContactDto> contacts = contactService.getContactsByStatus(status);
        return ResponseEntity.ok(contacts);
    }

    /**
     * Search contacts by keyword (admin only).
     */
    @GetMapping("/search")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Search contacts", description = "Search contact form submissions by keyword (admin only)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Search results retrieved successfully",
                    content = @Content(schema = @Schema(implementation = ContactDto.class))),
        @ApiResponse(responseCode = "403", description = "Access forbidden")
    })
    public ResponseEntity<List<ContactDto>> searchContacts(
            @Parameter(description = "Search keyword", required = true)
            @RequestParam String keyword) {
        
        List<ContactDto> contacts = contactService.searchContacts(keyword);
        return ResponseEntity.ok(contacts);
    }

    /**
     * Get contact statistics (admin only).
     */
    @GetMapping("/statistics")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get contact statistics", description = "Get contact form statistics (admin only)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Statistics retrieved successfully"),
        @ApiResponse(responseCode = "403", description = "Access forbidden")
    })
    public ResponseEntity<ContactService.ContactStatistics> getContactStatistics() {
        ContactService.ContactStatistics statistics = contactService.getContactStatistics();
        return ResponseEntity.ok(statistics);
    }

    /**
     * Delete contact (admin only).
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete contact", description = "Delete a contact form submission (admin only)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Contact deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Contact not found"),
        @ApiResponse(responseCode = "403", description = "Access forbidden")
    })
    public ResponseEntity<Void> deleteContact(
            @Parameter(description = "Contact ID", required = true)
            @PathVariable Long id) {
        
        contactService.deleteContact(id);
        return ResponseEntity.noContent().build();
    }
} 