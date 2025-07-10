import React, { useState, useEffect , useRef} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/userContext";
import CustomAlert from "./CustomAlert";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, auth } from '../firebase/Firebase';
import { updateProfile } from "firebase/auth";

export async function uploadProfilePicture(file) {
  if (!auth.currentUser) {
    throw new Error("No authenticated user found.");
  }

  try {
    // Upload to Firebase Storage
    const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}.jpg`);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);

    // Update the photoURL in Firebase Auth
    await updateProfile(auth.currentUser, {
      photoURL: downloadUrl,
    });

    console.log("Profile photoURL updated successfully:", downloadUrl);

    return downloadUrl;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
}

 export const removeProfilePicture = async () => {
    if (!auth.currentUser || !auth.currentUser.photoURL) {
      return;
    }

    try {
      setLoading(true);
      const photoUri = auth.currentUser.photoURL;
      const filePath = decodeURIComponent(photoUri.split("/o/")[1].split("?")[0]); // Extract storage path
      const imageRef = ref(storage, filePath);
      await deleteObject(imageRef);

      await updateProfile(auth.currentUser, { photoURL: "" });
      setImageUrl(null);
      showAlert("Success", "Profile picture removed successfully.");
    } catch (error) {
      console.error("Error removing profile picture:", error);
      showAlert("Error", "Error removing profile picture. Please try again.");
    } finally {
      setLoading(false);
    }
  };


const Dashboard = () => {
  
  const {user} = useAuth();
  const [userData, setUserData] = useState(user);
  const email = localStorage.getItem('email');
  const gender = localStorage.getItem('gender') || user?.resume?.personalInfo?.gender;
  const portfolioUrl = `https://user-portfolio-alpha.vercel.app/${user?.email}`;
  const [copied, setCopied] = useState(false);
  const [alert , showAlert] = useState(false);

    const fileInputRef = useRef(null);

     // Handle image file selection
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    await uploadProfilePicture(file);
  };

  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const toggleAlert = () => {
    showAlert(true)
  }

  return (
    <div className="min-h-screen bg-slate-200 p-8">
      {/* Dashboard Header */}
     <div className="bg-white rounded-xl shadow-md p-6 mb-8 mx-auto  flex flex-col  gap-8">
  {/* Left Sidebar: Avatar + Info + Buttons */}
  <div className="flex flex-col items-start w-full sm:w-1/3 space-y-4">
    {/* Avatar + Name */}
    <div className="flex items-center md:flex-row gap-4">
      <img
        src={
          auth? auth.currentUser.photoURL : "/other.png"
        }
        alt="Avatar"
        className="w-28 h-28 rounded-full"
      />
      <div className="">
        <h2 className="text-xl font-semibold text-black">
          {user?.name || "User"}
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
   <div className="mt-6 flex flex-col md:flex-row gap-3 justify-end w-full">
  <button
    onClick={toggleAlert}
    className="btn btn-outline btn-accent w-full md:w-auto"
  >
    Update Profile Picture
  </button>

  <a
    href={portfolioUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="btn btn-outline btn-primary w-full md:w-auto"
  >
    View Portfolio
  </a>

  <button
    onClick={copyToClipboard}
    className="btn btn-outline btn-accent w-full md:w-auto"
  >
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

      <CustomAlert
        visible={alert}
        title="Update Profile Picture"
        message=""
        confirmText="Update"
        cancelText="Cancel"
        onClose={() => showAlert(false)}
        onConfirm={() => {triggerFilePicker()
          showAlert(false)
         }}
      />

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

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
