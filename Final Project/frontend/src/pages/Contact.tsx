import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  Grid,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Send,
  CheckCircle,
  Support
} from '@mui/icons-material';
import { contactService } from '../services/api';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  phoneNumber: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleInputChange = (field: keyof ContactForm) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.subject.trim()) {
      setError('Subject is required');
      return false;
    }
    if (!formData.message.trim()) {
      setError('Message is required');
      return false;
    }
    if (formData.message.length < 10) {
      setError('Message must be at least 10 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await contactService.submit(formData);
      setSuccess(true);
      setSnackbarOpen(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        phoneNumber: ''
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred while sending your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Email color="primary" />,
      title: 'Email',
      content: 'info@foodordering.gr',
      description: 'Send us an email for any question'
    },
    {
      icon: <Phone color="primary" />,
      title: 'Phone',
      content: '+30 210 1234567',
      description: 'Call us Monday to Friday, 9:00-18:00'
    },
    {
      icon: <LocationOn color="primary" />,
      title: 'Address',
      content: '123 Patision St, Athens',
      description: 'Visit us at our store'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          component="h1"
          fontWeight="bold"
          gutterBottom
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          Contact Us
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth="600px" mx="auto">
          We are happy to help you! Send us your message and we will reply as soon as possible.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Contact Information */}
        <Grid item xs={12} md={4}>
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom mb={3}>
              Contact Information
            </Typography>
            <Box display="flex" flexDirection="column" gap={3}>
              {contactInfo.map((info, index) => (
                <Card key={index} elevation={2} sx={{ 
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={1}>
                      <IconButton size="small" sx={{ mr: 1 }}>
                        {info.icon}
                      </IconButton>
                      <Typography variant="h6" fontWeight="bold">
                        {info.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="medium" color="primary" mb={0.5}>
                      {info.content}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {info.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Additional Info */}
            <Card sx={{ mt: 3, bgcolor: 'primary.main', color: 'white' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <Support sx={{ mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Customer Support
                  </Typography>
                </Box>
                <Typography variant="body2">
                  Our team is available 24/7 to help you with any question or issue.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom mb={3}>
              Send Us a Message
            </Typography>
            
            {success && (
              <Alert 
                severity="success" 
                icon={<CheckCircle />}
                sx={{ mb: 3 }}
                onClose={() => setSuccess(false)}
              >
                Your message was sent successfully! We will reply as soon as possible.
              </Alert>
            )}

            {error && (
              <Alert 
                severity="error" 
                sx={{ mb: 3 }}
                onClose={() => setError(null)}
              >
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={formData.phoneNumber}
                    onChange={handleInputChange('phoneNumber')}
                    variant="outlined"
                    placeholder="+30 210 1234567"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Subject"
                    value={formData.subject}
                    onChange={handleInputChange('subject')}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange('message')}
                    required
                    variant="outlined"
                    placeholder="Type your message..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <Send />}
                    sx={{
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      '&:hover': {
                        background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`
                      }
                    }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Your message was sent successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact; 