import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Box, Typography, Paper, CircularProgress, Alert, List, ListItem, ListItemText, Divider, Button, Grid, Chip, Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';

const statusColors: Record<string, 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | undefined> = {
  PENDING: 'warning',
  CONFIRMED: 'primary',
  PREPARING: 'secondary',
  READY: 'success',
  OUT_FOR_DELIVERY: 'primary',
  DELIVERED: 'success',
  CANCELLED: 'error',
};

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    if (!orderId) return;
    setLoading(true);
    api.get(`/orders/${orderId}`)
      .then(res => {
        setOrder(res.data);
        setError(null);
      })
      .catch(err => {
        setError('Δεν βρέθηκε η παραγγελία ή δεν έχετε δικαίωμα πρόσβασης.');
        setOrder(null);
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  // Format date utility
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const hourStr = String(hours).padStart(2, '0');
    return `${year}/${month}/${day} ${hourStr}:${minutes}:${seconds} ${ampm}`;
  };

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px"><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!order) return null;

  return (
    <Box maxWidth={700} mx="auto" mt={4} px={2}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          BACK
        </Button>
        <Typography variant="h5" fontWeight={700} gutterBottom>Order Details</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1"><b>Order ID:</b> {order.id}</Typography>
            <Typography variant="subtitle1"><b>Total:</b> {order.totalAmount} €</Typography>
            <Typography variant="subtitle1"><b>Delivery address:</b> {order.deliveryAddress}</Typography>
            <Typography variant="subtitle1"><b>Date:</b> {formatDate(order.orderDate)}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems={{ xs: 'flex-start', sm: 'flex-end' }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              <b>Status:</b>{' '}
              <Chip
                label={order.status}
                color={statusColors[order.status] || 'default'}
                sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
              />
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" fontWeight={700} gutterBottom>Products</Typography>
        <List>
          {order.items && order.items.map((item: any) => (
            <ListItem key={item.id} alignItems="flex-start" sx={{ py: 1 }}>
              <Avatar
                variant="rounded"
                src={item.productImageUrl || undefined}
                alt={item.productName}
                sx={{ width: 56, height: 56, mr: 2 }}
              >
                {item.productName?.[0]}
              </Avatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight={500}>
                    {item.productName} x{item.quantity}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      Price: {item.price}€
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default OrderDetails; 