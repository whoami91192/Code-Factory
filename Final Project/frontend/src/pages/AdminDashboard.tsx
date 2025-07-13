import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  InputAdornment,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Restaurant as RestaurantIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  ListAlt as ListAltIcon,
  VpnKey as VpnKeyIcon
} from '@mui/icons-material';
import api from '../services/api';
import { useTheme } from '@mui/material/styles';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  available: boolean;
  stockQuantity: number;
}

interface User {
  id: number;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
  enabled: boolean;
  registrationDate: string;
}

interface Order {
  id: number;
  userId: number;
  items: any[];
  totalAmount: number;
  status: string;
  orderDate: string;
  deliveryAddress: string;
  deliveryNotes: string;
  estimatedDeliveryTime: string;
  actualDeliveryTime: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AdminDashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Product management
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    available: true,
    stockQuantity: ''
  });
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');

  // User management
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    role: 'USER' as 'USER' | 'ADMIN',
    enabled: true
  });
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');

  // Sales and Orders
  const [orders, setOrders] = useState<Order[]>([]);

  // State for password change dialog
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordUser, setPasswordUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeLoading, setPasswordChangeLoading] = useState(false);
  const [passwordChangeError, setPasswordChangeError] = useState<string | null>(null);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  const handleOpenPasswordDialog = (user: User) => {
    setPasswordUser(user);
    setNewPassword('');
    setConfirmNewPassword('');
    setPasswordChangeError(null);
    setPasswordChangeSuccess(false);
    setPasswordDialogOpen(true);
  };

  const handleClosePasswordDialog = () => {
    setPasswordDialogOpen(false);
    setPasswordUser(null);
    setNewPassword('');
    setConfirmNewPassword('');
    setPasswordChangeError(null);
    setPasswordChangeSuccess(false);
  };

  const handleChangeUserPassword = async () => {
    setPasswordChangeError(null);
    setPasswordChangeSuccess(false);
    if (!newPassword || !confirmNewPassword) {
      setPasswordChangeError('Please fill in both password fields.');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordChangeError('Password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordChangeError('Passwords do not match.');
      return;
    }
    setPasswordChangeLoading(true);
    try {
      await api.patch(`/users/${passwordUser?.id}/change-password`, { newPassword });
      setPasswordChangeSuccess(true);
      setTimeout(() => {
        handleClosePasswordDialog();
      }, 1200);
    } catch (err: any) {
      setPasswordChangeError(err.response?.data?.message || 'Failed to change password.');
    } finally {
      setPasswordChangeLoading(false);
    }
  };

  const theme = useTheme();

  useEffect(() => {
    fetchData();
    fetchOrders();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [productsRes, usersRes] = await Promise.all([
        api.get('/products/all'),
        api.get('/users')
      ]);
      setProducts(productsRes.data);
      // Map backend fields to frontend User interface
      setUsers(usersRes.data.map((user: any) => ({
        ...user,
        enabled: user.active, // map active to enabled
        registrationDate: user.createdAt // map createdAt to registrationDate
      })));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Σφάλμα κατά τη φόρτωση των δεδομένων');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data);
    } catch (err) {
      // ignore for now
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Product management functions
  const handleProductSubmit = async () => {
    try {
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        stockQuantity: parseInt(productForm.stockQuantity)
      };

      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, productData);
      } else {
        await api.post('/products', productData);
      }

      setProductDialogOpen(false);
      setEditingProduct(null);
      resetProductForm();
      fetchData();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Σφάλμα κατά την αποθήκευση του προϊόντος');
    }
  };

  const handleProductEdit = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price !== undefined && product.price !== null ? product.price.toString() : '',
      category: product.category,
      imageUrl: product.imageUrl || '',
      available: product.available,
      stockQuantity: product.stockQuantity !== undefined && product.stockQuantity !== null ? product.stockQuantity.toString() : ''
    });
    setProductDialogOpen(true);
  };

  const handleProductDelete = async (productId: number) => {
    if (window.confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το προϊόν;')) {
      try {
        await api.delete(`/products/${productId}`);
        fetchData();
      } catch (err: any) {
        setError(err.response?.data?.message || 'Σφάλμα κατά τη διαγραφή του προϊόντος');
      }
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      description: '',
      price: '',
      category: '',
      imageUrl: '',
      available: true,
      stockQuantity: ''
    });
  };

  // User management functions
  const handleUserSubmit = async () => {
    try {
      const payload = { ...userForm, active: userForm.enabled };
      if (editingUser) {
        await api.put(`/users/${editingUser.id}`, payload);
      } else {
        await api.post('/users', payload);
      }

      setUserDialogOpen(false);
      setEditingUser(null);
      resetUserForm();
      fetchData();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Σφάλμα κατά την αποθήκευση του χρήστη');
    }
  };

  const handleUserEdit = (user: User) => {
    setEditingUser(user);
    setUserForm({
      username: user.username,
      email: user.email,
      role: user.role,
      enabled: user.enabled
    });
    setUserDialogOpen(true);
  };

  const handleUserToggleStatus = async (userId: number, enabled: boolean) => {
    try {
      await api.patch(`/users/${userId}/status`, { enabled });
      fetchData();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Σφάλμα κατά την ενημέρωση κατάστασης χρήστη');
    }
  };

  const resetUserForm = () => {
    setUserForm({
      username: '',
      email: '',
      role: 'USER',
      enabled: true
    });
  };

  // Filter functions
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                         product.description.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = productCategoryFilter === 'all' || product.category === productCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(userSearch.toLowerCase()) ||
                         user.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = userRoleFilter === 'all' || user.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        System Management
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Sales" icon={<BarChartIcon />} iconPosition="start" />
          <Tab label="Orders" icon={<ListAltIcon />} iconPosition="start" />
          <Tab label="Products" icon={<RestaurantIcon />} iconPosition="start" />
          <Tab label="Users" icon={<PeopleIcon />} iconPosition="start" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {/* Sales Statistics */}
        <Box display="flex" flexWrap="wrap" gap={4} mb={4}>
          <Paper sx={{ p: 3, minWidth: 220 }} elevation={2}>
            <Typography variant="subtitle2" color="text.secondary">Total Orders</Typography>
            <Typography variant="h5" fontWeight={700}>{orders.length}</Typography>
          </Paper>
          <Paper sx={{ p: 3, minWidth: 220 }} elevation={2}>
            <Typography variant="subtitle2" color="text.secondary">Total Revenue</Typography>
            <Typography variant="h5" fontWeight={700}>
              €{orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0).toFixed(2)}
            </Typography>
          </Paper>
          <Paper sx={{ p: 3, minWidth: 220 }} elevation={2}>
            <Typography variant="subtitle2" color="text.secondary">Average Order Value</Typography>
            <Typography variant="h5" fontWeight={700}>
              €{orders.length ? (orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0) / orders.length).toFixed(2) : '0.00'}
            </Typography>
          </Paper>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {/* Orders List */}
        <Typography variant="h5" mb={3}>All Orders</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: theme.palette.action.hover }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>User ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Total Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.userId}</TableCell>
                  <TableCell>€{order.totalAmount?.toFixed(2)}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.orderDate ? new Date(order.orderDate).toLocaleString() : ''}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5">Product Management</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setProductDialogOpen(true)}
          >
            Add Product
          </Button>
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search products..."
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={productCategoryFilter}
                onChange={(e) => setProductCategoryFilter(e.target.value)}
                label="Category"
              >
                <MenuItem value="all">All categories</MenuItem>
                <MenuItem value="PIZZA">Pizza</MenuItem>
                <MenuItem value="BURGER">Burger</MenuItem>
                <MenuItem value="SALAD">Salad</MenuItem>
                <MenuItem value="DRINK">Drink</MenuItem>
                <MenuItem value="DESSERT">Dessert</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: theme.palette.action.hover }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Availability</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Stock</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Box
                      component="img"
                      src={product.imageUrl || '/placeholder-food.jpg'}
                      alt={product.name}
                      sx={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 1 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description.substring(0, 50)}...
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={product.category} size="small" />
                  </TableCell>
                  <TableCell>€{product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={product.available ? 'Available' : 'Unavailable'}
                      color={product.available ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{product.stockQuantity}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleProductEdit(product)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleProductDelete(product.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5">User Management</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setUserDialogOpen(true)}
          >
            Add User
          </Button>
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search users..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={userRoleFilter}
                onChange={(e) => setUserRoleFilter(e.target.value)}
                label="Role"
              >
                <MenuItem value="all">All roles</MenuItem>
                <MenuItem value="USER">User</MenuItem>
                <MenuItem value="ADMIN">Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: theme.palette.action.hover }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Registration Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role === 'ADMIN' ? 'Admin' : 'User'}
                      color={user.role === 'ADMIN' ? 'primary' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.enabled ? 'Active' : 'Inactive'}
                      color={user.enabled ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {user.registrationDate ? new Date(user.registrationDate).toLocaleDateString('en-GB') : '-'}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleUserEdit(user)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={user.enabled ? 'Deactivate' : 'Activate'}>
                      <IconButton
                        onClick={() => handleUserToggleStatus(user.id, !user.enabled)}
                        color={user.enabled ? 'warning' : 'success'}
                      >
                        {user.enabled ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Change Password">
                      <IconButton onClick={() => handleOpenPasswordDialog(user)} color="info">
                        <VpnKeyIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Product Dialog */}
      <Dialog open={productDialogOpen} onClose={() => setProductDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingProduct ? 'Edit Product' : 'Add Product'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                InputProps={{
                  startAdornment: <InputAdornment position="start">€</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  label="Category"
                >
                  <MenuItem value="PIZZA">Pizza</MenuItem>
                  <MenuItem value="BURGER">Burger</MenuItem>
                  <MenuItem value="SALAD">Salad</MenuItem>
                  <MenuItem value="DRINK">Drink</MenuItem>
                  <MenuItem value="DESSERT">Dessert</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                value={productForm.imageUrl}
                onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Stock"
                type="number"
                value={productForm.stockQuantity}
                onChange={(e) => setProductForm({ ...productForm, stockQuantity: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={productForm.available}
                    onChange={(e) => setProductForm({ ...productForm, available: e.target.checked })}
                  />
                }
                label="Available"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProductDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleProductSubmit} variant="contained">
            {editingProduct ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* User Dialog */}
      <Dialog open={userDialogOpen} onClose={() => setUserDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingUser ? 'Edit User' : 'Add User'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                value={userForm.username}
                onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={userForm.role}
                  onChange={(e) => setUserForm({ ...userForm, role: e.target.value as 'USER' | 'ADMIN' })}
                  label="Role"
                >
                  <MenuItem value="USER">User</MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={userForm.enabled}
                    onChange={(e) => setUserForm({ ...userForm, enabled: e.target.checked })}
                  />
                }
                label="Active"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUserSubmit} variant="contained">
            {editingUser ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Password Change Dialog */}
      <Dialog open={passwordDialogOpen} onClose={handleClosePasswordDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Change Password for {passwordUser?.username}</DialogTitle>
        <DialogContent>
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Confirm New Password"
            type="password"
            value={confirmNewPassword}
            onChange={e => setConfirmNewPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          {passwordChangeError && <Alert severity="error" sx={{ mt: 2 }}>{passwordChangeError}</Alert>}
          {passwordChangeSuccess && <Alert severity="success" sx={{ mt: 2 }}>Password changed successfully!</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePasswordDialog} disabled={passwordChangeLoading}>Cancel</Button>
          <Button onClick={handleChangeUserPassword} variant="contained" color="primary" disabled={passwordChangeLoading}>
            {passwordChangeLoading ? <CircularProgress size={20} /> : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard; 