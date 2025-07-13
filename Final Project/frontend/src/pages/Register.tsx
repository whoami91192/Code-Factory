import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '@mui/material/styles';

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const validateEmail = (email: string) => {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    // At least 8 chars, one uppercase, one lowercase, one number, one special char
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    let valid = true;
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    }
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters, include uppercase, lowercase, number, and special character.');
      valid = false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      valid = false;
    }
    if (!valid) return;
    setLoading(true);
    try {
      await register(username, email, password);
      navigate('/products');
    } catch (err: any) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Register</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth label="Username" value={username} onChange={e => setUsername(e.target.value)} autoFocus />
          <TextField margin="normal" required fullWidth label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} error={!!emailError} helperText={emailError} />
          <TextField margin="normal" required fullWidth label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} error={!!passwordError} helperText={passwordError} />
          <TextField margin="normal" required fullWidth label="Confirm Password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} error={!!confirmPasswordError} helperText={confirmPasswordError} />
          {error && <Alert severity="error">{error}</Alert>}
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2, mb: 2 }} disabled={loading}>
            Register
          </Button>
          <Typography variant="body2">Already have an account? <Link to="/login" style={{ color: theme.palette.primary.main, textDecoration: 'none' }}>Login</Link></Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Register; 