import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Slider,
  Divider,
  IconButton,
  Alert,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Euro as EuroIcon,
  Restaurant as RestaurantIcon,
  LocalPizza as PizzaIcon,
  LunchDining as BurgerIcon,
  RestaurantMenu as SaladIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface CustomizationOption {
  id: string;
  name: string;
  price: number;
  category: string;
  maxQuantity?: number;
}

interface ProductCustomizerProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (customization: ProductCustomization) => void;
  product: any;
}

export interface ProductCustomization {
  basePrice: number;
  size: string;
  crust?: string;
  toppings: CustomizationOption[];
  extras: CustomizationOption[];
  specialInstructions: string;
  totalPrice: number;
}

const ProductCustomizer: React.FC<ProductCustomizerProps> = ({
  open,
  onClose,
  onConfirm,
  product
}) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [customization, setCustomization] = useState<ProductCustomization>({
    basePrice: product?.price || 0,
    size: 'medium',
    crust: 'classic',
    toppings: [],
    extras: [],
    specialInstructions: '',
    totalPrice: product?.price || 0
  });

  // Mock customization options
  const sizeOptions = [
    { value: 'small', label: 'Small', price: 0 },
    { value: 'medium', label: 'Medium', price: 2 },
    { value: 'large', label: 'Large', price: 4 },
    { value: 'xlarge', label: 'Extra Large', price: 6 }
  ];

  const crustOptions = [
    { value: 'classic', label: 'Classic', price: 0 },
    { value: 'thin', label: 'Thin Crust', price: 1 },
    { value: 'thick', label: 'Thick Crust', price: 1 },
    { value: 'stuffed', label: 'Stuffed Crust', price: 3 }
  ];

  const toppingOptions: CustomizationOption[] = [
    { id: 'pepperoni', name: 'Pepperoni', price: 2, category: 'meat' },
    { id: 'mushrooms', name: 'Mushrooms', price: 1.5, category: 'vegetable' },
    { id: 'olives', name: 'Black Olives', price: 1.5, category: 'vegetable' },
    { id: 'bacon', name: 'Bacon', price: 2.5, category: 'meat' },
    { id: 'ham', name: 'Ham', price: 2, category: 'meat' },
    { id: 'pineapple', name: 'Pineapple', price: 1.5, category: 'fruit' },
    { id: 'bell-peppers', name: 'Bell Peppers', price: 1, category: 'vegetable' },
    { id: 'onions', name: 'Onions', price: 1, category: 'vegetable' },
    { id: 'cheese', name: 'Extra Cheese', price: 2, category: 'dairy' },
    { id: 'jalapenos', name: 'Jalapeños', price: 1.5, category: 'spice' }
  ];

  const extraOptions: CustomizationOption[] = [
    { id: 'sauce', name: 'Extra Sauce', price: 0.5, category: 'sauce' },
    { id: 'dip', name: 'Garlic Dip', price: 1, category: 'dip' },
    { id: 'drink', name: 'Soft Drink', price: 2, category: 'beverage' },
    { id: 'fries', name: 'French Fries', price: 3, category: 'side' }
  ];

  const steps = ['Size & Base', 'Toppings', 'Extras', 'Review'];

  useEffect(() => {
    calculateTotalPrice();
  }, [customization.size, customization.crust, customization.toppings, customization.extras]);

  const calculateTotalPrice = () => {
    const sizePrice = sizeOptions.find(s => s.value === customization.size)?.price || 0;
    const crustPrice = crustOptions.find(c => c.value === customization.crust)?.price || 0;
    const toppingsPrice = customization.toppings.reduce((sum, topping) => sum + topping.price, 0);
    const extrasPrice = customization.extras.reduce((sum, extra) => sum + extra.price, 0);
    
    const total = customization.basePrice + sizePrice + crustPrice + toppingsPrice + extrasPrice;
    
    setCustomization(prev => ({ ...prev, totalPrice: total }));
  };

  const handleSizeChange = (size: string) => {
    setCustomization(prev => ({ ...prev, size }));
  };

  const handleCrustChange = (crust: string) => {
    setCustomization(prev => ({ ...prev, crust }));
  };

  const handleToppingToggle = (topping: CustomizationOption) => {
    setCustomization(prev => ({
      ...prev,
      toppings: prev.toppings.some(t => t.id === topping.id)
        ? prev.toppings.filter(t => t.id !== topping.id)
        : [...prev.toppings, topping]
    }));
  };

  const handleExtraToggle = (extra: CustomizationOption) => {
    setCustomization(prev => ({
      ...prev,
      extras: prev.extras.some(e => e.id === extra.id)
        ? prev.extras.filter(e => e.id !== extra.id)
        : [...prev.extras, extra]
    }));
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleConfirm = () => {
    onConfirm(customization);
    onClose();
    setActiveStep(0);
  };

  const getProductIcon = () => {
    const category = product?.category?.toLowerCase();
    if (category?.includes('pizza')) return <PizzaIcon />;
    if (category?.includes('burger')) return <BurgerIcon />;
    if (category?.includes('salad')) return <SaladIcon />;
    return <RestaurantIcon />;
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Choose Size & Base</Typography>
            
            <Typography variant="subtitle1" gutterBottom>Size</Typography>
            <RadioGroup value={customization.size} onChange={(e) => handleSizeChange(e.target.value)}>
              <Grid container spacing={2}>
                {sizeOptions.map((size) => (
                  <Grid item xs={6} key={size.value}>
                    <Card 
                      variant={customization.size === size.value ? "elevation" : "outlined"}
                      sx={{ 
                        cursor: 'pointer',
                        border: customization.size === size.value ? 2 : 1,
                        borderColor: customization.size === size.value ? 'primary.main' : 'divider'
                      }}
                      onClick={() => handleSizeChange(size.value)}
                    >
                      <CardContent sx={{ textAlign: 'center', py: 2 }}>
                        <Typography variant="h6">{size.label}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {size.price > 0 ? `+€${size.price}` : 'Included'}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>

            {product?.category?.toLowerCase().includes('pizza') && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="subtitle1" gutterBottom>Crust Type</Typography>
                <RadioGroup value={customization.crust} onChange={(e) => handleCrustChange(e.target.value)}>
                  <Grid container spacing={2}>
                    {crustOptions.map((crust) => (
                      <Grid item xs={6} key={crust.value}>
                        <Card 
                          variant={customization.crust === crust.value ? "elevation" : "outlined"}
                          sx={{ 
                            cursor: 'pointer',
                            border: customization.crust === crust.value ? 2 : 1,
                            borderColor: customization.crust === crust.value ? 'primary.main' : 'divider'
                          }}
                          onClick={() => handleCrustChange(crust.value)}
                        >
                          <CardContent sx={{ textAlign: 'center', py: 2 }}>
                            <Typography variant="h6">{crust.label}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {crust.price > 0 ? `+€${crust.price}` : 'Included'}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </RadioGroup>
              </>
            )}
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Choose Toppings</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Select your favorite toppings (up to 5)
            </Typography>
            
            <Grid container spacing={2}>
              {toppingOptions.map((topping) => (
                <Grid item xs={6} sm={4} key={topping.id}>
                  <Card 
                    variant={customization.toppings.some(t => t.id === topping.id) ? "elevation" : "outlined"}
                    sx={{ 
                      cursor: 'pointer',
                      border: customization.toppings.some(t => t.id === topping.id) ? 2 : 1,
                      borderColor: customization.toppings.some(t => t.id === topping.id) ? 'primary.main' : 'divider'
                    }}
                    onClick={() => handleToppingToggle(topping)}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <Typography variant="subtitle2">{topping.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        +€{topping.price}
                      </Typography>
                      <Chip 
                        label={topping.category} 
                        size="small" 
                        variant="outlined"
                        sx={{ mt: 1 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Add Extras</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Complete your meal with these extras
            </Typography>
            
            <Grid container spacing={2}>
              {extraOptions.map((extra) => (
                <Grid item xs={6} sm={4} key={extra.id}>
                  <Card 
                    variant={customization.extras.some(e => e.id === extra.id) ? "elevation" : "outlined"}
                    sx={{ 
                      cursor: 'pointer',
                      border: customization.extras.some(e => e.id === extra.id) ? 2 : 1,
                      borderColor: customization.extras.some(e => e.id === extra.id) ? 'primary.main' : 'divider'
                    }}
                    onClick={() => handleExtraToggle(extra)}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <Typography variant="subtitle2">{extra.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        +€{extra.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Review Your Customization</Typography>
            
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {getProductIcon()}
                  <Typography variant="h6" sx={{ ml: 1 }}>{product?.name}</Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  Size: {sizeOptions.find(s => s.value === customization.size)?.label}
                  {customization.crust && ` • Crust: ${crustOptions.find(c => c.value === customization.crust)?.label}`}
                </Typography>
                
                {customization.toppings.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2">Toppings:</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                      {customization.toppings.map((topping) => (
                        <Chip key={topping.id} label={topping.name} size="small" />
                      ))}
                    </Box>
                  </Box>
                )}
                
                {customization.extras.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2">Extras:</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                      {customization.extras.map((extra) => (
                        <Chip key={extra.id} label={extra.name} size="small" />
                      ))}
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>

            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                Your customized {product?.name} is ready! Click "Add to Cart" to proceed.
              </Typography>
            </Alert>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {getProductIcon()}
            <Typography variant="h6" sx={{ ml: 1 }}>
              Customize {product?.name}
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent()}

        <Box sx={{ 
          position: 'sticky', 
          bottom: 0, 
          bgcolor: 'background.paper', 
          borderTop: 1, 
          borderColor: 'divider',
          p: 2,
          mt: 3
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
              <EuroIcon sx={{ mr: 1 }} />
              Total: €{customization.totalPrice.toFixed(2)}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              {activeStep > 0 && (
                <Button onClick={handleBack}>
                  Back
                </Button>
              )}
              
              {activeStep < steps.length - 1 ? (
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button variant="contained" onClick={handleConfirm}>
                  Add to Cart
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductCustomizer; 