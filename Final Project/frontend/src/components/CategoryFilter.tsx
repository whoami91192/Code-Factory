import React, { useState } from 'react';
import {
  Box,
  Chip,
  Slider,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterIcon,
  LocalFireDepartment as SpiceIcon,
  Euro as EuroIcon,
  Restaurant as RestaurantIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface CategoryFilterProps {
  categories: string[];
  onFiltersChange: (filters: FilterOptions) => void;
  maxPrice: number;
}

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  available: boolean;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  onFiltersChange,
  maxPrice
}) => {
  const theme = useTheme();
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [0, maxPrice],
    available: true
  });

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    const newFilters = { ...filters, priceRange: range };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleAvailableChange = (available: boolean) => {
    const newFilters = { ...filters, available };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const newFilters: FilterOptions = {
      categories: [],
      priceRange: [0, maxPrice] as [number, number],
      available: true
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.categories.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice) count++;
    if (!filters.available) count++;
    return count;
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <FilterIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          Filters
          {getActiveFiltersCount() > 0 && (
            <Chip
              label={getActiveFiltersCount()}
              size="small"
              color="primary"
              sx={{ ml: 1 }}
            />
          )}
        </Typography>
        {getActiveFiltersCount() > 0 && (
          <Chip
            label="Clear All"
            size="small"
            variant="outlined"
            onClick={clearAllFilters}
            sx={{ cursor: 'pointer' }}
          />
        )}
      </Box>

      <Grid container spacing={2}>
        {/* Categories */}
        <Grid item xs={12}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                <RestaurantIcon sx={{ mr: 1, fontSize: 20 }} />
                Categories
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    variant={filters.categories.includes(category) ? "filled" : "outlined"}
                    color={filters.categories.includes(category) ? "primary" : "default"}
                    onClick={() => handleCategoryChange(category)}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Price Range */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            <EuroIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Price Range: €{filters.priceRange[0]} - €{filters.priceRange[1]}
          </Typography>
          <Slider
            value={filters.priceRange}
            onChange={(_, value) => handlePriceRangeChange(value as [number, number])}
            valueLabelDisplay="auto"
            min={0}
            max={maxPrice}
            sx={{
              '& .MuiSlider-thumb': {
                backgroundColor: theme.palette.primary.main,
              },
              '& .MuiSlider-track': {
                backgroundColor: theme.palette.primary.main,
              },
              '& .MuiSlider-rail': {
                backgroundColor: theme.palette.grey[300],
              }
            }}
          />
        </Grid>

        {/* Availability */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.available}
                onChange={(e) => handleAvailableChange(e.target.checked)}
                color="primary"
              />
            }
            label="Available Only"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CategoryFilter; 