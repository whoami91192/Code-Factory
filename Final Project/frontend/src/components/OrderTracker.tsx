import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
  Grid,
  Paper,
  Avatar,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  LocalShipping as DeliveryIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Message as MessageIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
  Map as MapIcon,
  Timer as TimerIcon,
  Euro as EuroIcon,
  Person as PersonIcon,
  DirectionsCar as CarIcon,
  PedalBike as BikeIcon,
  TwoWheeler as MotorcycleIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface OrderStatus {
  id: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered';
  timestamp: Date;
  message: string;
  estimatedTime?: number; // minutes
}

interface DeliveryInfo {
  driverName: string;
  driverPhone: string;
  vehicleType: 'car' | 'bike' | 'motorcycle';
  vehiclePlate?: string;
  currentLocation: {
    lat: number;
    lng: number;
  };
  estimatedArrival: Date;
}

interface OrderTrackerProps {
  orderId: string;
  orderStatus: OrderStatus[];
  deliveryInfo?: DeliveryInfo;
  onRefresh?: () => void;
}

const OrderTracker: React.FC<OrderTrackerProps> = ({
  orderId,
  orderStatus,
  deliveryInfo,
  onRefresh
}) => {
  const theme = useTheme();
  const [showMap, setShowMap] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const steps = [
    {
      label: 'Order Placed',
      icon: <RestaurantIcon />,
      description: 'Your order has been received'
    },
    {
      label: 'Order Confirmed',
      icon: <CheckIcon />,
      description: 'We\'ve confirmed your order'
    },
    {
      label: 'Preparing',
      icon: <RestaurantIcon />,
      description: 'Our chefs are preparing your food'
    },
    {
      label: 'Ready for Pickup',
      icon: <CheckIcon />,
      description: 'Your order is ready'
    },
    {
      label: 'Out for Delivery',
      icon: <DeliveryIcon />,
      description: 'Your order is on its way'
    },
    {
      label: 'Delivered',
      icon: <CheckIcon />,
      description: 'Enjoy your meal!'
    }
  ];

  const statusToStep = {
    'pending': 0,
    'confirmed': 1,
    'preparing': 2,
    'ready': 3,
    'out_for_delivery': 4,
    'delivered': 5
  };

  const currentStatus = orderStatus[orderStatus.length - 1];
  const currentStep = statusToStep[currentStatus?.status || 'pending'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (onRefresh) {
      await onRefresh();
    }
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'car':
        return <CarIcon />;
      case 'bike':
        return <BikeIcon />;
      case 'motorcycle':
        return <MotorcycleIcon />;
      default:
        return <DeliveryIcon />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const getEstimatedDeliveryTime = () => {
    if (!deliveryInfo) return null;
    
    const now = new Date();
    const timeDiff = deliveryInfo.estimatedArrival.getTime() - now.getTime();
    const minutesLeft = Math.max(0, Math.floor(timeDiff / (1000 * 60)));
    
    return minutesLeft;
  };

  const minutesLeft = getEstimatedDeliveryTime();

  return (
    <Box>
      {/* Header */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Order #{orderId}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last updated: {formatTime(currentTime)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              Refresh
            </Button>
            {deliveryInfo && (
              <Button
                variant="contained"
                startIcon={<MapIcon />}
                onClick={() => setShowMap(true)}
              >
                Track on Map
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Order Progress */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <ScheduleIcon sx={{ mr: 1 }} />
                Order Progress
              </Typography>
              
              <Stepper activeStep={currentStep} orientation="vertical">
                {steps.map((step, index) => {
                  const isCompleted = index <= currentStep;
                  const isCurrent = index === currentStep;
                  
                  return (
                    <Step key={step.label}>
                      <StepLabel
                        icon={
                          <Avatar
                            sx={{
                              bgcolor: isCompleted ? 'success.main' : 'grey.300',
                              color: isCompleted ? 'white' : 'grey.600'
                            }}
                          >
                            {step.icon}
                          </Avatar>
                        }
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography variant="subtitle1">
                            {step.label}
                          </Typography>
                          {isCurrent && (
                            <Chip
                              label="Current"
                              color="primary"
                              size="small"
                            />
                          )}
                        </Box>
                      </StepLabel>
                      <StepContent>
                        <Typography variant="body2" color="text.secondary">
                          {step.description}
                        </Typography>
                        
                        {/* Show status details for current step */}
                        {isCurrent && currentStatus && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="caption" color="text.secondary">
                              {formatTime(currentStatus.timestamp)}
                            </Typography>
                            {currentStatus.message && (
                              <Typography variant="body2" sx={{ mt: 1 }}>
                                {currentStatus.message}
                              </Typography>
                            )}
                            {currentStatus.estimatedTime && (
                              <Box sx={{ mt: 1 }}>
                                <Typography variant="caption" color="text.secondary">
                                  Estimated time: {formatDuration(currentStatus.estimatedTime)}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        )}
                      </StepContent>
                    </Step>
                  );
                })}
              </Stepper>
            </CardContent>
          </Card>
        </Grid>

        {/* Delivery Info */}
        <Grid item xs={12} md={4}>
          {deliveryInfo ? (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <DeliveryIcon sx={{ mr: 1 }} />
                  Delivery Info
                </Typography>

                {/* Driver Info */}
                <List dense>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={deliveryInfo.driverName}
                      secondary="Your delivery driver"
                    />
                    <ListItemSecondaryAction>
                      <IconButton size="small" color="primary">
                        <PhoneIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>

                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        {getVehicleIcon(deliveryInfo.vehicleType)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${deliveryInfo.vehicleType.charAt(0).toUpperCase() + deliveryInfo.vehicleType.slice(1)}`}
                      secondary={deliveryInfo.vehiclePlate || 'Vehicle'}
                    />
                  </ListItem>
                </List>

                <Divider sx={{ my: 2 }} />

                {/* Estimated Arrival */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Estimated Arrival
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {formatTime(deliveryInfo.estimatedArrival)}
                  </Typography>
                  {minutesLeft !== null && (
                    <Typography variant="body2" color="text.secondary">
                      {minutesLeft > 0 ? `${minutesLeft} minutes remaining` : 'Arriving now'}
                    </Typography>
                  )}
                </Box>

                {/* Progress Bar */}
                {minutesLeft !== null && minutesLeft > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={Math.max(0, Math.min(100, 100 - (minutesLeft / 30) * 100))}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                )}

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<PhoneIcon />}
                    fullWidth
                    size="small"
                  >
                    Call Driver
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<MessageIcon />}
                    fullWidth
                    size="small"
                  >
                    Message
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Status
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your order is being prepared. We'll notify you when it's ready for delivery.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Order History */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Order History
          </Typography>
          <List dense>
            {orderStatus.map((status, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <CheckIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={status.message}
                  secondary={formatTime(status.timestamp)}
                />
                <ListItemSecondaryAction>
                  <Chip
                    label={status.status.replace('_', ' ').toUpperCase()}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Map Dialog */}
      <Dialog open={showMap} onClose={() => setShowMap(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              Live Delivery Tracking
            </Typography>
            <IconButton onClick={() => setShowMap(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ height: 400, bgcolor: 'grey.100', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
              <MapIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                Map Integration
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Real-time delivery tracking would be integrated here
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowMap(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderTracker; 