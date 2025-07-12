import React, { useState } from "react";

// ✅ Corrected import name for EuropeEuropass
import AustraliaResume from "../ResumeThemes/AustraliaResume";
import CanadaResume from "../ResumeThemes/CanadaResume";
import ClassicResume from "../ResumeThemes/ClassisResume";
import EuropeResume from "../ResumeThemes/EuropeResume";
import GermanyResume from "../ResumeThemes/GermanyResume";
import IndiaResume from "../ResumeThemes/IndiaResume";
import ITProfessionalResume from "../ResumeThemes/ITProfessionalResume";
import JapanResume from "../ResumeThemes/JapanResume";
import ModernResume from "../ResumeThemes/ModernResume";
import ResearchResume from "../ResumeThemes/ResearchResume";
import StudentResume from "../ResumeThemes/StudentResume";
import UKResume from "../ResumeThemes/UKResume";
import USResume from "../ResumeThemes/USResume";

const ResumeDisplay = () => {
  const [selectedTheme, setSelectedTheme] = useState("classic");

  const renderResume = () => {
    switch (selectedTheme) {
      case "us":
        return <USResume />;
      case "canada":
        return <CanadaResume />;
      case "germany":
        return <GermanyResume />;
      case "europe":
        return <EuropeResume />;
      case "uk":
        return <UKResume />;
      case "research":
        return <ResearchResume />;
      case "student":
        return <StudentResume />;
      case "itProfessional":
        return <ITProfessionalResume />;
      case "australia":
        return <AustraliaResume />;
      case "modern":
        return <ModernResume />;
      case "japan":
        return <JapanResume />;
      case "india":
        return <IndiaResume />;
      case "classic":
      default:
        return <ClassicResume />;
    }
  };

  return (
    <div className="bg-white min-h-screen text-gray-900">
      {/* Resume Preview */}
      <div className="max-w-5xl mx-auto pt-10 px-4">{renderResume()}</div>

      {/* Theme Selector */}
      <div className="flex justify-center mt-10 pb-10">
        <select
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="classic">Classic (Default)</option>
          <option value="modern">Modern</option>
          <option value="research">Research</option>
          <option value="student">Student</option>
          <option value="itProfessional">IT Professional</option>
          <option value="india">India</option>
          <option value="us">US</option>
          <option value="canada">Canada</option>
          <option value="germany">Germany</option>
          <option value="europe">Europe</option>
          <option value="uk">UK</option>
          <option value="australia">Australia</option>
          <option value="japan">Japan</option>
        </select>
      </div>
    </div>
  );
};

export default ResumeDisplay;
