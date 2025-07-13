import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  Search,
  Visibility,
  Delete,
  Refresh,
  Email,
  Phone,
  CalendarToday,
  Person,
  Subject as SubjectIcon
} from '@mui/icons-material';
import { contactService } from '../services/api';

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  phoneNumber?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
}

interface ContactStatistics {
  totalContacts: number;
  pendingContacts: number;
  resolvedContacts: number;
  todayContacts: number;
}

const ContactManagement: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [statistics, setStatistics] = useState<ContactStatistics | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);
  
  const theme = useTheme();

  useEffect(() => {
    fetchContacts();
    fetchStatistics();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contacts, searchTerm, statusFilter]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contactService.getAll();
      setContacts(response);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Σφάλμα κατά τη φόρτωση των επικοινωνιών');
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await contactService.getStatistics();
      setStatistics(response);
    } catch (err: any) {
      console.error('Error fetching statistics:', err);
    }
  };

  const filterContacts = () => {
    let filtered = contacts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(contact => contact.status === statusFilter);
    }

    setFilteredContacts(filtered);
  };

  const handleStatusUpdate = async (contactId: number, newStatus: string) => {
    try {
      setUpdatingStatus(contactId);
      await contactService.updateStatus(contactId, newStatus);
      
      // Update local state
      setContacts(prev => prev.map(contact =>
        contact.id === contactId
          ? { ...contact, status: newStatus as Contact['status'] }
          : contact
      ));
      
      // Refresh statistics
      fetchStatistics();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Σφάλμα κατά την ενημέρωση της κατάστασης');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleDeleteContact = async (contactId: number) => {
    if (!window.confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή την επικοινωνία;')) {
      return;
    }

    try {
      await contactService.delete(contactId);
      setContacts(prev => prev.filter(contact => contact.id !== contactId));
      fetchStatistics();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Σφάλμα κατά τη διαγραφή');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'warning';
      case 'IN_PROGRESS': return 'info';
      case 'RESOLVED': return 'success';
      case 'CLOSED': return 'default';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PENDING': return 'Σε Αναμονή';
      case 'IN_PROGRESS': return 'Σε Εξέλιξη';
      case 'RESOLVED': return 'Επιλύθηκε';
      case 'CLOSED': return 'Κλειστό';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('el-GR');
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Διαχείριση Επικοινωνιών
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Διαχειριστείτε τις υποβολές φόρμων επικοινωνίας από τους πελάτες
        </Typography>
      </Box>

      {/* Statistics Cards */}
      {statistics && (
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Email color="primary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {statistics.totalContacts}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Συνολικές Επικοινωνίες
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <CalendarToday color="warning" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {statistics.pendingContacts}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Σε Αναμονή
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <CalendarToday color="success" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {statistics.resolvedContacts}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Επιλύθηκε
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <CalendarToday color="info" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {statistics.todayContacts}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Σήμερα
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Filters and Actions */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Αναζήτηση επικοινωνιών..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Κατάσταση</InputLabel>
              <Select
                value={statusFilter}
                label="Κατάσταση"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">Όλες</MenuItem>
                <MenuItem value="PENDING">Σε Αναμονή</MenuItem>
                <MenuItem value="IN_PROGRESS">Σε Εξέλιξη</MenuItem>
                <MenuItem value="RESOLVED">Επιλύθηκε</MenuItem>
                <MenuItem value="CLOSED">Κλειστό</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box display="flex" gap={1} justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={() => {
                  fetchContacts();
                  fetchStatistics();
                }}
              >
                Ανανέωση
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Contacts Table */}
      <Paper elevation={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Όνομα</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Θέμα</TableCell>
                <TableCell>Κατάσταση</TableCell>
                <TableCell>Ημερομηνία</TableCell>
                <TableCell>Ενέργειες</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredContacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      Δεν βρέθηκαν επικοινωνίες
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredContacts.map((contact) => (
                  <TableRow key={contact.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Person sx={{ mr: 1, color: 'text.secondary' }} />
                        {contact.name}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Email sx={{ mr: 1, color: 'text.secondary' }} />
                        {contact.email}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <SubjectIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                          {contact.subject}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={contact.status}
                        onChange={(e) => handleStatusUpdate(contact.id, e.target.value)}
                        disabled={updatingStatus === contact.id}
                        size="small"
                        sx={{ minWidth: 120 }}
                      >
                        <MenuItem value="PENDING">Σε Αναμονή</MenuItem>
                        <MenuItem value="IN_PROGRESS">Σε Εξέλιξη</MenuItem>
                        <MenuItem value="RESOLVED">Επιλύθηκε</MenuItem>
                        <MenuItem value="CLOSED">Κλειστό</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(contact.createdAt)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Tooltip title="Προβολή λεπτομερειών">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedContact(contact);
                              setDialogOpen(true);
                            }}
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Διαγραφή">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteContact(contact.id)}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Contact Details Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedContact && (
          <>
            <DialogTitle>
              Λεπτομέρειες Επικοινωνίας
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Όνομα
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedContact.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedContact.email}
                  </Typography>
                </Grid>
                {selectedContact.phoneNumber && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Τηλέφωνο
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {selectedContact.phoneNumber}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Κατάσταση
                  </Typography>
                  <Chip
                    label={getStatusLabel(selectedContact.status)}
                    color={getStatusColor(selectedContact.status) as any}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Θέμα
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedContact.subject}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Μήνυμα
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                      {selectedContact.message}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Ημερομηνία Δημιουργίας
                  </Typography>
                  <Typography variant="body2">
                    {formatDate(selectedContact.createdAt)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Τελευταία Ενημέρωση
                  </Typography>
                  <Typography variant="body2">
                    {formatDate(selectedContact.updatedAt)}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>
                Κλείσιμο
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default ContactManagement; 