import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Chip,
  Paper,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Tooltip,
  Badge,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Star as StarIcon,
  LocalFireDepartment as SpiceIcon,
  Euro as EuroIcon,
  Timer as TimerIcon,
  Restaurant as RestaurantIcon,
  LocalPizza as PizzaIcon,
  LunchDining as BurgerIcon,
  RestaurantMenu as SaladIcon,
  LocalCafe as DrinkIcon,
  RestaurantMenu as DessertIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  ShoppingCart as CartIcon,
  Settings as CustomizeIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import api from '../services/api';
import CategoryFilter, { FilterOptions } from '../components/CategoryFilter';
import ProductCustomizer, { ProductCustomization } from '../components/ProductCustomizer';
import SpecialOffers from '../components/SpecialOffers';
import SmartSearch from '../components/SmartSearch';
import VirtualizedProductList from '../components/VirtualizedProductList';
import ToastNotifications, { ToastNotification } from '../components/ToastNotifications';
import EnhancedLoadingSpinner from '../components/EnhancedLoadingSpinner';
import { Product } from '../types';

const Products: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const { addToCart, removeFromCart, items: cartItems } = useCart();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [0, 100],
    available: true
  });
  
  // New features state
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);
  const [itemQuantities, setItemQuantities] = useState<{ [key: string]: number }>({});

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const endpoint = user?.role === 'ADMIN' ? '/products/all' : '/products';
        const response = await api.get(endpoint);
        
        // Enhance products with additional properties
        const enhancedProducts = response.data.map((product: any) => ({
          ...product,
          imageUrl: product.imageUrl || product.image || '/images/default-food.jpg',
          available: product.available !== undefined ? product.available : true,
          createdAt: product.createdAt || new Date().toISOString(),
          updatedAt: product.updatedAt || new Date().toISOString(),
        }));
        
        setProducts(enhancedProducts);
        setFilteredProducts(enhancedProducts);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user?.role]);

  // Apply filters and search
  useEffect(() => {
    let filtered = products;

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply advanced filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => filters.categories.includes(product.category));
    }

    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    if (filters.available) {
      filtered = filtered.filter(product => product.available);
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

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, sortBy, filters]);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    addToCart(product);
    addNotification({
      id: Date.now().toString(),
      type: 'success',
      title: 'Added to Cart',
      message: `${quantity}x ${product.name} added to your cart`,
      duration: 3000
    });
  };

  const handleToggleFavorite = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      toggleFavorite(product);
      
      addNotification({
        id: Date.now().toString(),
        type: 'info',
        title: isFavorite(productId) ? 'Removed from Favorites' : 'Added to Favorites',
        message: `${product.name} ${isFavorite(productId) ? 'removed from' : 'added to'} favorites`,
        duration: 2000
      });
    }
  };

  const handleCustomizeProduct = (product: Product) => {
    setCustomizingProduct(product);
    setShowCustomizer(true);
  };

  const handleCustomizationConfirm = (customization: ProductCustomization) => {
    if (customizingProduct) {
      // Add customized product to cart
      const customizedProduct = {
        ...customizingProduct,
        price: customization.totalPrice,
        name: `${customizingProduct.name} (Customized)`
      };
      
      addToCart(customizedProduct);
      addNotification({
        id: Date.now().toString(),
        type: 'success',
        title: 'Customized Product Added',
        message: `Your customized ${customizingProduct.name} has been added to cart`,
        duration: 4000
      });
    }
    setShowCustomizer(false);
    setCustomizingProduct(null);
  };

  const handleApplyOffer = (offer: any) => {
    addNotification({
      id: Date.now().toString(),
      type: 'success',
      title: 'Offer Applied',
      message: `${offer.title} has been applied to your order`,
      duration: 4000
    });
  };

  const handleSmartSearch = (query: string, searchFilters: any) => {
    setSearchQuery(query);
    setFilters(prev => ({ ...prev, ...searchFilters }));
  };

  const handleProductSelect = (product: Product) => {
    // Navigate to product details or show quick view
    addNotification({
      id: Date.now().toString(),
      type: 'info',
      title: 'Product Selected',
      message: `Viewing details for ${product.name}`,
      duration: 2000
    });
  };

  const addNotification = (notification: ToastNotification) => {
    setNotifications(prev => [...prev, notification]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getCategoryIcon = (category: string) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('pizza')) return <PizzaIcon />;
    if (categoryLower.includes('burger')) return <BurgerIcon />;
    if (categoryLower.includes('salad')) return <SaladIcon />;
    if (categoryLower.includes('drink') || categoryLower.includes('beverage')) return <DrinkIcon />;
    if (categoryLower.includes('dessert')) return <DessertIcon />;
    return <RestaurantIcon />;
  };

  const getSpiceLevelText = (level: number) => {
    if (level <= 1) return 'Mild';
    if (level <= 2) return 'Medium';
    if (level <= 3) return 'Hot';
    if (level <= 4) return 'Very Hot';
    return 'Extra Hot';
  };

  const getSpiceLevelIcon = (level: number) => {
    return '🌶️'.repeat(Math.min(level, 5));
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <EnhancedLoadingSpinner 
          type="food" 
          size="large" 
          message="Loading delicious food..." 
        />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
          Our Menu
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover our delicious selection of fresh, high-quality food
        </Typography>
      </Box>

      {/* Smart Search */}
      {/* <Box sx={{ mb: 3 }}>
        <SmartSearch
          products={products}
          onSearch={handleSmartSearch}
          onProductSelect={handleProductSelect}
        />
      </Box> */}

      {/* Special Offers */}
      <Box sx={{ mb: 3 }}>
        <SpecialOffers
          onApplyOffer={handleApplyOffer}
          currentOrderTotal={0} // This would come from cart context
        />
      </Box>

      {/* Filters and Controls */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
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
          
          <Grid item xs={12} md={3}>
            <Button
              variant={showFilters ? "contained" : "outlined"}
              startIcon={<FilterIcon />}
              onClick={() => setShowFilters(!showFilters)}
              fullWidth
            >
              Advanced Filters
            </Button>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant={viewMode === 'grid' ? "contained" : "outlined"}
                startIcon={<ViewModuleIcon />}
                onClick={() => setViewMode('grid')}
                fullWidth
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? "contained" : "outlined"}
                startIcon={<ViewListIcon />}
                onClick={() => setViewMode('list')}
                fullWidth
              >
                List
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Advanced Filters */}
      {showFilters && (
        <Box sx={{ mb: 3 }}>
          <CategoryFilter
            categories={categories.filter(c => c !== 'all')}
            onFiltersChange={setFilters}
            maxPrice={Math.max(...products.map(p => p.price))}
          />
        </Box>
      )}

      {/* Results Info */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredProducts.length} of {products.length} products
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

      {/* Products Grid/List */}
      {viewMode === 'list' ? (
        <VirtualizedProductList
          products={filteredProducts}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
          favorites={favorites.map(p => p.id)}
          loading={loading}
          error={error}
        />
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => {
            const cartQuantity = cartItems.find(i => i.id === product.id)?.quantity || 0;
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8]
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {/* Product Image */}
                  <Box sx={{ position: 'relative', p: 1, pb: 0 }}>
                    <CardMedia
                      component="img"
                      image={product.imageUrl || '/images/default-food.jpg'}
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
                    {/* Overlay for softening */}
                    <Box sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: 2,
                      pointerEvents: 'none',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.18) 100%)'
                    }} />
                  </Box>

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
                    onClick={() => handleToggleFavorite(product.id)}
                  >
                    {isFavorite(product.id) ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>

                  {/* Badges */}
                  <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 0.5 }}>
                    {/* product.isNew && (
                      <Chip label="NEW" size="small" color="success" />
                    ) */}
                    {/* product.isPopular && (
                      <Chip label="POPULAR" size="small" color="warning" />
                    ) */}
                    {!product.available && (
                      <Chip label="OUT OF STOCK" size="small" color="error" />
                    )}
                  </Box>

                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Product Info */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {product.description}
                      </Typography>
                    </Box>

                    {/* Category and Rating */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                        {getCategoryIcon(product.category)}
                        <Typography variant="caption" sx={{ ml: 0.5 }}>
                          {product.category}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <StarIcon sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                        <Typography variant="caption">
                          {product.averageRating ? product.averageRating.toFixed(1) : 'No reviews'}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Tags */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      {/* product.tags.slice(0, 2).map((tag) => (
                        <Chip key={tag} label={tag} size="small" variant="outlined" />
                      )) */}
                    </Box>

                    {/* Price and Actions */}
                    <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 700, mt: 1 }}>
                          €{product.price}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                          min
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1, mb: 1 }}>
                        {/* Customize (gear) button always visible */}
                        <Tooltip title="Customize">
                          <IconButton
                            size="small"
                            onClick={() => handleCustomizeProduct(product)}
                            disabled={!product.available}
                            sx={{ mr: 0.5 }}
                          >
                            <CustomizeIcon />
                          </IconButton>
                        </Tooltip>
                        {/* Show quantity controls only if product is in cart */}
                        {cartQuantity > 0 ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                            <IconButton
                              size="small"
                              onClick={() => removeFromCart(product.id)}
                              disabled={cartQuantity === 0}
                              sx={{
                                border: '1px solid',
                                borderColor: cartQuantity === 0 ? 'grey.200' : 'primary.main',
                                color: cartQuantity === 0 ? 'grey.400' : 'primary.main',
                                bgcolor: 'background.paper',
                                borderRadius: '50%',
                                width: 24,
                                height: 24,
                                p: 0,
                                minWidth: 0,
                                boxShadow: 'none',
                                '&:hover': {
                                  bgcolor: 'primary.light',
                                  color: 'white',
                                  borderColor: 'primary.dark',
                                },
                                transition: 'all 0.2s',
                              }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Box sx={{ minWidth: 16, textAlign: 'center', fontWeight: 600, fontSize: '0.95rem', color: 'text.primary' }}>
                              {cartQuantity}
                            </Box>
                            <IconButton
                              size="small"
                              onClick={() => addToCart(product)}
                              disabled={!product.available}
                              sx={{
                                border: '1px solid',
                                borderColor: !product.available ? 'grey.200' : 'primary.main',
                                color: !product.available ? 'grey.400' : 'primary.main',
                                bgcolor: 'background.paper',
                                borderRadius: '50%',
                                width: 24,
                                height: 24,
                                p: 0,
                                minWidth: 0,
                                boxShadow: 'none',
                                '&:hover': {
                                  bgcolor: 'primary.light',
                                  color: 'white',
                                  borderColor: 'primary.dark',
                                },
                                transition: 'all 0.2s',
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        ) : (
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => {
                              addToCart(product);
                              addNotification({
                                id: Date.now().toString(),
                                type: 'success',
                                title: 'Added to Cart',
                                message: `${product.name} added to your cart`,
                                duration: 3000
                              });
                            }}
                            disabled={!product.available}
                            sx={{
                              minWidth: 120,
                              maxWidth: 140,
                              height: 36,
                              fontWeight: 600,
                              fontSize: '0.98rem',
                              borderRadius: 999,
                              boxShadow: 2,
                              px: 1.5,
                              whiteSpace: 'nowrap',
                              textTransform: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            Add to Cart
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="view cart"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000
        }}
        onClick={() => {/* Navigate to cart */}}
      >
        <Badge badgeContent={0} color="error">
          <CartIcon />
        </Badge>
      </Fab>

      {/* Product Customizer Dialog */}
      <ProductCustomizer
        open={showCustomizer}
        onClose={() => setShowCustomizer(false)}
        onConfirm={handleCustomizationConfirm}
        product={customizingProduct}
      />

      {/* Toast Notifications */}
      <ToastNotifications
        notifications={notifications}
        onClose={removeNotification}
        maxNotifications={3}
      />
    </Container>
  );
};

export default Products; 