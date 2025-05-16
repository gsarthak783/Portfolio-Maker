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
        <div className="flex flex-col items-end space-y-4 mb-6">
      
        <div className="text-right">
          <span className="text-blue-600 hover:underline mx-2">
            <a href={`https://user-portfolio-alpha.vercel.app/${email}`} target="_blank" rel="noopener noreferrer">
              Portfolio URL
            </a>
          </span>

          {/* Copy Button */}
      <button onClick={copyToClipboard} className="btn btn-sm btn-outline btn-primary">
        {copied ? "Copied!" : "📋 Copy"}
      </button>
        </div>
      </div>
      ):(
        <>

        </>
      )}
     

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
            className="bg-blue-500 text-white w-1/2 text-center py-3 rounded-md hover:bg-blue-600 transition"
          >
            Experience
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center">
          <Link
            to="/education-form"
            className="bg-blue-500 text-white w-1/2 text-center py-3 rounded-md hover:bg-blue-600 transition"
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
