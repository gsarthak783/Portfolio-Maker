import React from 'react';
import Navbar from './Navbar';
import logo from './logo1.png'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-500 text-gray-900"> 

      {/* Main Section */}
      <main className="container mx-auto flex flex-col items-center py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">We make Text to JPEG conversion easy.</h1>
        <p className="text-xl mb-6">All the tools you’ll need to convert your text to images efficiently.</p>
        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-blue-700 text-white text-lg rounded">Start Free Trial</button>
          <button className="px-6 py-3 bg-white text-blue-700 text-lg rounded border-2 border-blue-700">Explore All Tools</button>
        </div>
        <img src={logo} alt="Illustration" className="mt-10" />
      </main>
      
    </div>
  );
};

export default HomePage;
