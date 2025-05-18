const resumeThemes = {
  us: {
    name: "US Resume",
    description: "Clean, concise, 1-page, achievement-focused, minimal colors",
    colors: {
      primary: "#2563eb",  // blue
      secondary: "#64748b", // gray
      background: "#ffffff",
      text: "#1f2937",
      accent: "#3b82f6",
    },
    fonts: {
      body: "ui-sans-serif, system-ui, sans-serif",
      heading: "ui-sans-serif, system-ui, sans-serif",
    },
    layout: {
      maxPages: 1,
      sectionOrder: [
        "summary",
        "experience",
        "education",
        "skills",
        "contact",
      ],
      showPhoto: false,
      showReferences: false,
      emphasizeAchievements: true,
    },
    extra: {
      format: "reverse-chronological",
      ATSFriendly: true,
      highlightResults: true,
    }
  },

  uk: {
    name: "UK CV",
    description: "2-page format, formal, includes personal statement and references",
    colors: {
      primary: "#1e3a8a", // dark blue
      secondary: "#4b5563", // gray
      background: "#f9fafb",
      text: "#111827",
      accent: "#2563eb",
    },
    fonts: {
      body: "Georgia, serif",
      heading: "Georgia, serif",
    },
    layout: {
      maxPages: 2,
      sectionOrder: [
        "personalStatement",
        "experience",
        "education",
        "skills",
        "interests",
        "references",
        "contact",
      ],
      showPhoto: false,
      showReferences: true,
      emphasizeAchievements: true,
    },
    extra: {
      format: "chronological",
      formalLanguage: true,
    }
  },

  germany: {
    name: "German Lebenslauf",
    description: "Strict, formal, includes photo and personal data, black & white",
    colors: {
      primary: "#000000",
      secondary: "#4b5563",
      background: "#ffffff",
      text: "#111827",
      accent: "#6b7280",
    },
    fonts: {
      body: "Times New Roman, serif",
      heading: "Times New Roman, serif",
    },
    layout: {
      maxPages: 2,
      sectionOrder: [
        "personalData",
        "photo",
        "experience",
        "education",
        "skills",
        "languages",
        "contact",
      ],
      showPhoto: true,
      showReferences: false,
      emphasizeAchievements: false,
      includeSignature: true,
    },
    extra: {
      format: "strict-chronological",
      formalLanguage: true,
    }
  },

  europe: {
    name: "European Union (Europass)",
    description: "Structured, blue-white theme, language skills emphasized",
    colors: {
      primary: "#0073c8", // Europass blue
      secondary: "#4b5563",
      background: "#ffffff",
      text: "#1f2937",
      accent: "#60a5fa",
    },
    fonts: {
      body: "Arial, sans-serif",
      heading: "Arial, sans-serif",
    },
    layout: {
      maxPages: 2,
      sectionOrder: [
        "personalInfo",
        "photo",
        "experience",
        "education",
        "skills",
        "languages",
        "contact",
      ],
      showPhoto: true,
      showReferences: false,
      emphasizeLanguages: true,
    },
    extra: {
      format: "structured",
      formalLanguage: true,
    }
  },

  canada: {
    name: "Canadian Resume",
    description: "Flexible format, 1-2 pages, summary and volunteer work included",
    colors: {
      primary: "#0072c6",
      secondary: "#585858",
      background: "#ffffff",
      text: "#222222",
      accent: "#00a4ef",
    },
    fonts: {
      body: "Verdana, sans-serif",
      heading: "Verdana, sans-serif",
    },
    layout: {
      maxPages: 2,
      sectionOrder: [
        "summary",
        "experience",
        "education",
        "volunteer",
        "skills",
        "contact",
      ],
      showPhoto: false,
      showReferences: false,
      emphasizeAchievements: true,
      includeVolunteer: true,
    },
    extra: {
      format: "flexible",
      ATSFriendly: true,
    }
  },

  australia: {
    name: "Australian Resume",
    description: "Professional, 2 pages max, achievement focused, no photo",
    colors: {
      primary: "#0c4a6e",  // dark cyan-blue
      secondary: "#334155",
      background: "#ffffff",
      text: "#1e293b",
      accent: "#2563eb",
    },
    fonts: {
      body: "Tahoma, sans-serif",
      heading: "Tahoma, sans-serif",
    },
    layout: {
      maxPages: 2,
      sectionOrder: [
        "summary",
        "experience",
        "education",
        "skills",
        "contact",
      ],
      showPhoto: false,
      showReferences: false,
      emphasizeAchievements: true,
    },
    extra: {
      format: "achievement-focused",
      ATSFriendly: true,
    }
  },
    india: {
        name: "Indian Resume",
        description: "Traditional, 2 pages, includes personal details and photo",
        colors: {
        primary: "#ff5722", // deep orange
        secondary: "#4b5563",
        background: "#ffffff",
        text: "#111827",
        accent: "#ff9800",
        },
        fonts: {
        body: "Arial, sans-serif",
        heading: "Arial, sans-serif",
        },
        layout: {
        maxPages: 2,
        sectionOrder: [
            "personalDetails",
            "photo",
            "experience",
            "education",
            "skills",
            "languages",
            "contact",
        ],
        showPhoto: true,
        showReferences: false,
        emphasizeAchievements: false,
        },
        extra: {
        format: "traditional",
        formalLanguage: true,
        }
    },

    itProfessional: {
    name: "IT Professional",
    description: "Modern, tech-focused, skill-emphasis, suitable for software engineers and developers",
    colors: {
      primary: "#14b8a6", // light teal
      secondary: "#94a3b8", // soft gray-blue
      background: "#ffffff",
      text: "#0f172a",
      accent: "#2dd4bf",
    },
    fonts: {
      body: "Inter, sans-serif",
      heading: "Inter, sans-serif",
    },
    layout: {
      maxPages: 2,
      sectionOrder: [
        "summary",
        "skills",
        "experience",
        "projects",
        "education",
        "certifications",
        "contact",
      ],
      showPhoto: false,
      showReferences: false,
      emphasizeAchievements: true,
    },
    extra: {
      format: "reverse-chronological",
      ATSFriendly: true,
      includeTechStack: true,
    }
  },

  research: {
    name: "Research CV",
    description: "Detailed, publication-focused, ideal for academic/research roles",
    colors: {
      primary: "#6366f1", // soft indigo
      secondary: "#cbd5e1", // light gray
      background: "#ffffff",
      text: "#1e293b",
      accent: "#a5b4fc",
    },
    fonts: {
      body: "Cambria, serif",
      heading: "Cambria, serif",
    },
    layout: {
      maxPages: 3,
      sectionOrder: [
        "personalStatement",
        "education",
        "experience",
        "publications",
        "research",
        "skills",
        "references",
        "contact",
      ],
      showPhoto: false,
      showReferences: true,
      emphasizeAchievements: false,
    },
    extra: {
      format: "chronological",
      formalLanguage: true,
      includePublications: true,
    }
  },

  student: {
    name: "Student Resume",
    description: "Entry-level, simple and clear, emphasizes education, projects, and internships",
    colors: {
      primary: "#3b82f6", // light blue
      secondary: "#e2e8f0", // very light gray
      background: "#ffffff",
      text: "#1f2937",
      accent: "#93c5fd",
    },
    fonts: {
      body: "Arial, sans-serif",
      heading: "Arial, sans-serif",
    },
    layout: {
      maxPages: 1,
      sectionOrder: [
        "summary",
        "education",
        "projects",
        "internships",
        "skills",
        "contact",
      ],
      showPhoto: false,
      showReferences: false,
      emphasizeAchievements: false,
    },
    extra: {
      format: "entry-level",
      ATSFriendly: true,
      highlightAcademics: true,
    }
  }
};

export default resumeThemes;