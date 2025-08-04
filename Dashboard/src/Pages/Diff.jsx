import React from 'react';
import { Link } from 'react-router-dom';

function Diff() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-5">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Oops! Page Not Found</h2>
      <p className="mb-6 text-gray-700 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default Diff;
