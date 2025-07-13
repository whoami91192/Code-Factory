import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Chip,
  Grid,
  Paper,
  InputBase,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Skeleton
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Star as StarIcon,
  Search as SearchIcon,
  Restaurant as RestaurantIcon,
  LocalPizza as PizzaIcon,
  LunchDining as BurgerIcon,
  RestaurantMenu as SaladIcon,
  LocalCafe as DrinkIcon,
  RestaurantMenu as DessertIcon
} from '@mui/icons-material';
// import { FixedSizeList as List } from 'react-window'; // Temporarily removed
import { useTheme } from '@mui/material/styles';
import { Product } from '../types';

interface VirtualizedProductListProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleFavorite: (productId: number) => void;
  favorites: number[];
  loading?: boolean;
  error?: string;
}

const VirtualizedProductList: React.FC<VirtualizedProductListProps> = ({
  products,
  onAddToCart,
  onToggleFavorite,
  favorites,
  loading = false,
  error
}) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterCategory, setFilterCategory] = useState('all');
  const [itemQuantities, setItemQuantities] = useState<{ [key: number]: number }>({});

  // Virtualization settings
  const ITEM_HEIGHT = 200;
  const ITEM_WIDTH = 300;
  const CONTAINER_HEIGHT = 600;

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(product => product.category === filterCategory);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.averageRating && a.averageRating ? b.averageRating - a.averageRating : 0;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchQuery, sortBy, filterCategory]);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    return ['all', ...uniqueCategories];
  }, [products]);

  const handleQuantityChange = useCallback((productId: number, change: number) => {
    setItemQuantities(prev => {
      const currentQuantity = prev[productId] || 0;
      const newQuantity = Math.max(0, currentQuantity + change);
      
      if (newQuantity === 0) {
        const { [productId]: removed, ...rest } = prev;
        return rest;
      }
      
      return { ...prev, [productId]: newQuantity };
    });
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    const quantity = itemQuantities[product.id] || 1;
    onAddToCart(product, quantity);
    setItemQuantities(prev => {
      const { [product.id]: removed, ...rest } = prev;
      return rest;
    });
  }, [itemQuantities, onAddToCart]);

  const getCategoryIcon = (category: string) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('pizza')) return <PizzaIcon />;
    if (categoryLower.includes('burger')) return <BurgerIcon />;
    if (categoryLower.includes('salad')) return <SaladIcon />;
    if (categoryLower.includes('drink') || categoryLower.includes('beverage')) return <DrinkIcon />;
    if (categoryLower.includes('dessert')) return <DessertIcon />;
    return <RestaurantIcon />;
  };

  // Virtualized item renderer
  const ProductItem = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const product = filteredAndSortedProducts[index];
    if (!product) return null;

    const quantity = itemQuantities[product.id] || 0;
    const isFavorite = favorites.includes(product.id); // Convert product.id to string for favorites

    return (
      <div style={{ ...style, width: '100%' }}>
        <Card 
          sx={{ 
            m: 1, 
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            width: '100%',
            height: 'auto',
            minHeight: 120,
            position: 'relative',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: theme.shadows[8]
            },
            transition: 'all 0.3s ease'
          }}
        >
          {/* Product Image */}
          <CardMedia
            component="img"
            sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 2, m: 1 }}
            image={product.imageUrl || '/images/default-food.jpg'}
            alt={product.name}
          />

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {/* Favorite Button */}
            <IconButton
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 1)'
                }
              }}
              onClick={() => onToggleFavorite(product.id)}
            >
              {isFavorite ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>

            {/* Badges */}
            <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 0.5 }}>
              {product.stockQuantity === 0 && (
                <Chip label="OUT OF STOCK" size="small" color="error" />
              )}
            </Box>

            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Product Info */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="h6" noWrap gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {product.description}
                </Typography>
              </Box>

              {/* Category and Rating */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  {getCategoryIcon(product.category)}
                  <Typography variant="caption" sx={{ ml: 0.5 }}>
                    {product.category}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StarIcon sx={{ fontSize: 16, color: 'text.disabled', mr: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">
                    No reviews
                  </Typography>
                </Box>
              </Box>

              {/* Price and Actions */}
              <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    €{product.price}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Stock: {product.stockQuantity}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {quantity > 0 && (
                    <>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(product.id, -1)}
                        disabled={product.stockQuantity === 0}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body2" sx={{ minWidth: 20, textAlign: 'center' }}>
                        {quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(product.id, 1)}
                        disabled={product.stockQuantity === 0 || quantity >= product.stockQuantity}
                      >
                        <AddIcon />
                      </IconButton>
                    </>
                  )}
                  <Button
                    variant={quantity > 0 ? "contained" : "outlined"}
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => quantity > 0 ? handleAddToCart(product) : handleQuantityChange(product.id, 1)}
                    disabled={product.stockQuantity === 0}
                  >
                    {quantity > 0 ? 'Add' : 'Add to Cart'}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Box>
        </Card>
      </div>
    );
  }, [filteredAndSortedProducts, itemQuantities, favorites, onToggleFavorite, handleQuantityChange, handleAddToCart, theme]);

  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <Skeleton variant="rectangular" height={120} />
                <CardContent>
                  <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
                  <Skeleton variant="text" height={16} sx={{ mb: 1 }} />
                  <Skeleton variant="text" height={16} width="60%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      {/* Filters and Search */}
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'background.paper', borderRadius: 1, px: 2 }}>
              <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <InputBase
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={filterCategory}
                label="Category"
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Results Info */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredAndSortedProducts.length} of {products.length} products
        </Typography>
        {searchQuery && (
          <Chip 
            label={`Search: "${searchQuery}"`} 
            onDelete={() => setSearchQuery('')}
            color="primary"
            variant="outlined"
          />
        )}
      </Box>

      {/* Virtualized List */}
      {filteredAndSortedProducts.length > 0 ? (
        <Box sx={{ height: CONTAINER_HEIGHT, border: 1, borderColor: 'divider', borderRadius: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2, p: 1 }}>
          {filteredAndSortedProducts.map((_, index) => (
            <div key={filteredAndSortedProducts[index].id} style={{ width: '100%' }}>
              {ProductItem({ index, style: { width: '100%' } })}
            </div>
          ))}
        </Box>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <RestaurantIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default VirtualizedProductList; 