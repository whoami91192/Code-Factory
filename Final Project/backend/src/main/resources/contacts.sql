-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
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

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);

-- Create index on created_at for date filtering
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);

-- Insert some sample contact data
INSERT INTO contacts (name, email, subject, message, phone_number, status) VALUES
('Γιώργος Παπαδόπουλος', 'giorgos@example.com', 'Ερώτηση για παραγγελία', 'Καλησπέρα! Θα ήθελα να ρωτήσω για την παραγγελία μου με αριθμό #12345. Πότε θα παραδοθεί;', '+30 6971234567', 'PENDING'),
('Μαρία Κωνσταντίνου', 'maria@example.com', 'Πρόβλημα με την εφαρμογή', 'Δεν μπορώ να συνδεθώ στην εφαρμογή. Εμφανίζεται σφάλμα κάθε φορά που προσπαθώ να κάνω login.', '+30 6987654321', 'IN_PROGRESS'),
('Νίκος Αλεξίου', 'nikos@example.com', 'Παρατήρηση για το φαγητό', 'Το φαγητό ήταν εξαιρετικό! Θα ήθελα να σας ευχαριστήσω για την ποιότητα και την ταχύτητα της παράδοσης.', NULL, 'RESOLVED'),
('Ελένη Δημητρίου', 'eleni@example.com', 'Αίτημα για συνεργασία', 'Εργάζομαι σε εταιρεία catering και θα ήθελα να συζητήσουμε για πιθανή συνεργασία.', '+30 6945678901', 'PENDING'),
('Δημήτρης Παπαγεωργίου', 'dimitris@example.com', 'Ερώτηση για προσφορά', 'Θα ήθελα να μάθω αν προσφέρετε εκπτώσεις για μεγάλες παραγγελίες για εταιρικά events.', '+30 6934567890', 'CLOSED'); 