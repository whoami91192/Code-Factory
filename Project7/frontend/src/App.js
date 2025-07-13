import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';
import BookList from './components/BookList';
import ReviewList from './components/ReviewList';
import Layout from './components/Layout';

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorage = () => {
      setAuth(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute auth={auth}>
              <Layout setAuth={setAuth}>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/books"
          element={
            <PrivateRoute auth={auth}>
              <Layout setAuth={setAuth}>
                <BookList />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/reviews/:bookId"
          element={
            <PrivateRoute auth={auth}>
              <Layout setAuth={setAuth}>
                <ReviewList />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Login setAuth={setAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
