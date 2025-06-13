import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from '../firebase/Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const email = localStorage.getItem('email');
  const gender = localStorage.getItem('gender') || userData?.resume?.personalInfo?.gender;;
  const portfolioUrl = `https://user-portfolio-alpha.vercel.app/${email}`;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://portfolio-server-two-tawny.vercel.app/user/get-data/${email}`);
        const data = response.data;
        console.log("User Data:", data.payload);
        localStorage.setItem('gender', data.payload.resume?.personalInfo?.gender || 'Other');
        setUserData(data.payload);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  };

  return (
    <div className="min-h-screen bg-slate-200 p-8">
      {/* Dashboard Header */}
     <div className="bg-white rounded-xl shadow-md p-6 mb-8 mx-auto  flex flex-col  gap-8">
  {/* Left Sidebar: Avatar + Info + Buttons */}
  <div className="flex flex-col items-start w-full sm:w-1/3 space-y-4">
    {/* Avatar + Name */}
    <div className="flex items-center gap-4">
      <img
        src={
          gender === "Male"
            ? "/male.png"
            : gender === "Female"
            ? "/female.png"
            : "/other.png"
        }
        alt="Avatar"
        className="w-28 h-28 rounded-full"
      />
      <div>
        <h2 className="text-xl font-semibold text-black">
          {user?.displayName || "User"}
        </h2>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>

   
  </div>

  {/* Right Content: Personal Info */}
  <div className="flex-1 text-sm text-gray-800 space-y-2">
    {userData?.resume?.personalInfo?.summary && (
      <p className="italic text-gray-700 mb-2">
        "{userData.resume.personalInfo.summary}"
      </p>
    )}
    <div>
      <strong>Name:</strong> {userData?.resume?.personalInfo?.firstName} {userData?.resume?.personalInfo?.lastName}
    </div>
    <div>
      <strong>Gender:</strong> {userData?.resume?.personalInfo?.gender}
    </div>
    <div>
      <strong>Phone:</strong> {userData?.resume?.personalInfo?.contactNumber}
    </div>
    <div>
      <strong>Address:</strong> {userData?.resume?.personalInfo?.address}
    </div>
    <div>
      <strong>Email:</strong> {userData?.resume?.personalInfo?.email}
    </div>
    {userData?.resume?.personalInfo?.languages?.length > 0 && (
      <div>
        <strong>Languages:</strong>{" "}
        {userData.resume.personalInfo.languages.map((lang, i) => (
          <span key={i}>
            {lang.language} ({lang.proficiency})
            {i < userData.resume.personalInfo.languages.length - 1 && ", "}
          </span>
        ))}
      </div>
    )}
  </div>

   {/* Action Buttons */}
    <div className="mt-6 flex flex-row gap-2 justify-end w-full">
      <a
        href={portfolioUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline btn-primary "
      >
        View Portfolio
      </a>
      <button onClick={copyToClipboard} className="btn btn-outline btn-accent ">
        {copied ? "Copied!" : "Copy URL"}
      </button>
    </div>
</div>


      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard to="/personal-info" title="Personal Info" icon="👤" />
        <DashboardCard to="/experience-form" title="Experience" icon="💼" />
        <DashboardCard to="/education-form" title="Education" icon="🎓" />
        <DashboardCard to="/project-form" title="Projects" icon="📁" />
        <DashboardCard to="/certificate-form" title="Certificates" icon="📜" />
        <DashboardCard to="/footer-form" title="Footer Links" icon="🔗" />
      </div>
    </div>
  );
};

const DashboardCard = ({ to, title, icon }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-center items-center text-center hover:shadow-xl transition-all duration-300">
    <div className="text-4xl mb-4">{icon}</div>
    <Link to={to} className="btn btn-wide btn-primary text-base">
      {title}
    </Link>
  </div>
);

export default Dashboard;
