import React, { useState } from 'react';
import { Box, Button, Container, Step, StepLabel, Stepper, TextField, Typography, Alert, CircularProgress, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const steps = ['Username', 'New Password'];

const ForgotPassword: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    setError(null);
    if (activeStep === 0 && !username.trim()) {
      setError('Please enter your admin username.');
      return;
    }
    if (activeStep === 1) {
      if (!password || !confirmPassword) {
        setError('Please fill in both password fields.');
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      handleResetPassword();
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError(null);
    setActiveStep((prev) => prev - 1);
  };

  const handleResetPassword = async () => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/auth/admin/reset-password', {
        username,
        newPassword: password,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Reset failed. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', mt: 6 }}>
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Admin Password Reset
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {success ? (
          <Box textAlign="center">
            <Alert severity="success" sx={{ mb: 2 }}>
              Password reset successful! You can now <Button color="success" onClick={() => navigate('/login')}>login</Button>.
            </Alert>
          </Box>
        ) : (
          <form onSubmit={e => { e.preventDefault(); handleNext(); }}>
            {activeStep === 0 && (
              <TextField
                label="Admin Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                fullWidth
                autoFocus
                margin="normal"
                required
              />
            )}
            {activeStep === 1 && (
              <>
                <TextField
                  label="New Password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Confirm New Password"
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
              </>
            )}
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button disabled={activeStep === 0 || loading} onClick={handleBack} variant="outlined">
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                endIcon={loading ? <CircularProgress size={18} /> : null}
              >
                {activeStep === steps.length - 1 ? 'Reset Password' : 'Next'}
              </Button>
            </Box>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default ForgotPassword; 