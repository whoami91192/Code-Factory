import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  IconButton, 
  Button, 
  TextField, 
  Box, 
  Alert, 
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AnimatedCounter from '../components/AnimatedCounter';
import api from '../services/api';
import { useTheme } from '@mui/material/styles';
import { useLoyalty } from '../context/LoyaltyContext';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, placeOrder } = useCart();
  const { user } = useAuth();
  const { loyaltyData, addPoints, refreshData } = useLoyalty();
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await api.get('/user/addresses');
        setAddresses(res.data);
        // Set default address if exists, otherwise use first address
        const def = res.data.find((a: any) => a.isDefault);
        setSelectedAddress(def || res.data[0] || null);
      } catch {
        setAddresses([]);
        setSelectedAddress(null);
      }
    };
    fetchAddresses();
  }, [user]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleOrder = async () => {
    setError('');
    setSuccessMessage('');
    setLoading(true);
    try {
      await placeOrder(selectedAddress?.address || '', notes);
      console.log('Order placed successfully, showing message');
      setSuccessMessage('Thank you very much! Your order is being prepared and will be with you soon.');
      setNotes('');
      // Award loyalty points
      const points = Math.floor(total * 10);
      if (points > 0) {
        addPoints(points, 'Order');
        refreshData(); // Force refresh of loyalty context after awarding points
      }
      // Clear cart after showing success message for 3 seconds
      setTimeout(() => {
        clearCart();
      }, 3000);
      
    } catch (err: any) {
      console.error('Order failed:', err);
      setError('Failed to send order.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Your cart is empty</Typography>
        <Typography variant="body1" color="text.secondary">
          Add some delicious products to get started!
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          href="/products" 
          sx={{ mt: 2 }}
        >
          Browse Products
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, px: { xs: 1, sm: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {items.length} item{items.length !== 1 ? 's' : ''} in your cart
      </Typography>
      
      <TableContainer component={Paper} sx={{ mb: 3, p: { xs: 1, sm: 2 } }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(item => (
              <TableRow key={item.id} sx={{ '&:hover': { backgroundColor: `${theme.palette.primary.main}08` } }}>
                <TableCell>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1" fontWeight="bold" color="error.main">
                    {item.price.toFixed(2)} €
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    gap: 1
                  }}>
                    <IconButton 
                      size="small"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      sx={{ 
                        border: `1px solid ${theme.palette.error.main}`,
                        '&:hover': { backgroundColor: theme.palette.error.main, color: 'white' }
                      }}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        minWidth: 40, 
                        textAlign: 'center',
                        fontWeight: 'bold'
                      }}
                    >
                      {item.quantity}
                    </Typography>
                    <IconButton 
                      size="small"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      sx={{ 
                        border: `1px solid ${theme.palette.success.main}`,
                        '&:hover': { backgroundColor: theme.palette.success.main, color: 'white' }
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6" fontWeight="bold" color="primary.main">
                    {(item.price * item.quantity).toFixed(2)} €
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton 
                    onClick={() => removeFromCart(item.id)}
                    color="error"
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: theme.palette.error.main, 
                        color: 'white',
                        transform: 'scale(1.1)'
                      },
                      transition: 'all 0.2s'
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ backgroundColor: `${theme.palette.primary.main}10` }}>
              <TableCell colSpan={3}>
                <Typography variant="h6" fontWeight="bold">Total</Typography>
              </TableCell>
              <TableCell align="right" colSpan={2}>
                <AnimatedCounter
                  value={total}
                  suffix=" €"
                  decimals={2}
                  variant="h5"
                  fontWeight="bold"
                  color="error.main"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ mb: 2 }}>
        {addresses.length > 0 ? (
          <>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Delivery Address</InputLabel>
              <Select
                value={selectedAddress?.id || ''}
                label="Delivery Address"
                onChange={(e) => {
                  const address = addresses.find(a => a.id === e.target.value);
                  setSelectedAddress(address || null);
                }}
              >
                {addresses.map((address) => (
                  <MenuItem key={address.id} value={address.id}>
                    <b>{address.label}</b>: {address.address}, {address.postalCode} {address.phone && `(${address.phone})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Alert severity="info" sx={{ mb: 2 }}>
              <b>Selected Address:</b> {selectedAddress?.label}: {selectedAddress?.address}, {selectedAddress?.postalCode} {selectedAddress?.phone && `(${selectedAddress.phone})`}
            </Alert>
          </>
        ) : (
          <Alert severity="warning" sx={{ mb: 2 }}>
            No addresses found. Please add an address in your profile.
          </Alert>
        )}
        <TextField 
          label="Special Instructions" 
          value={notes} 
          onChange={e => setNotes(e.target.value)} 
          fullWidth 
          multiline 
          rows={2} 
          sx={{ mb: 2 }}
          placeholder="Any special requests or delivery instructions..."
        />
      </Box>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2 }}>
        <Button 
          variant="contained" 
          color="success" 
          onClick={handleOrder} 
          disabled={loading || !selectedAddress} 
          sx={{ flex: 1, minWidth: 120 }} 
          size="large"
        >
          {loading ? 'Processing...' : 'Place Order'}
        </Button>
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={clearCart} 
          disabled={loading} 
          sx={{ flex: 1, minWidth: 120 }} 
          size="large"
        >
          Clear Cart
        </Button>
      </Box>
    </Container>
  );
};

export default Cart; 