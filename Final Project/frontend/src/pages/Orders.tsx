import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  CircularProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Restaurant as RestaurantIcon,
  LocalShipping as ShippingIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Receipt as ReceiptIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { useTheme } from '@mui/material/styles';

interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';
  orderDate: string;
  deliveryAddress: string;
  deliveryInstructions?: string;
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING': return 'warning';
    case 'CONFIRMED': return 'info';
    case 'PREPARING': return 'primary';
    case 'READY': return 'secondary';
    case 'DELIVERED': return 'success';
    case 'CANCELLED': return 'error';
    default: return 'default';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'PENDING': return <AccessTimeIcon />;
    case 'CONFIRMED': return <ReceiptIcon />;
    case 'PREPARING': return <RestaurantIcon />;
    case 'READY': return <ShippingIcon />;
    case 'DELIVERED': return <CheckCircleIcon />;
    case 'CANCELLED': return <ScheduleIcon />;
    default: return <AccessTimeIcon />;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'PENDING': return 'Pending';
    case 'CONFIRMED': return 'Confirmed';
    case 'PREPARING': return 'Preparing';
    case 'READY': return 'Ready';
    case 'DELIVERED': return 'Delivered';
    case 'CANCELLED': return 'Cancelled';
    default: return status;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('el-GR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const Orders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/orders/user/${user?.id}`);
      setOrders(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error loading orders');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
          <ReceiptIcon sx={{ fontSize: 64, color: theme.palette.text.secondary, mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            No orders found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            When you make your first order, it will appear here.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Order History
      </Typography>

      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} key={order.id}>
            <Card elevation={3}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Order #{order.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(order.orderDate)}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Chip
                      icon={getStatusIcon(order.status)}
                      label={getStatusText(order.status)}
                      color={getStatusColor(order.status) as any}
                      variant="outlined"
                    />
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      Order Details
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom>
                          Products:
                        </Typography>
                        <List dense>
                          {order.items.map((item) => (
                            <ListItem key={item.id} sx={{ px: 0 }}>
                              <ListItemAvatar>
                                <Avatar src={item.imageUrl} alt={item.productName}>
                                  <RestaurantIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={item.productName}
                                secondary={`${item.quantity}x €${item.price.toFixed(2)}`}
                              />
                              <Typography variant="body2" fontWeight="medium">
                                €{(item.quantity * item.price).toFixed(2)}
                              </Typography>
                            </ListItem>
                          ))}
                        </List>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom>
                          Delivery Information:
                        </Typography>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Address:
                          </Typography>
                          <Typography variant="body1">
                            {order.deliveryAddress}
                          </Typography>
                        </Box>
                        {order.deliveryInstructions && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                              Instructions:
                            </Typography>
                            <Typography variant="body1">
                              {order.deliveryInstructions}
                            </Typography>
                          </Box>
                        )}
                        {order.estimatedDeliveryTime && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                              Estimated Delivery Time:
                            </Typography>
                            <Typography variant="body1">
                              {formatDate(order.estimatedDeliveryTime)}
                            </Typography>
                          </Box>
                        )}
                        {order.actualDeliveryTime && (
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Actual Delivery Time:
                            </Typography>
                            <Typography variant="body1">
                              {formatDate(order.actualDeliveryTime)}
                            </Typography>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    Total: €{order.totalAmount.toFixed(2)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Orders; 