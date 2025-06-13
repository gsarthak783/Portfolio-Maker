import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from '../firebase/Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';


const Dashboard = () => {

    const [user, setUser] = useState(null);
    const email = localStorage.getItem('email');

    const portfolioUrl = `https://user-portfolio-alpha.vercel.app/${email}`;
    const [copied, setCopied] = useState(false);
  
    const copyToClipboard = () => {
      navigator.clipboard.writeText(portfolioUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000); // Reset copied state after 2 seconds
    };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // localStorage.setItem('name', currentUser.displayName);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('name');
    localStorage.removeItem('email')
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 flex flex-col">
      {/* Top Right Username and Logout Button */}
      {user !== null ? (
  <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg">
    {/* Left: Avatar */}
    <div>
      <img src="/male.png" alt="Avatar" className="w-16 h-16 rounded-full" />
    </div>

    {/* Right: Portfolio URL and Copy button */}
    <div className="text-right space-y-2">
      <a
        href={`https://user-portfolio-alpha.vercel.app/${email}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        Portfolio URL
      </a>
      <br />
      <button onClick={copyToClipboard} className="btn btn-sm btn-outline btn-primary">
        {copied ? "Copied!" : "📋 Copy"}
      </button>
    </div>
  </div>
) : null}

     

      {/* Main Content: 4 Cards */}
      <div className="flex-grow grid grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center">
          <Link
            to="/personal-info"
            className="bg-blue-500 text-white w-1/2 text-center py-3 rounded-md hover:bg-blue-600 transition"
          >
            Personal Info
          </Link>
        </div>


        <div className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center">
          <Link
            to="/experience-form"
            className="bg-pink-500 text-white w-1/2 text-center py-3 rounded-md hover:bg-pink-600 transition"
          >
            Experience
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center">
          <Link
            to="/education-form"
            className="bg-red-500 text-white w-1/2 text-center py-3 rounded-md hover:bg-red-600 transition"
          >
            Education
          </Link>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center">
          <Link
            to="/project-form"
            className="bg-green-500 text-white w-1/2 text-center py-3 rounded-md hover:bg-green-600 transition"
          >
            Projects
          </Link>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center">
          <Link
            to="/certificate-form"
            className="bg-yellow-500 text-white w-1/2 text-center py-3 rounded-md hover:bg-yellow-600 transition"
          >
            Certificates
          </Link>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center">
          <Link
            to="/footer-form"
            className="bg-purple-500 text-white w-1/2 text-center py-3 rounded-md hover:bg-purple-600 transition"
          >
            Footer Links
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
