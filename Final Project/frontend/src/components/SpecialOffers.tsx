import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  LinearProgress,
  IconButton,
  Badge,
  Paper,
  Divider
} from '@mui/material';
import {
  LocalOffer as OfferIcon,
  Timer as TimerIcon,
  Discount as DiscountIcon,
  Close as CloseIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Star as StarIcon,
  Euro as EuroIcon,
  Percent as PercentIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed' | 'buy-one-get-one';
  discountValue: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  validUntil: Date;
  code?: string;
  category?: string;
  image?: string;
  isActive: boolean;
}

interface SpecialOffersProps {
  onApplyOffer: (offer: SpecialOffer) => void;
  currentOrderTotal: number;
}

const SpecialOffers: React.FC<SpecialOffersProps> = ({
  onApplyOffer,
  currentOrderTotal
}) => {
  const theme = useTheme();
  const [offers, setOffers] = useState<SpecialOffer[]>([
    {
      id: '1',
      title: 'First Order Discount',
      description: 'Get 20% off on your first order!',
      discountType: 'percentage',
      discountValue: 20,
      minOrderAmount: 15,
      maxDiscount: 10,
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      code: 'FIRST20',
      category: 'new-customer',
      isActive: true
    },
    {
      id: '2',
      title: 'Weekend Special',
      description: 'Buy one pizza, get one free!',
      discountType: 'buy-one-get-one',
      discountValue: 100,
      minOrderAmount: 20,
      validUntil: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
      code: 'WEEKEND2X1',
      category: 'pizza',
      isActive: true
    },
    {
      id: '3',
      title: 'Free Delivery',
      description: 'Free delivery on orders over €25',
      discountType: 'fixed',
      discountValue: 3,
      minOrderAmount: 25,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      code: 'FREEDEL',
      category: 'delivery',
      isActive: true
    },
    {
      id: '4',
      title: 'Loyalty Bonus',
      description: 'Extra 10% off for loyal customers',
      discountType: 'percentage',
      discountValue: 10,
      minOrderAmount: 30,
      maxDiscount: 15,
      validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
      code: 'LOYAL10',
      category: 'loyalty',
      isActive: true
    }
  ]);

  const [selectedOffer, setSelectedOffer] = useState<SpecialOffer | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [customCode, setCustomCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [codeSuccess, setCodeSuccess] = useState('');

  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: { [key: string]: number } = {};
      offers.forEach(offer => {
        const timeRemaining = offer.validUntil.getTime() - Date.now();
        newTimeLeft[offer.id] = Math.max(0, timeRemaining);
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [offers]);

  const formatTimeLeft = (milliseconds: number) => {
    if (milliseconds <= 0) return 'Expired';
    
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  const getDiscountText = (offer: SpecialOffer) => {
    switch (offer.discountType) {
      case 'percentage':
        return `${offer.discountValue}% OFF`;
      case 'fixed':
        return `€${offer.discountValue} OFF`;
      case 'buy-one-get-one':
        return 'BUY 1 GET 1 FREE';
      default:
        return 'OFFER';
    }
  };

  const getDiscountColor = (offer: SpecialOffer) => {
    switch (offer.discountType) {
      case 'percentage':
        return 'error';
      case 'fixed':
        return 'warning';
      case 'buy-one-get-one':
        return 'success';
      default:
        return 'primary';
    }
  };

  const isOfferEligible = (offer: SpecialOffer) => {
    if (!offer.isActive) return false;
    if (timeLeft[offer.id] <= 0) return false;
    if (offer.minOrderAmount && currentOrderTotal < offer.minOrderAmount) return false;
    return true;
  };

  const handleOfferClick = (offer: SpecialOffer) => {
    setSelectedOffer(offer);
    setShowDialog(true);
  };

  const handleApplyOffer = () => {
    if (selectedOffer) {
      onApplyOffer(selectedOffer);
      setShowDialog(false);
      setSelectedOffer(null);
    }
  };

  const handleCustomCodeSubmit = () => {
    const foundOffer = offers.find(offer => 
      offer.code?.toLowerCase() === customCode.toLowerCase()
    );

    if (foundOffer) {
      if (isOfferEligible(foundOffer)) {
        setCodeSuccess(`Code applied! ${foundOffer.title}`);
        setCodeError('');
        onApplyOffer(foundOffer);
      } else {
        setCodeError('This code is not eligible for your current order');
        setCodeSuccess('');
      }
    } else {
      setCodeError('Invalid discount code');
      setCodeSuccess('');
    }
  };

  const eligibleOffers = offers.filter(isOfferEligible);
  const expiredOffers = offers.filter(offer => timeLeft[offer.id] <= 0);

  return (
    <Box>
      {/* Custom Code Input */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <DiscountIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          Have a Discount Code?
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Enter your code"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            size="small"
          />
          <Button 
            variant="contained" 
            onClick={handleCustomCodeSubmit}
            disabled={!customCode.trim()}
          >
            Apply
          </Button>
        </Box>

        {codeError && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {codeError}
          </Alert>
        )}
        
        {codeSuccess && (
          <Alert severity="success" sx={{ mb: 1 }}>
            {codeSuccess}
          </Alert>
        )}
      </Paper>

      {/* Active Offers */}
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <OfferIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
        Special Offers
        <Badge badgeContent={eligibleOffers.length} color="primary" sx={{ ml: 1 }}>
          <StarIcon />
        </Badge>
      </Typography>

      <Grid container spacing={2}>
        {eligibleOffers.map((offer) => (
          <Grid item xs={12} sm={6} md={4} key={offer.id}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8]
                },
                position: 'relative',
                overflow: 'visible'
              }}
              onClick={() => handleOfferClick(offer)}
            >
              {/* Discount Badge */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -10,
                  right: 10,
                  zIndex: 1
                }}
              >
                <Chip
                  label={getDiscountText(offer)}
                  color={getDiscountColor(offer) as any}
                  size="small"
                  icon={<PercentIcon />}
                />
              </Box>

              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {offer.title}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {offer.description}
                </Typography>

                {offer.minOrderAmount && (
                  <Typography variant="caption" color="text.secondary" display="block">
                    Min. order: €{offer.minOrderAmount}
                  </Typography>
                )}

                {offer.maxDiscount && (
                  <Typography variant="caption" color="text.secondary" display="block">
                    Max. discount: €{offer.maxDiscount}
                  </Typography>
                )}

                <Divider sx={{ my: 1 }} />

                {/* Timer */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TimerIcon sx={{ fontSize: 16, mr: 0.5, color: 'warning.main' }} />
                    <Typography variant="caption" color="warning.main">
                      {formatTimeLeft(timeLeft[offer.id])}
                    </Typography>
                  </Box>
                  
                  {offer.code && (
                    <Chip
                      label={offer.code}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  )}
                </Box>

                {/* Progress bar for time remaining */}
                <LinearProgress
                  variant="determinate"
                  value={Math.max(0, (timeLeft[offer.id] / (offer.validUntil.getTime() - Date.now() + timeLeft[offer.id])) * 100)}
                  sx={{ mt: 1 }}
                  color={timeLeft[offer.id] < 24 * 60 * 60 * 1000 ? 'error' : 'primary'}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Expired Offers */}
      {expiredOffers.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom color="text.secondary">
            Expired Offers
          </Typography>
          <Grid container spacing={2}>
            {expiredOffers.slice(0, 3).map((offer) => (
              <Grid item xs={12} sm={6} md={4} key={offer.id}>
                <Card sx={{ opacity: 0.6 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {offer.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {offer.description}
                    </Typography>
                    <Chip
                      label="EXPIRED"
                      color="error"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Offer Details Dialog */}
      <Dialog open={showDialog} onClose={() => setShowDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              {selectedOffer?.title}
            </Typography>
            <IconButton onClick={() => setShowDialog(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          {selectedOffer && (
            <Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedOffer.description}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Chip
                  label={getDiscountText(selectedOffer)}
                  color={getDiscountColor(selectedOffer) as any}
                  icon={<EuroIcon />}
                  sx={{ mr: 1 }}
                />
                {selectedOffer.code && (
                  <Chip
                    label={`Code: ${selectedOffer.code}`}
                    variant="outlined"
                    size="small"
                  />
                )}
              </Box>

              {selectedOffer.minOrderAmount && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  Minimum order amount: €{selectedOffer.minOrderAmount}
                </Alert>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TimerIcon sx={{ mr: 1, color: 'warning.main' }} />
                <Typography variant="body2" color="warning.main">
                  Expires in: {formatTimeLeft(timeLeft[selectedOffer.id])}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleApplyOffer}
            startIcon={<CheckIcon />}
          >
            Apply Offer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SpecialOffers; 