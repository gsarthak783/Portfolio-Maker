import React from "react";
import { useSelector } from "react-redux";

const IndiaResume = () => {
  const { userData } = useSelector((state) => state.userState);
  const {
    resume: {
      personalInfo = {},
      education = [],
      experiences = [],
      projects = [],
      certificates = [],
      skills = [],
      footerLinks = {}
    } = {}
  } = userData || {};

  const fullName = `${personalInfo?.firstName || ""} ${personalInfo?.lastName || ""}`;

  return (
    <div
      className="bg-white max-w-[794px] mx-auto p-8 text-gray-800 text-sm leading-relaxed border"
      style={{
        fontFamily: "Georgia, serif",
        color: "#1c1c1c",
        backgroundColor: "#ffffff",
      }}
    >
      <header className="text-left mb-6">
        <h1 className="text-4xl font-bold" style={{ color: "#d97706" }}>{fullName}</h1>
        <div className="mt-2 space-y-1 text-sm text-gray-600">
          {personalInfo?.email && <p>Email: {personalInfo.email}</p>}
          {footerLinks?.linkedin && <p>LinkedIn: <a href={footerLinks.linkedin} className="text-blue-700 underline">{footerLinks.linkedin}</a></p>}
          {footerLinks?.github && <p>GitHub: <a href={footerLinks.github} className="text-blue-700 underline">{footerLinks.github}</a></p>}
          {personalInfo?.contactNumber && <p>Phone: {personalInfo.contactNumber}</p>}
        </div>
        {personalInfo?.address && <p className="text-sm text-gray-600 mt-1">{personalInfo.address}</p>}
      </header>

      {personalInfo?.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-1" style={{ color: "#d97706" }}>Summary</h2>
          <p>{personalInfo.summary}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2" style={{ color: "#d97706" }}>Experience</h2>
          {experiences.map((exp, idx) => (
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
                {exp.summaryPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2" style={{ color: "#d97706" }}>Projects</h2>
          {projects.map((proj, idx) => (
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
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2" style={{ color: "#d97706" }}>Education</h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-semibold">{edu.title}</p>
              <p className="italic text-gray-700">{edu.instituteName}</p>
              <p className="text-xs text-gray-600">{edu.fromYear} - {edu.toYear} | Grade: {edu.grade}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2" style={{ color: "#d97706" }}>Skills</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            {skills.map((skill, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">{skill}</span>
            ))}
          </div>
        </section>
      )}

      {certificates.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2" style={{ color: "#d97706" }}>Certifications</h2>
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
  );
};

export default IndiaResume;
