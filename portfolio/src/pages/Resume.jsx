import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const ResumeDisplay = () => {
  const { userData } = useSelector((state) => state.userState);
  const email = localStorage.getItem("email");
  const {
    resume: {
      personalInfo,
      education = [],
      experiences = [],
      projects = [],
      certificates = [],
      skills = [],
      footerLinks = {}
    } = {}
  } = userData || {};

  const downloadResume = async () => {
  try {
    const response = await axios.get(`https://portfolio-server-two-tawny.vercel.app/resume/download-resume/${email}`, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Download error", err);
  }
};


  const fullName = `${personalInfo?.firstName || ""} ${personalInfo?.lastName || ""}`;

  return (
    <div>
      <div className="bg-white max-w-[794px] mx-auto p-10 shadow-md print:shadow-none print:p-0 print:max-w-full print:mx-0 font-sans text-gray-900 text-sm leading-relaxed">
      
      {/* Header */}
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold">{fullName}</h1>
        <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm text-blue-700 print:text-black">
          {personalInfo?.email && (
            <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>
          )}
          {personalInfo?.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
          )}
          {personalInfo?.github && (
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
          )}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
        </div>
        {personalInfo?.address && (
          <p className="text-sm text-gray-700 mt-1">{personalInfo.address}</p>
        )}
      </header>

      {/* Divider */}
      <div className="border-t-2 border-gray-800 my-4"></div>

      {/* Summary */}
      {personalInfo?.summary && (
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-1">Summary</h2>
          <p>{personalInfo.summary}</p>
        </section>
      )}

      <div className="border-t-2 border-gray-800 my-4"></div>

      {/* Education */}
      <section className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Education</h2>
        {education.length ? education.map((edu, idx) => (
          <div key={idx} className="mb-2">
            <p className="font-semibold">{edu.title}</p>
            <p className="italic text-gray-700">{edu.instituteName}</p>
            <p className="text-xs text-gray-600">{edu.fromYear} - {edu.toYear} | Grade: {edu.grade}</p>
          </div>
        )) : <p className="text-sm text-gray-500">No education details available.</p>}
      </section>

      <div className="border-t-2 border-gray-800 my-4"></div>

      {/* Experience */}
      <section className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Experience</h2>
        {experiences.length ? experiences.map((exp, idx) => (
          <div key={idx} className="mb-3">
            <p className="font-semibold">
              {exp.companyUrl ? (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  {exp.role} - {exp.companyName}
                </a>
              ) : (
                `${exp.role} - ${exp.companyName}`
              )}
            </p>
            <p className="text-xs text-gray-600">{exp.duration}</p>
            <ul className="list-disc list-inside ml-4 text-sm mt-1">
              {exp.summaryPoints?.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        )) : <p className="text-sm text-gray-500">No experience details available.</p>}
      </section>

      <div className="border-t-2 border-gray-800 my-4"></div>

      {/* Projects */}
      <section className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Projects</h2>
        {projects.length ? projects.map((proj, idx) => (
          <div key={idx} className="mb-2">
            <p className="font-semibold">
              {proj.projectUrl ? (
                <a
                  href={proj.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  {proj.title}
                </a>
              ) : (
                proj.title
              )}
            </p>
            <p className="text-sm">{proj.description}</p>
            {proj.githubUrl && (
              <p className="text-xs mt-1">
                Code: <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">{proj.githubUrl}</a>
              </p>
            )}
          </div>
        )) : <p className="text-sm text-gray-500">No projects available.</p>}
      </section>

      <div className="border-t-2 border-gray-800 my-4"></div>

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            {skills.map((skill, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-200 rounded">{skill}</span>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && <div className="border-t-2 border-gray-800 my-4"></div>}

      {/* Certifications */}
      {certificates.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Certifications</h2>
          {certificates.map((cert, idx) => (
            <div key={idx} className="mb-1">
              {cert.url ? (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-700 hover:underline"
                >
                  {cert.title}
                </a>
              ) : (
                <p className="font-semibold">{cert.title}</p>
              )}
              <p className="text-xs italic text-gray-600">
                {cert.issuer} — {new Date(cert.issueDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>

       <div className="flex justify-center p-2 mb-4 print:hidden">
        <button
          onClick={downloadResume}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded shadow"
        >
          Download PDF
        </button>
      </div>

    </div>
    
  );
};

export default ResumeDisplay;
