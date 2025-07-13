# Contact Us Functionality

## Επισκόπηση

Η λειτουργικότητα "Contact Us" επιτρέπει στους χρήστες να στέλνουν μηνύματα επικοινωνίας και στους administrators να τα διαχειρίζονται.

## Backend Components

### 1. Entity Classes

#### Contact.java
- **Περιγραφή**: Entity για την αποθήκευση των μηνυμάτων επικοινωνίας
- **Πεδία**:
  - `id`: Μοναδικό αναγνωριστικό
  - `name`: Όνομα του αποστολέα
  - `email`: Email του αποστολέα
  - `subject`: Θέμα του μηνύματος
  - `message`: Το περιεχόμενο του μηνύματος
  - `phoneNumber`: Τηλέφωνο (προαιρετικό)
  - `status`: Κατάσταση του μηνύματος (PENDING, IN_PROGRESS, RESOLVED, CLOSED)
  - `createdAt`: Ημερομηνία δημιουργίας
  - `updatedAt`: Ημερομηνία τελευταίας ενημέρωσης

#### ContactStatus.java
- **Περιγραφή**: Enum για τις διαθέσιμες καταστάσεις επικοινωνίας
- **Τιμές**: PENDING, IN_PROGRESS, RESOLVED, CLOSED

### 2. DTO Classes

#### ContactDto.java
- **Περιγραφή**: Data Transfer Object για τη μεταφορά δεδομένων επικοινωνίας
- **Χρήση**: API requests/responses

### 3. Repository

#### ContactRepository.java
- **Περιγραφή**: JPA Repository για database operations
- **Μέθοδοι**:
  - `findByStatus()`: Εύρεση επικοινωνιών ανά κατάσταση
  - `findByEmail()`: Εύρεση επικοινωνιών ανά email
  - `findByCreatedAtBetween()`: Εύρεση επικοινωνιών ανά ημερομηνία
  - `findByKeyword()`: Αναζήτηση με λέξη-κλειδί
  - `countByStatus()`: Μέτρηση επικοινωνιών ανά κατάσταση
  - `countByCreatedAtAfter()`: Μέτρηση επικοινωνιών μετά από ημερομηνία

### 4. Service

#### ContactService.java
- **Περιγραφή**: Business logic για τη διαχείριση επικοινωνιών
- **Μέθοδοι**:
  - `submitContact()`: Υποβολή νέας επικοινωνίας
  - `getAllContacts()`: Λήψη όλων των επικοινωνιών
  - `getContactById()`: Λήψη επικοινωνίας ανά ID
  - `updateContactStatus()`: Ενημέρωση κατάστασης
  - `getContactsByStatus()`: Λήψη επικοινωνιών ανά κατάσταση
  - `searchContacts()`: Αναζήτηση επικοινωνιών
  - `getContactStatistics()`: Στατιστικά επικοινωνιών
  - `deleteContact()`: Διαγραφή επικοινωνίας

### 5. Controller

#### ContactController.java
- **Περιγραφή**: REST API endpoints για επικοινωνίες
- **Endpoints**:
  - `POST /contacts`: Υποβολή επικοινωνίας (public)
  - `GET /contacts`: Λήψη όλων επικοινωνιών (admin only)
  - `GET /contacts/{id}`: Λήψη επικοινωνίας ανά ID (admin only)
  - `PATCH /contacts/{id}/status`: Ενημέρωση κατάστασης (admin only)
  - `GET /contacts/status/{status}`: Λήψη επικοινωνιών ανά κατάσταση (admin only)
  - `GET /contacts/search`: Αναζήτηση επικοινωνιών (admin only)
  - `GET /contacts/statistics`: Στατιστικά επικοινωνιών (admin only)
  - `DELETE /contacts/{id}`: Διαγραφή επικοινωνίας (admin only)

### 6. Security Configuration

#### SecurityConfig.java
- **Ενημερώσεις**:
  - `/contacts` (POST): Public access για υποβολή επικοινωνίας
  - `/contacts/**`: Admin access για διαχείριση

## Frontend Components

### 1. Contact Page

#### Contact.tsx
- **Περιγραφή**: Σελίδα επικοινωνίας για χρήστες
- **Χαρακτηριστικά**:
  - Φόρμα επικοινωνίας με validation
  - Πληροφορίες επικοινωνίας (email, τηλέφωνο, διεύθυνση)
  - Responsive design
  - Success/error notifications
  - Modern UI με Material-UI

### 2. Contact Management

#### ContactManagement.tsx
- **Περιγραφή**: Σελίδα διαχείρισης επικοινωνιών για admins
- **Χαρακτηριστικά**:
  - Πίνακας επικοινωνιών με φιλτράρισμα
  - Στατιστικά επικοινωνιών
  - Ενημέρωση κατάστασης
  - Προβολή λεπτομερειών
  - Διαγραφή επικοινωνιών
  - Αναζήτηση με λέξη-κλειδί

### 3. Admin Dashboard Integration

#### AdminDashboard.tsx
- **Ενημερώσεις**:
  - Νέο tab "Contacts" με ContactSupportIcon
  - Ενσωμάτωση ContactManagement component

