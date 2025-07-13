import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Chip,
  Paper,
  IconButton,
  Tooltip,
  LinearProgress,
  Alert,
  useTheme
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  ShoppingCart as CartIcon,
  Visibility as ViewIcon,
  Star as StarIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

interface Recommendation {
  product: any;
  score: number;
  reason: string;
  confidence: number;
}

interface RecommendationsEngineProps {
  maxItems?: number;
  showReasons?: boolean;
}

const RecommendationsEngine: React.FC<RecommendationsEngineProps> = ({ 
  maxItems = 6, 
  showReasons = true 
}) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { items } = useCart();
  const { favorites } = useFavorites();
  const { getRecentlyViewed } = useRecentlyViewed();
  const theme = useTheme();

  const generateRecommendations = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Get user data for recommendations
      const [productsRes, ordersRes] = await Promise.all([
        api.get('/products'),
        api.get(`/orders/user/${user.id}`)
      ]);
      
      const allProducts = productsRes.data;
      const userOrders = ordersRes.data;
      const recentlyViewed = getRecentlyViewed();
      
      // Calculate recommendation scores
      const scoredProducts = allProducts.map((product: any) => {
        let score = 0;
        const reasons: string[] = [];
        
        // Category preference (based on order history)
        const categoryOrders = userOrders.filter((order: any) => 
          order.items.some((item: any) => item.product.category === product.category)
        ).length;
        if (categoryOrders > 0) {
          score += categoryOrders * 10;
          reasons.push(`You've ordered ${categoryOrders} items from this category`);
        }
        
        // Price preference (based on average order value)
        const avgOrderValue = userOrders.length > 0 
          ? userOrders.reduce((sum: number, order: any) => sum + order.totalAmount, 0) / userOrders.length 
          : 0;
        if (Math.abs(product.price - avgOrderValue) < 5) {
          score += 15;
          reasons.push('Matches your typical spending');
        }
        
        // Recently viewed
        if (recentlyViewed.some(p => p.id === product.id)) {
          score += 20;
          reasons.push('Recently viewed');
        }
        
        // Popular in favorites
        if (favorites.some(f => f.id === product.id)) {
          score += 25;
          reasons.push('In your favorites');
        }
        
        // High rating
        if (product.averageRating && product.averageRating >= 4) {
          score += 10;
          reasons.push('Highly rated');
        }
        
        // New product bonus
        if (product.id > 15) { // Assuming newer products have higher IDs
          score += 5;
          reasons.push('New addition');
        }
        
        // Avoid already in cart
        if (items.some(item => item.id === product.id)) {
          score -= 50;
          reasons.push('Already in cart');
        }
        
        return {
          product,
          score,
          reason: reasons.join(', '),
          confidence: Math.min(score / 50, 1) // Normalize confidence
        };
      });
      
      // Sort by score and take top recommendations
      const topRecommendations = scoredProducts
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, maxItems);
      
      setRecommendations(topRecommendations);
      
    } catch (err) {
      setError('Failed to generate recommendations');
    } finally {
      setLoading(false);
    }
  }, [user, items, favorites, maxItems, getRecentlyViewed]);

  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          <TrendingUpIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Personalized Recommendations
        </Typography>
        <LinearProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (recommendations.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          <TrendingUpIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Recommendations
        </Typography>
        <Typography color="text.secondary">
          Start ordering to get personalized recommendations!
        </Typography>
        <Button 
          variant="outlined" 
          startIcon={<RefreshIcon />}
          onClick={generateRecommendations}
          sx={{ mt: 2 }}
        >
          Refresh
        </Button>
      </Paper>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <TrendingUpIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Recommended for You
        </Typography>
        <Tooltip title="Refresh recommendations">
          <IconButton onClick={generateRecommendations} size="small">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
      <Grid container spacing={2}>
        {recommendations.map((rec) => (
          <Grid item xs={12} sm={6} md={4} key={rec.product.id}>
            <Card sx={{ height: '100%', position: 'relative' }}>
              <CardMedia
                component="img"
                height="140"
                image={rec.product.imageUrl}
                alt={rec.product.name}
              />
              
              {/* Confidence indicator */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  bgcolor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                  fontSize: '0.75rem'
                }}
              >
                {Math.round(rec.confidence * 100)}% match
              </Box>
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" noWrap>
                  {rec.product.name}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {rec.product.description.substring(0, 60)}...
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" color="primary" sx={{ mr: 1 }}>
                    €{rec.product.price}
                  </Typography>
                  {rec.product.averageRating && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <StarIcon sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                      <Typography variant="body2">
                        {rec.product.averageRating.toFixed(1)}
                      </Typography>
                    </Box>
                  )}
                </Box>
                
                {showReasons && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                    {rec.reason}
                  </Typography>
                )}
                
                <Chip 
                  label={rec.product.category} 
                  size="small" 
                  sx={{ mb: 1 }}
                />
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    size="small" 
                    variant="contained" 
                    startIcon={<CartIcon />}
                    fullWidth
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    size="small" 
                    variant="outlined" 
                    startIcon={<ViewIcon />}
                  >
                    View
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecommendationsEngine; 