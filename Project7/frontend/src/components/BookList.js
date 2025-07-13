// src/components/BookList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BookForm from './BookForm';

function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/books', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBookCreated = (newBook) => {
    setBooks((prev) => [...prev, newBook]);
  };

  const goToReviews = (bookId) => {
    navigate(`/reviews/${bookId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Book List</h2>

      {/* Add Book Form */}
      <BookForm onBookCreated={handleBookCreated} />

      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book.id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-600">Author: {book.author}</p>
              <button
                onClick={() => goToReviews(book.id)}
                className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Reviews
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;