### 4. Navigation

#### Navbar.tsx
- **Ενημερώσεις**:
  - Προσθήκη "Contact" link στο navigation menu

#### Footer.tsx
- **Ενημερώσεις**:
  - Προσθήκη "Contact Us" link στο Quick Links section

### 5. API Services

#### api.ts
- **Ενημερώσεις**:
  - `contactService` object με όλες τις contact API calls

### 6. Type Definitions

#### types/index.ts
- **Ενημερώσεις**:
  - `Contact` interface
  - `ContactStatistics` interface

## Database Schema

### Contacts Table
```sql
CREATE TABLE contacts (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    phone_number VARCHAR(50),
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### Indexes
- `idx_contacts_email`: Για γρήγορη αναζήτηση ανά email
- `idx_contacts_status`: Για φιλτράρισμα ανά κατάσταση
- `idx_contacts_created_at`: Για φιλτράρισμα ανά ημερομηνία

## Sample Data

Το `data.sql` περιλαμβάνει δείγματα επικοινωνιών για testing:
- Ερωτήσεις για παραγγελίες
- Προβλήματα με την εφαρμογή
- Παρατηρήσεις για φαγητό
- Αιτήματα συνεργασίας
- Ερωτήσεις για προσφορές

## Χρήση

### Για Χρήστες
1. Επισκεφθείτε τη σελίδα `/contact`
2. Συμπληρώστε τη φόρμα επικοινωνίας
3. Πατήστε "Στείλτε Μήνυμα"
4. Λάβετε επιβεβαίωση αποστολής

### Για Admins
1. Συνδεθείτε ως admin
2. Επισκεφθείτε το Admin Dashboard
3. Επιλέξτε το tab "Contacts"
4. Διαχειριστείτε τις επικοινωνίες:
   - Προβάλετε λεπτομέρειες
   - Ενημερώστε κατάσταση
   - Αναζητήστε επικοινωνίες
   - Διαγράψτε επικοινωνίες

## Features

### ✅ Υλοποιημένα
- [x] Φόρμα επικοινωνίας με validation
- [x] Αποθήκευση επικοινωνιών στη βάση δεδομένων
- [x] Διαχείριση επικοινωνιών από admins
- [x] Στατιστικά επικοινωνιών
- [x] Αναζήτηση και φιλτράρισμα
- [x] Responsive design
- [x] Security (admin-only access για διαχείριση)
- [x] Error handling
- [x] Success notifications

### 🔄 Ενδεχόμενα Επεκτάσεις
- [ ] Email notifications για admins
- [ ] Auto-reply emails
- [ ] File attachments
- [ ] Contact categories
- [ ] Priority levels
- [ ] Assignment to specific admins
- [ ] Contact history tracking
- [ ] Export to CSV/PDF

## API Documentation

### Submit Contact (Public)
```http
POST /contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about order",
  "message": "I have a question about my recent order...",
  "phoneNumber": "+30 6971234567"
}
```

### Get All Contacts (Admin)
```http
GET /contacts
Authorization: Bearer <admin_token>
```

### Update Contact Status (Admin)
```http
PATCH /contacts/{id}/status
Authorization: Bearer <admin_token>
Content-Type: application/json

"RESOLVED"
```

### Get Contact Statistics (Admin)
```http
GET /contacts/statistics
Authorization: Bearer <admin_token>
```

## Security Considerations

1. **Public Access**: Μόνο η υποβολή επικοινωνίας είναι public
2. **Admin Access**: Όλες οι λειτουργίες διαχείρισης απαιτούν admin role
3. **Input Validation**: Server-side validation για όλα τα inputs
4. **SQL Injection Protection**: Χρήση JPA repositories
5. **XSS Protection**: Proper escaping στο frontend

## Testing

### Backend Tests
- Unit tests για ContactService
- Integration tests για ContactController
- Repository tests για ContactRepository

### Frontend Tests
- Component tests για Contact και ContactManagement
- API service tests
- E2E tests για τη ροή επικοινωνίας

## Deployment

### Database Migration
Εκτελέστε το `contacts.sql` script για τη δημιουργία του πίνακα:

```sql
\i backend/src/main/resources/contacts.sql
```

### Application Deployment
1. Build το backend: `mvn clean package`
2. Build το frontend: `npm run build`
3. Deploy τα artifacts
4. Ενημερώστε το database schema

## Troubleshooting

### Common Issues

1. **404 Error on /contacts**
   - Ελέγξτε αν το ContactController είναι registered
   - Επιβεβαιώστε το security configuration

2. **Permission Denied**
   - Ελέγξτε αν ο χρήστης έχει admin role
   - Επιβεβαιώστε το JWT token

3. **Database Connection Issues**
   - Ελέγξτε αν ο πίνακας contacts υπάρχει
   - Επιβεβαιώστε τα database credentials

4. **Form Validation Errors**
   - Ελέγξτε τα required fields
   - Επιβεβαιώστε το email format

## Support

Για ερωτήσεις ή προβλήματα με τη λειτουργικότητα Contact Us, επικοινωνήστε με την ομάδα ανάπτυξης. 