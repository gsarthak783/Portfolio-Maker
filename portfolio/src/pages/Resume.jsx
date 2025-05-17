import React from "react";
import { useSelector } from "react-redux";

const ResumeDisplay = () => {
  const { userData } = useSelector((state) => state.userState);
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
  console.log(userData);

  const fullName = `${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''}`;

  return (
    <div className="max-w-3xl mx-auto bg-white p-10 shadow-md print:shadow-none print:p-0 print:max-w-full print:mx-0 font-sans text-gray-900">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold tracking-wide">{fullName}</h1>
        <p className="mt-1 text-sm text-gray-700">
          {personalInfo?.address || ""}
        </p>
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-blue-700 print:text-black">
          {personalInfo?.email && (
            <a href={`mailto:${personalInfo.email}`} className="hover:underline">
              {personalInfo.email}
            </a>
          )}
          {personalInfo?.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          )}
          {personalInfo?.github && (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          )}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
        </div>
      </header>

      {/* Divider */}
      <div className="w-full mx-auto my-6 h-0.5 bg-gray-800 rounded"></div>

      {/* Summary */}
      {personalInfo?.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-3">
            Summary
          </h2>
          <p className="leading-relaxed text-gray-800">{personalInfo.summary}</p>
        </section>
      )}

      {/* Divider */}
      <div className="w-full mx-auto my-6 h-0.5 bg-gray-800 rounded"></div>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-4">
          Education
        </h2>
        {education?.length > 0 ? (
          education.map((edu, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="text-lg font-semibold">{edu.title}</h3>
              <p className="italic text-gray-700">{edu.instituteName}</p>
              <p className="text-sm text-gray-600">
                {edu.fromYear} - {edu.toYear} | Grade: {edu.grade}
              </p>
            </div>
          ))
        ) : (
          <p>No education details available.</p>
        )}
      </section>

      {/* Divider */}
      <div className="w-full mx-auto my-6 h-0.5 bg-gray-800 rounded"></div>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-4">
          Experience
        </h2>
        {experiences?.length > 0 ? (
          experiences.map((exp, idx) => (
            <div key={idx} className="mb-5">
              <h3 className="text-lg font-semibold">{exp.role}</h3>
              <p className="italic text-gray-700">{exp.companyName}</p>
              <p className="text-sm text-gray-600">{exp.duration}</p>
              <ul className="list-disc list-inside mt-2 text-gray-800">
                {exp.summaryPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No experience details available.</p>
        )}
      </section>

      {/* Divider */}
      <div className="w-full mx-auto my-6 h-0.5 bg-gray-800 rounded"></div>

      {/* Projects */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-4">
          Projects
        </h2>
        {projects?.length > 0 ? (
          projects.map((proj, idx) => (
            <div key={idx} className="mb-5">
              <h3 className="text-lg font-semibold">{proj.title}</h3>
              <p className="text-gray-800">{proj.description}</p>
            </div>
          ))
        ) : (
          <p>No projects available.</p>
        )}
      </section>

      {/* Divider */}
      <div className="w-full mx-auto my-6 h-0.5 bg-gray-800 rounded"></div>

      {/* Skills */}
      {skills?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-4">
            Skills
          </h2>
          <ul className="flex flex-wrap gap-3 text-gray-800">
            {skills.map((skill, idx) => (
              <li
                key={idx}
                className="border border-gray-600 px-3 py-1 rounded text-sm font-medium"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Divider */}
      <div className="w-full mx-auto my-6 h-0.5 bg-gray-800 rounded"></div>

      {/* Certifications */}
      {certificates?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-4">
            Certifications
          </h2>
          {certificates.map((cert, idx) => (
            <div key={idx} className="mb-3">
              <p className="font-semibold">{cert.title}</p>
              <p className="italic text-gray-700">
                {cert.issuer} — {new Date(cert.issueDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ResumeDisplay;
