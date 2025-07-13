import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as CustomThemeProvider, useTheme } from './context/ThemeContext';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { LoyaltyProvider } from './context/LoyaltyContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Favorites from './pages/Favorites';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import ErrorBoundary from './components/ErrorBoundary';
import CookiesBanner from './components/CookiesBanner';
import FloatingCartButton from './components/FloatingCartButton';
import Terms from './pages/Terms';

const App: React.FC = () => {
  const { getMaterialTheme } = useTheme();
  const theme = getMaterialTheme();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <RecentlyViewedProvider>
                <LoyaltyProvider>
                  <Router>
                    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                      <Navbar />
                      <main style={{ flex: 1 }}>
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
                          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                          <Route path="/orders/:orderId" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
                          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                          <Route path="/terms" element={<Terms />} />
                        </Routes>
                      </main>
                      <Footer />
                      <CookiesBanner />
                      <FloatingCartButton />
                    </div>
                  </Router>
                </LoyaltyProvider>
              </RecentlyViewedProvider>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </ErrorBoundary>
    </MuiThemeProvider>
  );
};

const AppWithTheme: React.FC = () => (
  <CustomThemeProvider>
    <App />
  </CustomThemeProvider>
);

export default AppWithTheme; 