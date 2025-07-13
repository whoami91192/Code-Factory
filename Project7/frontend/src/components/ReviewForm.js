import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Rating } from '@mui/material';

const ReviewForm = ({ bookId, onReviewAdded }) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content || rating === 0) {
      setError('Please enter review content and rating.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:8080/api/reviews`,
        { content, rating, bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContent('');
      setRating(0);
      setError('');
      onReviewAdded(response.data);
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review.');
    }
  };

  return (
    <Box sx={{ mt: 4, mb: 3 }}>
      <Typography variant="h6">Add a Review</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Review"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Rating
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          sx={{ mb: 2 }}
        />
        <br />
        <Button type="submit" variant="contained" color="secondary">
          Submit Review
        </Button>
      </form>
    </Box>
  );
};

export default ReviewForm;
