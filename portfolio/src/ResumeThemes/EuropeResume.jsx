import React from "react";
import { useSelector } from "react-redux";

const EuropeResume = () => {
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
      references = [],
      languages = [],
    } = {},
  } = userData || {};

  const fullName = `${personalInfo?.firstName || ""} ${personalInfo?.lastName || ""}`;

  return (
    <div
      className="max-w-[794px] mx-auto p-10 text-sm text-gray-900 font-sans border"
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        backgroundColor: "#ffffff",
        color: "#003399",
      }}
    >
      {/* Header */}
      <header className="border-b-4 border-blue-900 pb-3 mb-5">
        <h1 className="text-4xl font-bold text-blue-900">{fullName}</h1>
        <div className="mt-2 text-blue-800 space-x-4 text-sm">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.contactNumber && <span>{personalInfo.contactNumber}</span>}
          {personalInfo?.address && <span>{personalInfo.address}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo?.summary && (
        <section className="mb-6">
          <h2 className="font-bold text-base border-b-2 border-blue-900 mb-2">Personal Profile</h2>
          <p>{personalInfo.summary}</p>
        </section>
      )}

      {/* Work Experience - Content in Black */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold text-base border-b-2 border-blue-900 mb-2 text-blue-900">Work Experience</h2>
          {experiences.map((exp, idx) => (
            <div key={idx} className="mb-3 text-black">
              <p className="font-semibold">{exp.role} - {exp.companyName}</p>
              <p className="text-xs text-gray-600">{exp.duration}</p>
              <ul className="list-disc ml-5 mt-1 text-sm text-gray-800">
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
          <h2 className="font-bold text-base border-b-2 border-blue-900 mb-2">Education and Training</h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-semibold">{edu.title}</p>
              <p className="italic">{edu.instituteName}</p>
              <p className="text-xs text-gray-600">{edu.fromYear} - {edu.toYear} | Grade: {edu.grade}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold text-base border-b-2 border-blue-900 mb-2">Personal Skills</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            {skills.map((skill, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-200 rounded">{skill}</span>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold text-base border-b-2 border-blue-900 mb-2">Languages</h2>
          <ul className="list-disc ml-5 text-sm text-gray-800">
            {languages.map((lang, idx) => (
              <li key={idx}>{lang.name} - {lang.proficiency}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Certificates */}
      {certificates.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold text-base border-b-2 border-blue-900 mb-2">Certificates</h2>
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

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold text-base border-b-2 border-blue-900 mb-2">Projects</h2>
          {projects.map((proj, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-semibold">{proj.title}</p>
              {proj.description && <p>{proj.description}</p>}
              {proj.githubUrl && (
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 text-xs hover:underline"
                >
                  {proj.githubUrl}
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {/* References */}
      {references.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold text-base border-b-2 border-blue-900 mb-2">References</h2>
          {references.map((ref, idx) => (
            <div key={idx}>
              <p className="font-semibold">{ref.name} - {ref.designation}</p>
              <p className="text-sm text-gray-700">{ref.organization} | {ref.relation}</p>
              <p className="text-xs text-gray-500">Contact: {ref.contact}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default EuropeResume;
