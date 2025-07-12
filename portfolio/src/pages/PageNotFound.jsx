import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    const email = localStorage.getItem('email')
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-error mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-base text-gray-600 mb-6">
          Sorry, the page you're looking for doesn’t exist or has been moved.
        </p>
        <Link to={`/${email}`} className="btn btn-primary">Back to Home</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
