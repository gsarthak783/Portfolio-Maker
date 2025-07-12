import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Experiences = () => {
  const [data, setData] = useState([]);
  const {userData, isLoading} = useSelector(state => state.userState);
  
    // const experiences = userData.resume?.experiences;
    
 
    useEffect(() => {
      if (!isLoading) {
        setData(userData?.resume?.experiences || []);
      }
    }, [isLoading, userData]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">
    <span className="loading loading-spinner loading-lg text-primary"></span>
  </div>;
  }
  

  return (
    <div className="min-h-screen bg-base-100  px-6 py-12">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <p className="text-lg text-primary uppercase tracking-wide font-semibold">
          My Professional Journey
        </p>
        <h2 className="text-4xl font-bold ">
          Work Experience
        </h2>
        <div className="w-24 mx-auto mt-2 h-1 bg-primary rounded"></div>
      </div>

      {/* Experience List */}
      <div className="max-w-5xl mx-auto space-y-10">
        {data.length > 0 ? (
          data?.map((experience, index) => (
          <div
            key={index}
            className="card bg-neutral shadow-md hover:shadow-lg transition duration-300 p-6 border border-base-300"
          >
            {/* Header Section */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                {/* Company Logo */}
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={experience.companyLogo}
                    alt={experience.companyName}
                    className="w-16 h-16 object-contain rounded-md bg-white p-2 shadow-sm border border-base-300"
                  />
                </a>
                <div>
                  <h3 className="text-2xl text-primary font-bold ">
                    {experience.role}
                  </h3>
                  <p className="text-lg text-accent font-semibold">
                    {experience.companyName}
                  </p>
                </div>
              </div>
              <span
              className="badge badge-outline badge-primary text-sm px-3 py-1 whitespace-nowrap max-w-[120px] truncate"
              title={experience.duration}
            >
              {experience.duration}
            </span>
            </div>

            {/* Experience Details */}
            <ul className="mt-5 list-disc ml-5 space-y-2 text-accent">
              {experience.summaryPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>

            {/* Visit Company Button */}
            <div className="flex justify-end mt-4">
              <a
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                Visit Company
              </a>
            </div>
          </div>
        ))
        ) : (
           <p className="text-center text-gray-500">No experience records found.</p>
        )}
      </div>
    </div>
  );
};

export default Experiences;
