import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const COOKIES_KEY = 'cookiesAccepted';

const CookiesBanner: React.FC = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIES_KEY);
    if (accepted === null) setOpen(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIES_KEY, 'true');
    setOpen(false);
  };
  const handleReject = () => {
    localStorage.setItem(COOKIES_KEY, 'false');
    setOpen(false);
  };

  if (!open) return null;

  return (
    <Paper elevation={8} sx={{
      position: 'fixed',
      bottom: 24,
      left: 0,
      right: 0,
      mx: 'auto',
      maxWidth: 480,
      p: 3,
      zIndex: 2000,
      borderRadius: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      bgcolor: 'background.paper',
      boxShadow: `0 8px 32px ${theme.palette.primary.main}30`,
    }}>
      <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
        This website uses cookies to ensure you get the best experience. See our <a href="/terms" style={{ color: theme.palette.primary.main, textDecoration: 'underline' }}>Terms & Conditions</a>.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAccept}>Accept</Button>
        <Button variant="outlined" color="secondary" onClick={handleReject}>Reject</Button>
      </Box>
    </Paper>
  );
};

export default CookiesBanner; 