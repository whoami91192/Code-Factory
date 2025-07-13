import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">Welcome! You are authenticated.</p>

      <button
        onClick={() => navigate('/books')}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View Books
      </button>
    </div>
  );
}

export default Dashboard;
