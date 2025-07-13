import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography } from '@mui/material';

const BookForm = ({ onBookCreated }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author) {
      setError('Title and Author are required.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/api/books', {
        title,
        author,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTitle('');
      setAuthor('');
      setError('');
      onBookCreated(response.data);
    } catch (err) {
      setError('Failed to add book.');
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6">Add a New Book</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Book
        </Button>
      </form>
    </Box>
  );
};

export default BookForm;
