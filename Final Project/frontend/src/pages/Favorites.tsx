import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Box, 
  IconButton,
  Chip,
  Paper,
  Rating
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import ProductReviews from '../components/ProductReviews';
import ToastNotification from '../components/ToastNotification';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Favorites: React.FC = () => {
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();
  const { items, addToCart, removeFromCart, updateQuantity } = useCart();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });
  const theme = useTheme();

  const getProductQuantity = (productId: number) => {
    const item = items.find(i => i.id === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    addToRecentlyViewed(product);
    setToast({
      open: true,
      message: 'Product added to cart!',
      severity: 'success'
    });
  };

  const handleRemoveFromCart = (product: any) => {
    const currentQuantity = getProductQuantity(product.id);
    if (currentQuantity === 1) {
      removeFromCart(product.id);
      setToast({
        open: true,
        message: 'Product removed from cart!',
        severity: 'info'
      });
    } else {
      updateQuantity(product.id, currentQuantity - 1);
      setToast({
        open: true,
        message: 'Quantity updated!',
        severity: 'success'
      });
    }
  };

  const handleToggleFavorite = (product: any) => {
    toggleFavorite(product);
    setToast({
      open: true,
      message: 'Removed from favorites!',
      severity: 'success'
    });
  };

  const handleClearFavorites = () => {
    clearFavorites();
    setToast({
      open: true,
      message: 'All favorites cleared!',
      severity: 'info'
    });
  };

  if (favorites.length === 0) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Paper elevation={1} sx={{ p: 6, borderRadius: 3 }}>
          <FavoriteBorderIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            No favorites yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start adding products to your favorites to see them here!
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link}
            to="/products"
            sx={{ borderRadius: 2 }}
          >
            Browse Products
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, px: { xs: 1, sm: 2, md: 4 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Your Favorites
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleClearFavorites}
          sx={{ borderRadius: 2 }}
        >
          Clear All
        </Button>
      </Box>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {favorites.length} favorite product{favorites.length !== 1 ? 's' : ''}
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {favorites.map(product => {
          const quantity = getProductQuantity(product.id);
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card sx={{
                borderRadius: 4,
                boxShadow: `0 4px 24px ${theme.palette.primary.main}20`,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-6px) scale(1.03)',
                  boxShadow: `0 8px 32px ${theme.palette.primary.main}30`,
                },
                m: { xs: 0, sm: 1 },
                p: { xs: 1, sm: 2 },
              }}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia component="img" height="180" image={product.imageUrl} alt={product.name} sx={{ objectFit: 'cover', borderTopLeftRadius: 16, borderTopRightRadius: 16 }} />
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFavorite(product);
                    }}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <FavoriteIcon sx={{ color: theme.palette.error.main }} />
                  </IconButton>
                </Box>
                
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ flex: 1 }}>{product.name}</Typography>
                    <Chip 
                      label={product.category} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{product.description}</Typography>
                  
                  {product.averageRating && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={product.averageRating} precision={0.5} size="small" readOnly />
                      <Typography variant="caption" sx={{ ml: 0.5 }}>
                        ({product.averageRating.toFixed(1)})
                      </Typography>
                    </Box>
                  )}
                  
                  <Typography variant="h6" color="error.main" fontWeight={700} mb={1}>
                    {product.price.toFixed(2)} €
                  </Typography>
                </CardContent>
                
                <Box sx={{ p: 2, pt: 0 }}>
                  {quantity === 0 ? (
                    <Button
                      variant="contained"
                      color="warning"
                      fullWidth
                      onClick={() => handleAddToCart(product)}
                      startIcon={<AddIcon />}
                    >
                      ADD TO CART
                    </Button>
                  ) : (
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      width: '100%',
                      gap: 1
                    }}>
                      <IconButton 
                        color="error" 
                        onClick={() => handleRemoveFromCart(product)}
                        sx={{ 
                          border: '2px solid #f44336',
                          '&:hover': { backgroundColor: '#f44336', color: 'white' }
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          minWidth: 40, 
                          textAlign: 'center',
                          fontWeight: 'bold',
                          color: 'primary.main'
                        }}
                      >
                        {quantity}
                      </Typography>
                      <IconButton 
                        color="success" 
                        onClick={() => handleAddToCart(product)}
                        sx={{ 
                          border: '2px solid #4caf50',
                          '&:hover': { backgroundColor: '#4caf50', color: 'white' }
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
                
                <ProductReviews productId={product.id} />
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <ToastNotification
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast(prev => ({ ...prev, open: false }))}
      />
    </Container>
  );
};

export default Favorites; 