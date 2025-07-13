import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

import { useTheme } from '@mui/material/styles';
import {
  AppStoreBadge,
  GooglePlayBadge,
  VisaLogo,
  MastercardLogo,
  SkrillLogo,
  PayPalLogo
} from './FooterIcons';


const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: isDark ? 'background.default' : 'primary.main',
        background: isDark
          ? `linear-gradient(90deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`
          : `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
        color: isDark ? 'text.primary' : 'white',
        py: 6,
        mt: 'auto',
        boxShadow: isDark ? '0 -4px 24px rgba(33,33,33,0.25)' : '0 -4px 24px rgba(255,87,34,0.10)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{
                bgcolor: 'primary.main',
                borderRadius: '50%',
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                p: 0.7,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                height: 44,
                width: 44
              }}>
                {/* Modern food icon */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="none" />
                  <path d="M4 17h16M5 17l1.5-6h11L19 17M9 17V9a3 3 0 116 0v8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Box>
              <Typography variant="h6" fontWeight="bold">
                Food Ordering Platform
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              The best online food ordering experience. 
              Fast delivery, fresh food and excellent service.
            </Typography>
            {/* Social Media Icons */}
            <div className="footer-social" style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{
                background: '#fff', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', color: '#1877f3', transition: 'transform 0.2s, color 0.2s', fontSize: 24
              }}
                onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.18)')}
                onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <FacebookIcon sx={{ fontSize: 24 }} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{
                background: '#fff', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', color: '#1da1f2', transition: 'transform 0.2s, color 0.2s', fontSize: 24
              }}
                onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.18)')}
                onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <TwitterIcon sx={{ fontSize: 24 }} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
                background: '#fff', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', color: '#e4405f', transition: 'transform 0.2s, color 0.2s', fontSize: 24
              }}
                onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.18)')}
                onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <InstagramIcon sx={{ fontSize: 24 }} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{
                background: '#fff', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', color: '#0077b5', transition: 'transform 0.2s, color 0.2s', fontSize: 24
              }}
                onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.18)')}
                onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <LinkedInIcon sx={{ fontSize: 24 }} />
              </a>
            </div>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Download our app:
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  bgcolor: 'white', 
                  borderRadius: 2, 
                  p: 0.5, 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <AppStoreBadge width={100} height={35} />
                </Box>
                <Box sx={{ 
                  bgcolor: 'white', 
                  borderRadius: 2, 
                  p: 0.5, 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <GooglePlayBadge width={100} height={35} />
                </Box>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
                Payment Methods:
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: { xs: 1.5, sm: 3 },
                  py: 1,
                  px: 0,
                  flexWrap: { xs: 'wrap', sm: 'nowrap' },
                  background: 'none',
                }}
              >
                <VisaLogo height={32} width={undefined} style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.10))' }} />
                <MastercardLogo height={32} width={undefined} style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.10))' }} />
                <SkrillLogo height={32} width={undefined} style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.10))' }} />
                <PayPalLogo height={32} width={undefined} style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.10))' }} />
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Home
              </Link>
              <Link href="/products" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Products
              </Link>
              <Link href="/cart" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Cart
              </Link>
              <Link href="/orders" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Orders
              </Link>
              <Link href="/contact" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Contact Us
              </Link>
            </Box>
          </Grid>

          {/* Categories */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Categories
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/products?category=PIZZA" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Pizzas
              </Link>
              <Link href="/products?category=BURGER" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Burgers
              </Link>
              <Link href="/products?category=SALAD" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Salads
              </Link>
              <Link href="/products?category=DESSERT" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Desserts
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Contact
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">
                  +30 210 123 4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2">
                  info@foodordering.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationIcon fontSize="small" />
                <Typography variant="body2">
                  Athens, Greece
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" gutterBottom>
                Opening Hours:
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Monday - Sunday: 10:00 - 23:00
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {currentYear} Food Ordering Platform. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {/* Chips removed as per edit hint */}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 