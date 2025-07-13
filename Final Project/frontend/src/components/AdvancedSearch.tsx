import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Paper,
  Typography,
  Slider,
  FormControlLabel,
  Checkbox,
  Collapse,
  IconButton,
  Alert,
  CircularProgress,
  Grid,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  TrendingUp as TrendingIcon,
  Star as StarIcon,
  Euro as EuroIcon,
  Sort as SortIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface SearchFilters {
  query: string;
  categories: string[];
  priceRange: [number, number];
  rating: number;
  available: boolean;
  sortBy: 'name' | 'price' | 'rating' | 'popularity';
  sortOrder: 'asc' | 'desc';
}

interface AdvancedSearchProps {
  categories: string[];
  maxPrice: number;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: (query: string) => void;
  loading?: boolean;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  categories,
  maxPrice,
  onFiltersChange,
  onSearch,
  loading = false
}) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    categories: [],
    priceRange: [0, maxPrice],
    rating: 0,
    available: true,
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const theme = useTheme();

  // Mock search suggestions (in real app, this would come from API)
  const mockSuggestions = [
    'pizza', 'burger', 'pasta', 'salad', 'dessert', 'drink',
    'vegetarian', 'gluten-free', 'spicy', 'organic', 'fresh'
  ];

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleSearchChange = (query: string) => {
    setFilters(prev => ({ ...prev, query }));
    
    // Debounced search
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      onSearch(query);
      
      // Generate suggestions based on query
      if (query.length > 1) {
        const suggestions = mockSuggestions.filter(suggestion =>
          suggestion.toLowerCase().includes(query.toLowerCase())
        );
        setSearchSuggestions(suggestions.slice(0, 5));
      } else {
        setSearchSuggestions([]);
      }
    }, 300);
  };

  const handleCategoryChange = (categories: string[]) => {
    setFilters(prev => ({ ...prev, categories }));
  };

  const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
    setFilters(prev => ({ ...prev, priceRange: newValue as [number, number] }));
  };

  const handleRatingChange = (event: Event, newValue: number | number[]) => {
    setFilters(prev => ({ ...prev, rating: newValue as number }));
  };

  const handleSortChange = (sortBy: SearchFilters['sortBy']) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const handleSortOrderChange = (sortOrder: 'asc' | 'desc') => {
    setFilters(prev => ({ ...prev, sortOrder }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      categories: [],
      priceRange: [0, maxPrice],
      rating: 0,
      available: true,
      sortBy: 'name',
      sortOrder: 'asc'
    });
    setSearchSuggestions([]);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.query) count++;
    if (filters.categories.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice) count++;
    if (filters.rating > 0) count++;
    if (!filters.available) count++;
    return count;
  };

  const getSortIcon = (sortBy: string) => {
    switch (sortBy) {
      case 'price': return <EuroIcon />;
      case 'rating': return <StarIcon />;
      case 'popularity': return <TrendingIcon />;
      default: return <SortIcon />;
    }
  };

  return (
    <Box sx={{ mb: 3, p: 0 }}>
      {/* Search Bar */}
      <Box sx={{ mb: 2 }}>
        <Autocomplete
          freeSolo
          options={searchSuggestions}
          value={filters.query}
          onChange={(_, newValue) => handleSearchChange(newValue || '')}
          onInputChange={(_, newInputValue) => handleSearchChange(newInputValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              placeholder="Search for products, ingredients, or dietary preferences..."
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                ),
                endAdornment: (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {loading && <CircularProgress size={20} sx={{ mr: 1 }} />}
                    {filters.query && (
                      <IconButton
                        size="small"
                        onClick={() => handleSearchChange('')}
                        sx={{ mr: 1 }}
                      >
                        <ClearIcon />
                      </IconButton>
                    )}
                    {params.InputProps.endAdornment}
                  </Box>
                )
              }}
            />
          )}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <SearchIcon sx={{ mr: 1, fontSize: 16 }} />
              {option}
            </Box>
          )}
        />
      </Box>

      {/* Quick Filters */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        <Button
          variant={showAdvanced ? 'contained' : 'outlined'}
          startIcon={<FilterIcon />}
          onClick={() => setShowAdvanced(!showAdvanced)}
          size="small"
        >
          Advanced Filters
          {getActiveFiltersCount() > 0 && (
            <Chip
              label={getActiveFiltersCount()}
              size="small"
              color="primary"
              sx={{ ml: 1, minWidth: 20, height: 20 }}
            />
          )}
        </Button>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={filters.sortBy}
            label="Sort By"
            onChange={(e) => handleSortChange(e.target.value as SearchFilters['sortBy'])}
            startAdornment={getSortIcon(filters.sortBy)}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="popularity">Popularity</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          size="small"
          onClick={() => handleSortOrderChange(filters.sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          {filters.sortOrder === 'asc' ? '↑' : '↓'}
        </Button>

        {(getActiveFiltersCount() > 0) && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<ClearIcon />}
            onClick={clearFilters}
            color="error"
          >
            Clear All
          </Button>
        )}
      </Box>

      {/* Active Filters Display */}
      {getActiveFiltersCount() > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Active Filters:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {filters.query && (
              <Chip
                label={`Search: "${filters.query}"`}
                onDelete={() => handleSearchChange('')}
                size="small"
              />
            )}
            {filters.categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onDelete={() => handleCategoryChange(filters.categories.filter(c => c !== category))}
                size="small"
              />
            ))}
            {(filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice) && (
              <Chip
                label={`€${filters.priceRange[0]} - €${filters.priceRange[1]}`}
                onDelete={() => setFilters(prev => ({ ...prev, priceRange: [0, maxPrice] }))}
                size="small"
              />
            )}
            {filters.rating > 0 && (
              <Chip
                label={`${filters.rating}+ stars`}
                onDelete={() => setFilters(prev => ({ ...prev, rating: 0 }))}
                size="small"
              />
            )}
            {!filters.available && (
              <Chip
                label="Available only"
                onDelete={() => setFilters(prev => ({ ...prev, available: true }))}
                size="small"
              />
            )}
          </Box>
        </Box>
      )}

      {/* Advanced Filters */}
      <Collapse in={showAdvanced}>
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={3}>
          {/* Categories */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Categories
            </Typography>
            <Autocomplete
              multiple
              options={categories}
              value={filters.categories}
              onChange={(_, newValue) => handleCategoryChange(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select categories..."
                  size="small"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option}
                    label={option}
                    size="small"
                  />
                ))
              }
            />
          </Grid>

          {/* Price Range */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Price Range: €{filters.priceRange[0]} - €{filters.priceRange[1]}
            </Typography>
            <Slider
              value={filters.priceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              min={0}
              max={maxPrice}
              step={0.5}
            />
          </Grid>

          {/* Rating Filter */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Minimum Rating: {filters.rating} stars
            </Typography>
            <Slider
              value={filters.rating}
              onChange={handleRatingChange}
              valueLabelDisplay="auto"
              min={0}
              max={5}
              step={0.5}
              marks={[
                { value: 0, label: 'Any' },
                { value: 3, label: '3★' },
                { value: 4, label: '4★' },
                { value: 5, label: '5★' }
              ]}
            />
          </Grid>

          {/* Availability */}
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.available}
                  onChange={(e) => setFilters(prev => ({ ...prev, available: e.target.checked }))}
                />
              }
              label="Available items only"
            />
          </Grid>
        </Grid>

        {/* Search Tips */}
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Search Tips:</strong> Try searching for dietary preferences (vegetarian, gluten-free), 
            ingredients (chicken, pasta), or meal types (breakfast, dessert).
          </Typography>
        </Alert>
      </Collapse>
    </Box>
  );
};

export default AdvancedSearch; 