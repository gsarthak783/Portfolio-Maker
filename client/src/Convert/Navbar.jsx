import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-700">MyTextToJPEG</div>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-blue-700 text-white rounded">Pricing</button>
          <button className="px-4 py-2 bg-blue-700 text-white rounded">Teams</button>
          <button className="px-4 py-2 bg-blue-700 text-white rounded">Log In</button>
          <button className="px-4 py-2 bg-blue-700 text-white rounded">Free Trial</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
