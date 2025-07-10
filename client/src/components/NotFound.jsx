import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="text-center bg-white rounded-lg p-10 shadow-xl max-w-lg">
        <div className="text-6xl mb-4">🚧</div>
        <h1 className="text-3xl font-bold text-red-500 mb-3">404 - Page Not Found</h1>

        <p className="text-gray-700 text-lg mb-2">
          Oops! The page <span className="font-semibold">{location.pathname}</span> doesn't exist.
        </p>

        <p className="text-gray-500 mb-6">
          It looks like the page you're looking for was moved, deleted, or you might have typed the wrong URL.
        </p>

        <div className="flex justify-center gap-4 mb-6">
          <Link to="/" className="btn btn-primary">
            Go to Homepage
          </Link>
        </div>

        <div className="text-sm text-gray-400">
          If you believe this is a mistake, please contact our support.
        </div>
      </div>
    </div>
  );
};

export default NotFound;
