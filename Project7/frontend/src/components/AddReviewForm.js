// src/components/AddReviewForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Rating, Snackbar, TextField, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';

function AddReviewForm({ bookId, onReviewAdded }) {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content || rating === 0) {
      setSnackbar({ open: true, message: 'Please enter content and rating.', severity: 'warning' });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/api/reviews', {
        content,
        rating,
        book: { id: Number(bookId) }
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Created Review:", response.data);
      setContent('');
      setRating(0);
      setSnackbar({ open: true, message: 'Review added successfully!', severity: 'success' });
      if (onReviewAdded) onReviewAdded();
    } catch (error) {
      console.error("Failed to add review:", error);
      setSnackbar({ open: true, message: 'Failed to add review.', severity: 'error' });
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6">Add a Review</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Review"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Rating
          name="rating"
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          precision={1}
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Submit Review
          </Button>
        </Box>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AddReviewForm;
