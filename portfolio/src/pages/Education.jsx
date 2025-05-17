import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Education = () => {
  const [educationList, setEducationList] = useState([]);
  const { userData, isLoading } = useSelector((state) => state.userState);

  useEffect(() => {
    if (!isLoading && userData?.resume?.education) {
      const reversedEducation = userData.resume.education.slice().reverse();
      setEducationList(reversedEducation);
    } else {
      setEducationList([]);
    }
  }, [isLoading, userData]);
  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 px-6 py-12">
    {/* Page Heading */}
    <div className="text-center mb-12">
      <p className="text-lg text-primary uppercase tracking-wide font-semibold">
        My Academic Journey
      </p>
      <h2 className="text-4xl font-bold">Education</h2>
      <div className="w-24 mx-auto mt-2 h-1 bg-primary rounded"></div>
    </div>
  
    {/* Education List */}
    <div className="max-w-4xl mx-auto space-y-8">
      {educationList.length > 0 ? (
        educationList.map((edu, index) => (
          <div
            key={index}
            className="card bg-neutral shadow-md hover:shadow-lg transition duration-300 p-6 border border-base-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl text-primary font-bold">{edu.title}</h3>
                <p className="text-lg text-accent font-semibold">{edu.instituteName}</p>
  
                {/* Duration & Grade as badges */}
                <div className="flex flex-wrap gap-3 mt-2">
                  <span className="badge badge-outline badge-info px-3 py-2 text-sm">
                    {edu.fromYear} - {edu.toYear}
                  </span>
                  <span className="badge badge-success px-3 py-2 text-sm">
                    Grade: {edu.grade}
                  </span>
                </div>
              </div>
            </div>
  
            {/* Website & Marksheet Links */}
            <div className="flex gap-4 mt-4 flex-wrap justify-end">
              {edu.website && (
                <a
                  href={edu.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm btn-primary"
                >
                  Institute Website
                </a>
              )}
              {edu.marksheetUrl && (
                <a
                  href={edu.marksheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  View Marksheet
                </a>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No education records found.</p>
      )}
    </div>
  </div>
  
  );
};

export default Education;
