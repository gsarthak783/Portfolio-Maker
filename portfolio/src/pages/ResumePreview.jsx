import resumeThemes from "../constants/resumeThemes";
import React from "react";

const ResumeSection = ({ type, data }) => {
  switch (type) {
    case "summary":
    case "personalStatement":
    case "resumeSummary":
    case "intro":
      return (
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-1">Summary</h2>
          <p>{data}</p>
        </section>
      );

    case "experience":
    case "education":
    case "volunteer":
      return (
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-1 capitalize">{type}</h2>
          {data?.map((item, index) => (
            <div key={index} className="mb-2">
              <p className="font-medium">{item.title || item.degree || item.role}</p>
              <p className="text-sm text-gray-600">
                {item.organization || item.institution} • {item.duration}
              </p>
              <p>{item.description}</p>
            </div>
          ))}
        </section>
      );

    case "skills":
    case "languages":
      return (
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-1 capitalize">{type}</h2>
          <ul className="list-disc ml-5">
            {data?.map((skill, index) => (
              <li key={index}>
                {typeof skill === "string" ? skill : `${skill.name} - ${skill.level}`}
              </li>
            ))}
          </ul>
        </section>
      );

    case "contact":
      return (
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-1">Contact</h2>
          <p>Email: {data.email}</p>
          <p>Phone: {data.phone}</p>
          <p>Address: {data.address}</p>
        </section>
      );

    case "references":
      return (
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-1">References</h2>
          {data?.map((ref, index) => (
            <div key={index}>
              <p className="font-medium">{ref.name}</p>
              <p className="text-sm text-gray-600">
                {ref.designation} at {ref.organization}
              </p>
              <p>{ref.contact}</p>
            </div>
          ))}
        </section>
      );

    case "photo":
      return (
        <div className="mb-4 flex justify-center">
          <img
            src={data}
            alt="Profile"
            className="rounded-full w-24 h-24 object-cover border"
          />
        </div>
      );

    case "personalInfo":
    case "personalData":
      return (
        <div className="mb-4">
          <h1 className="text-2xl font-bold">{data.name}</h1>
          <p>{data.title}</p>
        </div>
      );

    default:
      return null;
  }
};

const ResumePreview = ({ selectedThemeKey = "us", userData }) => {
    console.log("userData", userData);
  const theme = resumeThemes[selectedThemeKey];
  console.log("theme", theme.layout.showPhoto);

  return (
    <div
      className="shadow-md mx-auto p-8"
      style={{
        backgroundColor: theme?.colors?.background,
        color: theme.colors.text,
        fontFamily: theme.fonts.body,
        width: "210mm",
        minHeight: "297mm",
      }}
    >
        <h2>Resume</h2>
      {theme.layout.showPhoto && userData.personalInfo?.photo && (
        <ResumeSection type="photo" data={userData.personalInfo.photo} />
      )}

      {theme.layout.sectionOrder.map((section) => {
        const sectionKey = section === "photo" ? "photo" : section;
        const sectionData = userData[sectionKey] || userData.personalInfo?.[sectionKey];
        if (!sectionData) return null;

        return (
          <ResumeSection key={section} type={section} data={sectionData} />
        );
      })}
    </div>
  );
};

export default ResumePreview;
