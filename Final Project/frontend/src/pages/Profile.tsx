import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Box, Avatar, Button, TextField, Grid, Paper, IconButton, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Radio, FormControlLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../context/AuthContext';
import api, { orderService } from '../services/api';
import LoyaltyDashboard from '../components/LoyaltyDashboard';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useLoyalty } from '../context/LoyaltyContext';
import ToastNotifications, { ToastNotification } from '../components/ToastNotifications';

const Profile: React.FC = () => {
  const { user, setUser } = useAuth();
  const [avatar, setAvatar] = useState<string | undefined>(user?.avatarUrl || undefined);
  const [name, setName] = useState(user?.username || '');
  const [address, setAddress] = useState(user?.address || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [email, setEmail] = useState(user?.email || '');
  const [success, setSuccess] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);
  const theme = useTheme();
  const { loyaltyData, claimReward, refreshData } = useLoyalty();

  useEffect(() => {
    setName(user?.username || '');
    setAddress(user?.address || '');
    setPhone(user?.phone || '');
    setAvatar(user?.avatarUrl || undefined);
    setPostalCode(user?.postalCode || '');
    setEmail(user?.email || '');
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      setOrdersLoading(true);
      setOrdersError('');
      orderService.getUserOrders(user.id)
        .then(setOrders)
        .catch(() => setOrdersError('Failed to load order history.'))
        .finally(() => setOrdersLoading(false));
    }
  }, [user?.id]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async () => {
    try {
      const updated = {
        username: name,
        email,
        address,
        postalCode,
        phone,
        avatarUrl: avatar || '',
      };
      const res = await api.put('/auth/me', updated);
      setUser && setUser(res.data);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setSuccess('Failed to update profile.');
    }
  };

  const handleChangePassword = async () => {
    setPasswordMsg('');
    setPasswordError('');
    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError('Please fill in all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    try {
      await api.post('/auth/change-password', { oldPassword, newPassword });
      setPasswordMsg('Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordError(err.response?.data || 'Failed to change password.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, px: { xs: 1, sm: 2, md: 4 } }}>
      {/* Loyalty Dashboard */}
      <Box sx={{ mb: 4 }}>
        <LoyaltyDashboard 
          userPoints={loyaltyData.totalPoints}
          userTier={loyaltyData.level >= 5 ? 'Diamond' : loyaltyData.level >= 4 ? 'Platinum' : loyaltyData.level >= 3 ? 'Gold' : loyaltyData.level >= 2 ? 'Silver' : 'Bronze'}
          orderHistory={orders}
          onRedeemReward={(reward) => {
            const success = claimReward(reward.id);
            if (success) {
              refreshData();
              setNotifications(prev => [
                ...prev,
                {
                  id: Date.now().toString(),
                  type: 'success',
                  title: 'Reward Redeemed',
                  message: `You successfully redeemed "${reward.name}"! Enjoy your reward!`,
                  duration: 4000
                }
              ]);
            } else {
              setNotifications(prev => [
                ...prev,
                {
                  id: Date.now().toString(),
                  type: 'error',
                  title: 'Redemption Failed',
                  message: 'Not enough points or reward already used.',
                  duration: 4000
                }
              ]);
            }
          }}
        />
      </Box>
      
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>My Profile</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar src={avatar} sx={{ width: 80, height: 80, mb: 1 }} />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="avatar-upload"
            type="file"
            onChange={handleAvatarChange}
          />
          <label htmlFor="avatar-upload">
            <IconButton color="primary" component="span">
              <EditIcon />
            </IconButton>
          </label>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Full Name" value={name} onChange={e => setName(e.target.value)} fullWidth size="medium" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth size="medium" />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" sx={{ mt: 3, width: '100%' }} onClick={handleSave} size="large">
          Save Changes
        </Button>
        {success && <Typography color="success.main" sx={{ mt: 2 }}>{success}</Typography>}
      </Paper>
      {/* Order History Section */}
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4, mt: 3 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>Order History</Typography>
        {ordersLoading && <Alert severity="info">Loading orders...</Alert>}
        {ordersError && <Alert severity="error">{ordersError}</Alert>}
        {!ordersLoading && !ordersError && orders.length === 0 && (
          <Typography variant="body2" color="text.secondary">No orders found.</Typography>
        )}
        {!ordersLoading && !ordersError && orders.length > 0 && (
          <Box>
            {orders.slice(0, 5).map(order => (
              <Paper key={order.id} sx={{ p: 2, mb: 2 }}>
                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1">Order #{order.id}</Typography>
                    <Typography variant="body2" color="text.secondary">{order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}</Typography>
                  </Box>
                  <Button variant="outlined" size="small" component={Link} to={`/orders/${order.id}`} sx={{ mt: { xs: 1, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}>Details</Button>
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>Total: €{order.totalAmount?.toFixed(2)}</Typography>
                <Typography variant="body2">Status: {order.status}</Typography>
              </Paper>
            ))}
          </Box>
        )}
      </Paper>
      {/* Change Password Section */}
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4, mt: 3 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>Change Password</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Old Password" type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} fullWidth size="medium" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="New Password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} fullWidth size="medium" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Confirm New Password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} fullWidth size="medium" />
          </Grid>
        </Grid>
        {passwordError && <Alert severity="error" sx={{ mt: 2 }}>{passwordError}</Alert>}
        {passwordMsg && <Alert severity="success" sx={{ mt: 2 }}>{passwordMsg}</Alert>}
        <Button variant="contained" color="primary" sx={{ mt: 3, width: '100%' }} onClick={handleChangePassword} size="large">Change Password</Button>
      </Paper>
      <AddressSection />
      <ToastNotifications
        notifications={notifications}
        onClose={id => setNotifications(prev => prev.filter(n => n.id !== id))}
        maxNotifications={3}
      />
    </Container>
  );
};

