import React from 'react';
import { Fab, Badge, Zoom, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const FloatingCartButton: React.FC = () => {
  const { items } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  if (!isAuthenticated || cartItemCount === 0) {
    return null;
  }

  return (
    <Zoom in={true} style={{ transitionDelay: '200ms' }}>
      <Tooltip title={`${cartItemCount} item${cartItemCount !== 1 ? 's' : ''} in cart`} placement="left">
        <Fab
          color="primary"
          aria-label="cart"
          onClick={() => navigate('/cart')}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
            boxShadow: `0 4px 20px ${theme.palette.primary.main}50`,
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: `0 6px 25px ${theme.palette.primary.main}70`,
            },
            transition: 'all 0.3s ease',
          }}
        >
          <Badge badgeContent={cartItemCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </Fab>
      </Tooltip>
    </Zoom>
  );
};

export default FloatingCartButton; 