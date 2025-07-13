import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Badge, 
  IconButton, 
  Tooltip, 
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const navigationItems = [
    { label: 'Products', path: '/products', show: true },
    { label: 'Favorites', path: '/favorites', show: isAuthenticated },
    { label: 'Orders', path: '/orders', show: isAuthenticated },
    { label: 'Admin', path: '/admin', show: isAdmin },
    { label: 'Profile', path: '/profile', show: isAuthenticated },
  ];

  const authItems = [
    { label: 'Login', path: '/login', show: !isAuthenticated },
    { label: 'Register', path: '/register', show: !isAuthenticated },
  ];

  const drawer = (
    <Box sx={{ width: 280, pt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, mb: 2 }}>
        <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Food Ordering
        </Typography>
        <IconButton onClick={() => setMobileOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navigationItems.filter(item => item.show).map((item) => (
          <ListItem 
            key={item.label} 
            button 
            component={Link}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            sx={{ py: 1.5 }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        {isAuthenticated && (
          <ListItem 
            button 
            component={Link}
            to="/cart"
            onClick={() => setMobileOpen(false)}
            sx={{ py: 1.5 }}
          >
            <ListItemIcon>
              <Badge badgeContent={cartItemCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Cart" />
          </ListItem>
        )}
        <Divider />
        {authItems.filter(item => item.show).map((item) => (
          <ListItem 
            key={item.label} 
            button 
            component={Link}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            sx={{ py: 1.5 }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        {isAuthenticated && (
          <ListItem button onClick={handleLogout} sx={{ py: 1.5 }}>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  const isDark = theme.palette.mode === 'dark';

  return (
    <>
      <AppBar position="sticky" elevation={4} sx={{ boxShadow: '0 4px 16px rgba(255,87,34,0.10)' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box sx={{
              bgcolor: 'primary.main',
              borderRadius: '50%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
              p: 0.7,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
              height: 40,
              width: 40
            }}>
              {/* Modern food icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="none" />
                <path d="M4 17h16M5 17l1.5-6h11L19 17M9 17V9a3 3 0 116 0v8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Box>
            <Typography 
              variant="h6" 
              component={Link} 
              to="/" 
              style={{ textDecoration: 'none', color: 'inherit' }}
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Food Ordering
            </Typography>
          </Box>
          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navigationItems.filter(item => item.show).map((item) => (
                <Button 
                  key={item.label}
                  color="inherit" 
                  component={Link} 
                  to={item.path}
                  sx={{ 
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
              {/* Shopping Cart Icon */}
              {isAuthenticated && (
                <Tooltip title={`Shopping Cart (${cartItemCount} items)`}>
                  <IconButton 
                    color="inherit" 
                    component={Link} 
                    to="/cart"
                    aria-label={`Shopping Cart with ${cartItemCount} items`}
                    sx={{ 
                      ml: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    <Badge badgeContent={cartItemCount} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}

              {/* Auth Buttons */}
              {authItems.filter(item => item.show).map((item) => (
                <Button 
                  key={item.label}
                  color="inherit" 
                  component={Link} 
                  to={item.path}
                  sx={{ 
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
              {isAuthenticated && (
                <Button 
                  color="inherit" 
                  onClick={handleLogout}
                  sx={{ 
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Logout
                </Button>
              )}
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Dark Mode Toggle */}
              <Tooltip title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                <IconButton 
                  color="inherit" 
                  onClick={() => theme.palette.mode = isDark ? 'light' : 'dark'}
                  aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  size="small"
                >
                  {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>

              {/* Shopping Cart Icon */}
              {isAuthenticated && (
                <Tooltip title={`Shopping Cart (${cartItemCount} items)`}>
                  <IconButton 
                    color="inherit" 
                    component={Link} 
                    to="/cart"
                    aria-label={`Shopping Cart with ${cartItemCount} items`}
                    size="small"
                  >
                    <Badge badgeContent={cartItemCount} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}

              {/* Mobile Menu Button */}
              <IconButton
                color="inherit"
                aria-label="open navigation menu"
                onClick={() => setMobileOpen(true)}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            backgroundColor: theme.palette.background.paper
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar; 