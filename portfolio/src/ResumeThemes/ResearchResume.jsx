import React from "react";
import { useSelector } from "react-redux";

const ResearchResume = () => {
  const { userData } = useSelector((state) => state.userState);
  const {
    resume: {
      personalInfo,
      education = [],
      experiences = [],
      projects = [],
      skills = [],
      certificates = [],
      footerLinks = {},
      references = [],
      awards = [],
      blogs = []
    } = {}
  } = userData || {};

  const fullName = `${personalInfo?.firstName || ""} ${personalInfo?.lastName || ""}`;

  return (
    <div className="bg-white max-w-[794px] mx-auto p-10 text-sm leading-relaxed border" style={{ fontFamily: "Georgia, serif" }}>
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-black">{fullName}</h1>
        <div className="flex flex-wrap justify-center gap-3 mt-2 text-blue-900">
          {personalInfo?.email && <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>}
          {footerLinks?.linkedin && <a href={footerLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>}
          {footerLinks?.github && <a href={footerLinks.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>}
        </div>
      </header>

      {personalInfo?.summary && (
        <section className="mb-5">
          <h2 className="text-xl font-semibold border-b border-gray-400 pb-1 mb-2">Research Summary</h2>
          <p>{personalInfo.summary}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xl font-semibold border-b border-gray-400 pb-1 mb-2">Academic Experience</h2>
          {experiences.map((exp, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-semibold text-black">{exp.role} - {exp.companyName}</p>
              <p className="text-xs text-gray-600">{exp.duration}</p>
              <ul className="list-disc ml-6 text-sm">
                {exp.summaryPoints.map((point, i) => <li key={i}>{point}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xl font-semibold border-b border-gray-400 pb-1 mb-2">Education</h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-semibold">{edu.title}</p>
              <p className="italic text-gray-700">{edu.instituteName}</p>
              <p className="text-xs text-gray-600">{edu.fromYear} - {edu.toYear} | Grade: {edu.grade}</p>
            </div>
          ))}
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xl font-semibold border-b border-gray-400 pb-1 mb-2">Research Projects</h2>
          {projects.map((proj, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-semibold">
                {proj.projectUrl ? (
                  <a href={proj.projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                    {proj.title}
                  </a>
                ) : proj.title}
              </p>
              <p>{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xl font-semibold border-b border-gray-400 pb-1 mb-2">Key Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => <span key={idx} className="bg-gray-200 px-2 py-1 rounded text-sm">{skill}</span>)}
          </div>
        </section>
      )}

      {certificates.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xl font-semibold border-b border-gray-400 pb-1 mb-2">Certifications</h2>
          {certificates.map((cert, idx) => (
            <div key={idx} className="mb-1">
              <p className="font-semibold">{cert.title}</p>
              <p className="text-xs text-gray-600 italic">{cert.issuer} — {new Date(cert.issueDate).toLocaleDateString()}</p>
            </div>
          ))}
        </section>
      )}

      {awards.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xl font-semibold border-b border-gray-400 pb-1 mb-2">Awards</h2>
          {awards.map((award, idx) => (
            <div key={idx} className="mb-1">
              <p className="font-semibold">{award.title}</p>
              {award.year && <p className="text-sm">Year: {award.year}</p>}
              {award.description && <p className="text-sm italic">{award.description}</p>}
            </div>
          ))}
        </section>
      )}

      {references.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xl font-semibold border-b border-gray-400 pb-1 mb-2">References</h2>
          {references.map((ref, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-semibold">{ref.name}</p>
              <p className="text-sm italic">{ref.designation} at {ref.organization}</p>
              <p className="text-sm">Relation: {ref.relation}</p>
              <p className="text-sm">Contact: {ref.contact}</p>
            </div>
          ))}
        </section>
      )}

      {blogs.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xl font-semibold border-b border-gray-400 pb-1 mb-2">Publications</h2>
          {blogs.map((blog, idx) => (
            <div key={idx} className="mb-1">
              <a href={blog.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-semibold">
                {blog.title}
              </a>
              {blog.summary && <p className="text-sm italic">{blog.summary}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ResearchResume;
