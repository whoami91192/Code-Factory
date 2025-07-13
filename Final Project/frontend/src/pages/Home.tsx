import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box, Rating, IconButton, Fab, Badge } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import SpecialOffers from '../components/SpecialOffers';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Home: React.FC = () => {
  const { addToCart, removeFromCart, items: cartItems } = useCart();
  const { addToFavorites, isFavorite, toggleFavorite } = useFavorites();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data.slice(0, 8)); // Show only first 8 products
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const totalCartQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, px: { xs: 1, sm: 2, md: 4 } }}>
      {/* Welcome Section */}
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
        Welcome to Food Ordering
      </Typography>
      <Typography variant="h6" sx={{ opacity: 0.9, mb: 3, color: theme.palette.text.secondary }}>
        Discover delicious meals delivered to your doorstep
      </Typography>
      <Button 
        variant="contained" 
        size="large" 
        component={Link}
        to="/products"
        sx={{ 
          bgcolor: 'background.paper', 
          color: 'primary.main',
          mb: 4,
          '&:hover': { bgcolor: 'surface' }
        }}
      >
        Browse All
      </Button>

      {/* Special Offers Section */}
      <Box sx={{ mb: 4 }}>
        <SpecialOffers onApplyOffer={() => {}} currentOrderTotal={0} />
      </Box>

      {/* Featured Products Grid */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        Featured Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => {
          const cartItem = cartItems.find(i => i.id === product.id);
          const quantity = cartItem ? cartItem.quantity : 0;
          return (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <CardMedia
                  component="img"
                  image={product.imageUrl || product.image || '/images/default-food.jpg'}
                  alt={product.name}
                  sx={{
                    width: '100%',
                    aspectRatio: '4/3',
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: theme.shadows[2],
                    objectFit: 'cover',
                    transition: 'filter 0.3s, opacity 0.3s',
                    filter: 'brightness(0.97)',
                    '&:hover': {
                      opacity: 0.92,
                      filter: 'brightness(0.93) blur(1px)'
                    }
                  }}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {product.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={product.averageRating || 0} precision={0.1} readOnly size="small" />
                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                      {product.averageRating ? product.averageRating.toFixed(1) : 'No reviews'}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    €{product.price}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    {quantity > 0 ? (
                      <>
                        <IconButton size="small" color="primary" onClick={() => removeFromCart(product.id)}>
                          <RemoveIcon />
                        </IconButton>
                        <Typography variant="body2" sx={{ minWidth: 20, textAlign: 'center' }}>{quantity}</Typography>
                        <IconButton size="small" color="primary" onClick={() => addToCart(product)}>
                          <AddIcon />
                        </IconButton>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => addToCart(product)}
                        disabled={product.available === false}
                      >
                        Add to Cart
                      </Button>
                    )}
                    <Button
                      variant={isFavorite(product.id) ? 'contained' : 'outlined'}
                      size="small"
                      color="secondary"
                      onClick={() => toggleFavorite(product)}
                    >
                      {isFavorite(product.id) ? 'Favorited' : 'Favorite'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Floating Cart Button */}
      <Fab
        color="primary"
        aria-label="view cart"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000
        }}
        onClick={() => navigate('/cart')}
      >
        <Badge badgeContent={totalCartQuantity} color="error">
          <ShoppingCartIcon />
        </Badge>
      </Fab>
    </Container>
  );
};

export default Home; 