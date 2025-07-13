import React, { useState, useEffect } from 'react';
import { Box, Typography, Rating, Button, TextField, Alert } from '@mui/material';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '@mui/material/styles';

interface Review {
  id: number;
  rating: number;
  comment: string;
  username: string;
  createdAt: string;
}

interface ProductReviewsProps {
  productId: number;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState('');
  const theme = useTheme();

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/products/${productId}/reviews`);
        setReviews(res.data);
      } catch {
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [productId]);

  const handleSubmit = async () => {
    setSubmitError('');
    setSuccess('');
    if (!rating) {
      setSubmitError('Please select a rating');
      return;
    }
    try {
      await api.post(`/products/${productId}/reviews`, { rating, comment });
      setSuccess('Review submitted!');
      setSubmitError('');
      setRating(null);
      setComment('');
      // Refresh reviews
      const res = await api.get(`/products/${productId}/reviews`);
      setReviews(res.data);
    } catch (err: any) {
      let msg = 'Failed to submit review';
      if (err?.response?.data?.message) msg = err.response.data.message;
      setSubmitError(msg);
      setSuccess('');
    }
  };

  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) : 0;

  return (
    <Box mt={2}>
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>Reviews</Typography>
      <Box display="flex" alignItems="center" mb={1}>
        <Rating value={avgRating} precision={0.5} readOnly />
        <Typography variant="body2" sx={{ ml: 1 }}>{avgRating.toFixed(1)} / 5 ({reviews.length} reviews)</Typography>
      </Box>
      {loading ? <Typography>Loading...</Typography> :
        error ? <Alert severity="error">{error}</Alert> :
        reviews.length === 0 ? <Typography>No reviews yet.</Typography> :
        <Box mb={2}>
          {reviews.map(r => (
            <Box key={r.id} mb={1} sx={{ background: theme.palette.action.hover, borderRadius: 2, p: 1.5 }}>
              <Box display="flex" alignItems="center" gap={1}>
                <Rating value={r.rating} readOnly size="small" />
                <Typography variant="subtitle2">{r.username || 'User'}</Typography>
                <Typography variant="caption" color="text.secondary">{new Date(r.createdAt).toLocaleDateString()}</Typography>
              </Box>
              <Typography variant="body2" sx={{ ml: 1 }}>{r.comment}</Typography>
            </Box>
          ))}
        </Box>
      }
      {user && (
        <Box mt={2}>
          <Typography variant="subtitle2" fontWeight={600}>Leave a review</Typography>
          <Rating value={rating} onChange={(_, v) => setRating(v)} sx={{ mb: 1 }} />
          <TextField
            label="Comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
            fullWidth
            multiline
            minRows={2}
            sx={{ mb: 1 }}
          />
          {submitError && <Alert severity="error" sx={{ mb: 1 }}>{submitError}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 1 }}>{success}</Alert>}
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
      )}
      {!user && <Typography variant="body2" color="text.secondary">Login to leave a review.</Typography>}
    </Box>
  );
};

export default ProductReviews; 