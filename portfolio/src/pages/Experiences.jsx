import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Experiences = () => {
  const [data, setData] = useState([]);
  const {userData} = useSelector(state => state.userState);
  useEffect(() => {
    console.log(userData);
    const fetchData = async () => {
     
      let email = localStorage.getItem("email");
      let result = await axios.get(
        `http://localhost:4000/experience/get-data/${email}`
      );
      let fetchedData = result.data.payload;
      setData(fetchedData?.reverse());
    };

    fetchData();
  }, []);

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
        {data?.map((experience, index) => (
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
              <span className="badge badge-outline badge-primary text-sm px-3 py-1">
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
        ))}
      </div>
    </div>
  );
};

export default Experiences;
