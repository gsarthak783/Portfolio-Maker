import React from "react";
import { useSelector } from "react-redux";

const AustraliaResume = () => {
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
      className="bg-white max-w-[794px] mx-auto p-10 text-gray-900 text-sm leading-relaxed border"
      style={{
        fontFamily: "Georgia, Cambria, Times New Roman, serif",
        backgroundColor: "#ffffff",
        color: "#1f2937",
      }}
    >
      {/* Header */}
      <header className="text-center mb-6 border-b pb-4 border-gray-400">
        <h1 className="text-3xl font-bold text-green-800 uppercase tracking-widest">{fullName}</h1>
        <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm text-green-800">
          {personalInfo?.email && (
            <a href={`mailto:${personalInfo.email}`} className="hover:underline">
              {personalInfo.email}
            </a>
          )}
          {footerLinks?.linkedin && (
            <a
              href={footerLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          )}
          {footerLinks?.github && (
            <a
              href={footerLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          )}
          {personalInfo?.contactNumber && <span>{personalInfo.contactNumber}</span>}
        </div>
        {personalInfo?.address && (
          <p className="text-sm text-gray-600 mt-1">{personalInfo.address}</p>
        )}
      </header>

      {/* Summary */}
      {personalInfo?.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-green-800">Professional Profile</h2>
          <p>{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-green-800">Employment History</h2>
          {experiences.map((exp, idx) => (
            <div key={idx} className="mb-3">
              <p className="font-semibold">
                {exp.companyUrl ? (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-800 hover:underline"
                  >
                    {exp.role} - {exp.companyName}
                  </a>
                ) : (
                  `${exp.role} - ${exp.companyName}`
                )}
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
          <h2 className="text-lg font-semibold mb-2 text-green-800">Education</h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-semibold">{edu.title}</p>
              <p className="italic text-gray-700">{edu.instituteName}</p>
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
          <h2 className="text-lg font-semibold mb-2 text-green-800">Key Competencies</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            {skills.map((skill, idx) => (
              <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 border border-green-800 rounded">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-green-800">Projects</h2>
          {projects.map((proj, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-semibold">
                {proj.projectUrl ? (
                  <a
                    href={proj.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-800 hover:underline"
                  >
                    {proj.title}
                  </a>
                ) : (
                  proj.title
                )}
              </p>
              {proj.description && <p className="text-sm">{proj.description}</p>}
              {proj.githubUrl && (
                <p className="text-xs mt-1">
                  Code:{" "}
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-800 hover:underline"
                  >
                    {proj.githubUrl}
                  </a>
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certificates.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-green-800">Certifications</h2>
          {certificates.map((cert, idx) => (
            <div key={idx} className="mb-2">
              {cert.url ? (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-green-800 hover:underline"
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
  );
};

export default AustraliaResume;