const AddressSection: React.FC = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ label: '', address: '', postalCode: '', phone: '', isDefault: false });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchAddresses = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/user/addresses');
      setAddresses(res.data);
    } catch {
      setError('Failed to load addresses');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchAddresses(); }, [fetchAddresses]);

  const handleOpen = (address?: any) => {
    if (address) {
      setForm({ label: address.label, address: address.address, postalCode: address.postalCode, phone: address.phone, isDefault: address.isDefault });
      setEditingId(address.id);
    } else {
      setForm({ label: '', address: '', postalCode: '', phone: '', isDefault: false });
      setEditingId(null);
    }
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    try {
      if (editingId) {
        await api.put(`/user/addresses/${editingId}`, form);
      } else {
        await api.post('/user/addresses', form);
      }
      setOpen(false);
      fetchAddresses();
    } catch {
      setError('Failed to save address');
    }
  };
  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this address?')) return;
    try {
      await api.delete(`/user/addresses/${id}`);
      fetchAddresses();
    } catch {
      setError('Failed to delete address');
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 4, borderRadius: 4, mt: 4 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5" fontWeight={600}>Addresses</Typography>
        <Button startIcon={<AddIcon />} onClick={() => handleOpen()}>Add Address</Button>
      </Box>
      {loading && <Alert severity="info">Loading addresses...</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && addresses.length === 0 && <Typography color="text.secondary">No addresses found.</Typography>}
      {addresses.map(addr => (
        <Box key={addr.id} display="flex" alignItems="center" mb={1}>
          <Typography sx={{ flex: 1 }}>
            <b>{addr.label}</b>: {addr.address}, {addr.postalCode} {addr.phone && `(${addr.phone})`}
          </Typography>
          <IconButton size="small" onClick={() => handleOpen(addr)}><EditIcon /></IconButton>
          <IconButton size="small" onClick={() => handleDelete(addr.id)}><DeleteIcon /></IconButton>
        </Box>
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingId ? 'Edit Address' : 'Add Address'}</DialogTitle>
        <DialogContent>
          <TextField label="Label" value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} fullWidth sx={{ mb: 2 }} />
          <TextField label="Address" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} fullWidth sx={{ mb: 2 }} />
          <TextField label="Postal Code" value={form.postalCode} onChange={e => setForm(f => ({ ...f, postalCode: e.target.value }))} fullWidth sx={{ mb: 2 }} />
          <TextField label="Phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} fullWidth sx={{ mb: 2 }} />
          <FormControlLabel control={<Radio checked={form.isDefault} onChange={e => setForm(f => ({ ...f, isDefault: !f.isDefault }))} />} label="Set as default" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Profile; 