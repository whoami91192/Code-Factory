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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
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
          <TextField margin="normal" required fullWidth label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <TextField margin="normal" required fullWidth label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
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