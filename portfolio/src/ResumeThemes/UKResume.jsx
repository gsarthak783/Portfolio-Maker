import React from "react";
import { useSelector } from "react-redux";

const UKResume = () => {
  const { userData } = useSelector((state) => state.userState);
  const {
    resume: {
      personalInfo,
      education = [],
      experiences = [],
      projects = [],
      certificates = [],
      skills = [],
      footerLinks = {},
    } = {},
  } = userData || {};

  const fullName = `${personalInfo?.firstName || ""} ${personalInfo?.lastName || ""}`;

  return (
    <div
      className="max-w-[794px] mx-auto p-10 font-serif text-sm text-gray-900 leading-relaxed bg-white border"
      style={{
        fontFamily: "Georgia, serif",
        backgroundColor: "#ffffff",
        color: "#2c2c2c",
      }}
    >
      {/* Header */}
      <header className="border-b border-gray-500 pb-3 mb-6">
        <h1 className="text-3xl font-bold text-center uppercase">{fullName}</h1>
        <p className="text-center text-sm mt-1">
          {personalInfo?.email && <span className="mr-4">{personalInfo.email}</span>}
          {footerLinks?.linkedin && (
            <a
              href={footerLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4 underline"
            >
              LinkedIn
            </a>
          )}
          {footerLinks?.github && (
            <a
              href={footerLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              GitHub
            </a>
          )}
        </p>
      </header>

      {/* Summary */}
      {personalInfo?.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 mb-2 uppercase">Profile</h2>
          <p>{personalInfo.summary}</p>
        </section>
      )}

      {/* Work History */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 mb-2 uppercase">Work History</h2>
          {experiences.map((exp, idx) => (
            <div key={idx} className="mb-3">
              <p className="font-semibold">
                {exp.role} - {exp.companyName}
              </p>
              <p className="text-xs text-gray-600">{exp.duration}</p>
              <ul className="list-disc list-inside ml-4 text-sm mt-1">
                {exp.summaryPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 mb-2 uppercase">Education</h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-semibold">{edu.title}</p>
              <p className="italic">{edu.instituteName}</p>
              <p className="text-xs text-gray-600">
                {edu.fromYear} - {edu.toYear} | Grade: {edu.grade}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 mb-2 uppercase">Skills</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            {skills.map((skill, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-200 rounded">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 mb-2 uppercase">Projects</h2>
          {projects.map((proj, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-semibold">
                {proj.title}
              </p>
              <p className="text-sm">{proj.description}</p>
              {proj.githubUrl && (
                <p className="text-xs mt-1">
                  Code: <a href={proj.githubUrl} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{proj.githubUrl}</a>
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certificates.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 mb-2 uppercase">Certifications</h2>
          {certificates.map((cert, idx) => (
            <div key={idx} className="mb-1">
              <p className="font-semibold">{cert.title}</p>
              <p className="text-xs italic text-gray-600">
                {cert.issuer} — {new Date(cert.issueDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default UKResume;
