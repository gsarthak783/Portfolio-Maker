import React, { useEffect, useState } from "react";
import axios from "axios";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let email = localStorage.getItem("email");
      let result = await axios.get(
        `http://localhost:4000/certificate/get-data/${email}`
      );
      let fetchedData = result.data.payload;
      setCertificates(fetchedData?.reverse());
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-base-100 px-6 py-12">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <p className="text-lg text-primary uppercase tracking-wide font-semibold">
          My Certifications
        </p>
        <h2 className="text-4xl font-bold">Certificates</h2>
        <div className="w-24 mx-auto mt-2 h-1 bg-primary rounded"></div>
      </div>

      {/* Certificate List */}
      <div className="max-w-4xl mx-auto space-y-8">
        {certificates.length > 0 ? (
          certificates.map((certificate, index) => (
            <div
              key={index}
              className="card bg-neutral shadow-md hover:shadow-lg transition duration-300 p-6 border border-base-300"
            >
              {/* Certificate Title & Issuer */}
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl text-primary font-bold">
                    {certificate.title}
                  </h3>
                  <p className="text-lg text-accent font-semibold">
                    {certificate.issuer}
                  </p>
                  <p className="text-sm text-gray-400">
                    Issued on: {new Date(certificate.issueDate).toDateString()}
                  </p>
                </div>
              </div>

              {/* Tags */}
              {certificate.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {certificate.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="badge badge-outline badge-secondary px-2 py-1 text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* View Certificate Button */}
              {certificate.url && (
                <div className="flex justify-end mt-4">
                  <a
                    href={certificate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    View Certificate
                  </a>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No certificates available.</p>
        )}
      </div>
    </div>
  );
};

export default Certificates;
