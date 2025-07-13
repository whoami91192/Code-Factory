import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddReviewForm from './AddReviewForm';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function ReviewList() {
  const { bookId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [editRating, setEditRating] = useState('');

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/api/reviews/book/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  const handleReviewAdded = () => {
    fetchReviews();
    setSnackbar({ open: true, message: 'Review added!', severity: 'success' });
  };

  const handleEditClick = (review) => {
    setEditingReviewId(review.id);
    setEditContent(review.content ?? '');
    setEditRating(review.rating ?? '');
  };

  const handleUpdateReview = async () => {
    if (!editContent || editContent.trim() === '') {
      setSnackbar({ open: true, message: 'Review content is required.', severity: 'error' });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/reviews/${editingReviewId}`, {
        content: editContent.trim(),
        rating: editRating
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setEditingReviewId(null);
      setEditContent('');
      setEditRating('');
      fetchReviews();
      setSnackbar({ open: true, message: 'Review updated!', severity: 'success' });
    } catch (error) {
      console.error('Failed to update review:', error);
      setSnackbar({ open: true, message: 'Failed to update review.', severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchReviews();
      setSnackbar({ open: true, message: 'Review deleted.', severity: 'info' });
    } catch (error) {
      console.error('Failed to delete review:', error);
      setSnackbar({ open: true, message: 'Failed to delete review.', severity: 'error' });
    }
  };

  if (loading) return <p>Loading reviews...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Reviews for: <strong>{bookId}</strong></h2>

      <AddReviewForm bookId={bookId} onReviewAdded={handleReviewAdded} />

      {reviews.length === 0 ? (
        <p className="mt-4">No reviews available for this book.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {reviews.map((review) => (
            <li key={review.id} className="bg-white shadow p-4 rounded-md">
              {editingReviewId === review.id ? (
                <>
                  <textarea
                    className="w-full border p-2 rounded mb-2"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <input
                    type="number"
                    className="w-full border p-2 rounded mb-2"
                    value={editRating}
                    onChange={(e) => setEditRating(e.target.value)}
                    min={1}
                    max={5}
                  />
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      onClick={handleUpdateReview}
                    >
                      Save
                    </button>
                    <button
                      className="px-4 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                      onClick={() => setEditingReviewId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-800">{review.content}</p>
                  <p className="text-sm text-gray-500">Rating: {review.rating}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      onClick={() => handleEditClick(review)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      onClick={() => handleDelete(review.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Snackbar */}
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
    </div>
  );
}

export default ReviewList;
