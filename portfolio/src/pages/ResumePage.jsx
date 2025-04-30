import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ResumePage = () => {
    const { userData, isLoading } = useSelector((state) => state.userState);
    const [resume,setResume] = useState('');

    useEffect(() => {
        if (!isLoading) {
            setResume(userData?.resume?.footerLinks?.resume || '');
        }
    }, [isLoading, userData]);

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>;
      }
  
  const getEmbedUrl = (url) => {
    if (!url) return null;

    // Google Drive
    const gDriveMatch = url.match(/\/d\/(.+?)\//);
    if (gDriveMatch) {
      return `https://drive.google.com/file/d/${gDriveMatch[1]}/preview`;
    }

    // Dropbox
    if (url.includes("dropbox.com")) {
      return url
        .replace("www.dropbox.com", "dl.dropboxusercontent.com")
        .replace("?dl=0", "");
    }

    // OneDrive
    if (url.includes("onedrive.live.com")) {
      // If it's a view link, convert it to an embed link
      const match = url.match(/resid=([^&]*)&authkey=([^&]*)/);
      if (match) {
        const [_, resid, authkey] = match;
        return `https://onedrive.live.com/embed?resid=${resid}&authkey=${authkey}`;
      }
    }

    // Direct PDF
    if (url.endsWith(".pdf")) {
      return url;
    }

    return null;
  };

  const embedUrl = getEmbedUrl(resume);

  return (
    <div className="min-h-screen bg-base-100 text-base-content px-4 py-12 overflow-hidden">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-lg text-primary uppercase tracking-wide font-semibold">
          My Resume
        </p>
        <h2 className="text-4xl font-bold">
          Professional Overview
        </h2>
        <div className="w-24 mx-auto mt-2 h-1 bg-primary rounded"></div>
      </div>

      {/* Resume Iframe */}
      {embedUrl ? (
        <div className="flex justify-center">
          <iframe
            src={embedUrl}
            title="Resume"
            className="w-full max-w-3xl h-[75vh] border border-base-300 rounded-xl shadow-lg"
            style={{
              overflow: "hidden",
              scrollbarWidth: "none",
            }}
            scrolling="no"
          ></iframe>
        </div>
      ) : (
        <p className="text-center text-red-500 text-lg mt-6">
          Failed to load resume. Please try again later.
        </p>
      )}
    </div>
  );
};

export default ResumePage;
