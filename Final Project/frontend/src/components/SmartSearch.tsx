import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Autocomplete,
  Chip,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Collapse,
  Alert,
  Badge,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  TrendingUp as TrendingIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  FilterList as FilterIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Restaurant as RestaurantIcon,
  LocalPizza as PizzaIcon,
  LunchDining as BurgerIcon,
  RestaurantMenu as SaladIcon,
  LocalCafe as DrinkIcon,
  Cake as DessertIcon,
  Euro as EuroIcon,
  Timer as TimerIcon,
  LocalFireDepartment as SpiceIcon,
  RestaurantMenu as EcoIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Product } from '../types';

interface SearchFilters {
  categories: string[];
  priceRange: [number, number];
  sortBy: string;
}

interface SmartSearchProps {
  products: Product[];
  onSearch: (query: string, filters: SearchFilters) => void;
  onProductSelect: (product: Product) => void;
}

const SmartSearch: React.FC<SmartSearchProps> = ({
  products,
  onSearch,
  onProductSelect
}) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    categories: [],
    priceRange: [0, 50],
    sortBy: 'relevance'
  });

  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([
    'Margherita Pizza',
    'Chicken Burger',
    'Caesar Salad',
    'Greek Salad',
    'Pepperoni Pizza',
    'Vegetarian Options',
    'Spicy Food',
    'Quick Delivery'
  ]);

  // Extract unique categories and calculate price range
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    return uniqueCategories.sort();
  }, [products]);

  const maxPrice = useMemo(() => {
    return Math.max(...products.map(p => p.price));
  }, [products]);

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'preparation-time', label: 'Fastest Preparation' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'newest', label: 'Newest' }
  ];

  // Simulate trending products and recommendations
  // useEffect(() => {
  //   const trending = products
  //     .filter(p => p.rating >= 4.5)
  //     .sort((a, b) => b.rating - a.rating)
  //     .slice(0, 5);
  //   // setTrendingProducts(trending); // Removed

  //   const recommended = products
  //     .filter(p => p.isNew)
  //     .sort(() => Math.random() - 0.5)
  //     .slice(0, 3);
  //   // setRecommendations(recommended); // Removed
  // }, [products]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setSearchQuery(query);
      onSearch(query, filters);
      
      // Add to recent searches
      setRecentSearches(prev => {
        const newSearches = [query, ...prev.filter(s => s !== query)].slice(0, 5);
        return newSearches;
      });
    }
  };

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onSearch(searchQuery, updatedFilters);
  };

  const clearFilters = () => {
    const defaultFilters: SearchFilters = {
      categories: [],
      priceRange: [0, maxPrice],
      sortBy: 'relevance'
    };
    setFilters(defaultFilters);
    onSearch(searchQuery, defaultFilters);
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

  return (
    <Box>
      {/* Search Bar */}
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Autocomplete
            freeSolo
            fullWidth
            options={[...recentSearches, ...popularSearches]}
            value={searchQuery}
            onChange={(_, newValue) => {
              if (typeof newValue === 'string') {
                handleSearch(newValue);
              }
            }}
            onInputChange={(_, newInputValue) => {
              setSearchQuery(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search for food, ingredients, or dietary preferences..."
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {searchQuery && (
                        <IconButton
                          size="small"
                          onClick={() => {
                            setSearchQuery('');
                            onSearch('', filters);
                          }}
                        >
                          <ClearIcon />
                        </IconButton>
                      )}
                    </InputAdornment>
                  )
                }}
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <SearchIcon sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2">{option}</Typography>
                  {recentSearches.includes(option) && (
                    <Chip label="Recent" size="small" sx={{ ml: 'auto' }} />
                  )}
                </Box>
              </Box>
            )}
          />
          
          <Button
            variant={showFilters ? "contained" : "outlined"}
            startIcon={<FilterIcon />}
            onClick={() => setShowFilters(!showFilters)}
            sx={{ minWidth: 'auto' }}
          >
            Filters
          </Button>
        </Box>

        {/* Quick Filters */}
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {/* Removed dietaryOptions.slice(0, 4).map((option) => ( // Removed
            <Chip
              key={option.value}
              label={`${option.icon} ${option.label}`}
              size="small"
              variant={filters.dietary.includes(option.value) ? "filled" : "outlined"}
              color={filters.dietary.includes(option.value) ? "primary" : "default"}
              onClick={() => {
                const newDietary = filters.dietary.includes(option.value)
                  ? filters.dietary.filter(d => d !== option.value)
                  : [...filters.dietary, option.value];
                handleFilterChange({ dietary: newDietary });
              }}
              sx={{ cursor: 'pointer' }}
            />
          ))} */}
        </Box>
      </Paper>

      {/* Advanced Filters */}
      <Collapse in={showFilters}>
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <FilterIcon sx={{ mr: 1 }} />
            Advanced Filters
          </Typography>

          <Grid container spacing={3}>
            {/* Categories */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>Categories</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    icon={getCategoryIcon(category)}
                    variant={filters.categories.includes(category) ? "filled" : "outlined"}
                    color={filters.categories.includes(category) ? "primary" : "default"}
                    onClick={() => {
                      const newCategories = filters.categories.includes(category)
                        ? filters.categories.filter(c => c !== category)
                        : [...filters.categories, category];
                      handleFilterChange({ categories: newCategories });
                    }}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            </Grid>

            {/* Price Range */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Price Range: €{filters.priceRange[0]} - €{filters.priceRange[1]}
              </Typography>
              <Slider
                value={filters.priceRange}
                onChange={(_, value) => handleFilterChange({ priceRange: value as [number, number] })}
                valueLabelDisplay="auto"
                min={0}
                max={maxPrice}
                sx={{ mt: 1 }}
              />
            </Grid>

            {/* Sort By */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={filters.sortBy}
                  label="Sort By"
                  onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
                >
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Dietary Preferences */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>Dietary Preferences</Typography>
              <Grid container spacing={1}>
                {/* Removed dietaryOptions.map((option) => ( // Removed
                  <Grid item xs={6} sm={4} md={2} key={option.value}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={filters.dietary.includes(option.value)}
                          onChange={(e) => {
                            const newDietary = e.target.checked
                              ? [...filters.dietary, option.value]
                              : filters.dietary.filter(d => d !== option.value);
                            handleFilterChange({ dietary: newDietary });
                          }}
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ marginRight: 4 }}>{option.icon}</span>
                          {option.label}
                        </Box>
                      }
                    />
                  </Grid>
                ))} */}
              </Grid>
            </Grid>

            {/* Tags */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>Popular Tags</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {/* Removed allTags.slice(0, 10).map((tag) => ( // Removed
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant={filters.tags.includes(tag) ? "filled" : "outlined"}
                    color={filters.tags.includes(tag) ? "primary" : "default"}
                    onClick={() => {
                      const newTags = filters.tags.includes(tag)
                        ? filters.tags.filter(t => t !== tag)
                        : [...filters.tags, tag];
                      handleFilterChange({ tags: newTags });
                    }}
                    sx={{ cursor: 'pointer' }}
                  />
                ))} */}
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </Box>
        </Paper>
      </Collapse>

      {/* Trending Products */}
      {/* Removed trendingProducts.length > 0 && ( // Removed
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <TrendingIcon sx={{ mr: 1, color: 'warning.main' }} />
            Trending Now
          </Typography>
          <Grid container spacing={2}>
            {trendingProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card 
                  sx={{ cursor: 'pointer', '&:hover': { transform: 'translateY(-2px)' } }}
                  onClick={() => onProductSelect(product)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {getCategoryIcon(product.category)}
                      <Typography variant="subtitle1" sx={{ ml: 1, flexGrow: 1 }}>
                        {product.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <StarIcon sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                        <Typography variant="body2">{product.rating}</Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      €{product.price} • {product.preparationTime} min
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                      {product.tags.slice(0, 2).map((tag) => (
                        <Chip key={tag} label={tag} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) */}

      {/* Recommendations */}
      {/* Removed recommendations.length > 0 && ( // Removed
        <Box>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <FavoriteIcon sx={{ mr: 1, color: 'error.main' }} />
            Recommended for You
          </Typography>
          <Grid container spacing={2}>
            {recommendations.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card 
                  sx={{ cursor: 'pointer', '&:hover': { transform: 'translateY(-2px)' } }}
                  onClick={() => onProductSelect(product)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {getCategoryIcon(product.category)}
                      <Typography variant="subtitle1" sx={{ ml: 1, flexGrow: 1 }}>
                        {product.name}
                      </Typography>
                      {product.isNew && (
                        <Chip label="NEW" size="small" color="success" />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      €{product.price} • {product.preparationTime} min
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <StarIcon sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                      <Typography variant="body2" sx={{ mr: 2 }}>
                        {product.rating}
                      </Typography>
                      {product.spiceLevel > 0 && (
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                          <SpiceIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          {getSpiceLevelText(product.spiceLevel)}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) */}
    </Box>
  );
};

export default SmartSearch; 