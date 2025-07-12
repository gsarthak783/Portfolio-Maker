import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-error">404</h1>
        <h2 className="text-2xl font-semibold text-base-content mt-4">No Portfolio Found</h2>
        <p className="mt-2 text-base text-base-content/80">
          The portfolio you're looking for doesn't exist. Please double-check the URL,
          contact the owner directly, or reach out to our support team.
        </p>

        <div className="mt-6 flex justify-center gap-4">
         
          <a href="mailto:showcaze.portfolio@gmail.com" className="btn btn-outline">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
