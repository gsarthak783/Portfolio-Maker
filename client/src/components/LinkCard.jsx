import React from "react";
import { Link } from "react-router-dom";

export default function LinkCard({
  to,
  icon,
  title,
  onClick,
  className = "",
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition py-3 px-4  ${className}`}
    >
      <div className="flex items-center space-x-3">
        {icon && <div className="text-blue-500">{icon}</div>}
        <span className="text-lg font-medium text-gray-700">{title}</span>
      </div>
    </Link>
  );
}
