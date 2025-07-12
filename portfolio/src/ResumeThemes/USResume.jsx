import React from "react";
import { useSelector } from "react-redux";

const USResume = () => {
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
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        color: "#1f2937",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: "#2563eb" }}>{fullName}</h1>
        <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm text-blue-700">
          {personalInfo?.email && <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>}
          {footerLinks?.linkedin && <a href={footerLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>}
          {footerLinks?.github && <a href={footerLinks.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>}
          {personalInfo?.contactNumber && <span>{personalInfo.contactNumber}</span>}
        </div>
        {personalInfo?.address && <p className="text-sm text-gray-700 mt-1">{personalInfo.address}</p>}
      </header>

      {/* Summary */}
      {personalInfo?.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-1" style={{ color: "#2563eb" }}>Summary</h2>
          <p>{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experiences?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2" style={{ color: "#2563eb" }}>Experience</h2>
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

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2" style={{ color: "#2563eb" }}>Education</h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-semibold">{edu.title}</p>
              <p className="italic text-gray-700">{edu.instituteName}</p>
              <p className="text-xs text-gray-600">{edu.fromYear} - {edu.toYear} | Grade: {edu.grade}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2" style={{ color: "#2563eb" }}>Skills</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            {skills.map((skill, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-200 rounded">{skill}</span>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      {(personalInfo?.email || personalInfo?.contactNumber || personalInfo?.address) && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold mb-2" style={{ color: "#2563eb" }}>Contact</h2>
          <ul className="text-sm">
            {personalInfo.email && <li>Email: {personalInfo.email}</li>}
            {personalInfo.contactNumber && <li>Phone: {personalInfo.contactNumber}</li>}
            {personalInfo.address && <li>Address: {personalInfo.address}</li>}
          </ul>
        </section>
      )}
    </div>
  );
};

export default USResume;
