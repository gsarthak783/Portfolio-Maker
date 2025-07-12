const mongoose = require('mongoose')


const url = process.env.DB_URL
mongoose.connect(url)
.then(()=> console.log("DB Connect Success"))
.catch(err => console.log("Error in DB Connect", err))



const experienceSchema = new mongoose.Schema({
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    companyLogo: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (url) {
          return /^(ftp|http|https):\/\/[^ "]+$/.test(url);
        },
        message: 'Invalid URL format',
      },
    },
    companyUrl: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (url) {
          return /^(ftp|http|https):\/\/[^ "]+$/.test(url);
        },
        message: 'Invalid URL format',
      },
    },
    summaryPoints: {
      type: [String],
      required: true,
      validate: {
        validator: function (points) {
          return points.length > 0;
        },
        message: 'At least one summary point is required',
      },
    },
  });

  const projectSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    projectUrl: { type: String, trim: true },
    githubUrl: { type: String, trim: true },
    technologies: [{ type: String, trim: true }], // List of tech used
  })

  const certificateSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      issuer: {
        type: String,
        required: true,
        trim: true,
      },
      issueDate: {
        type: Date,
        required: true,
      },
      url: {
        type: String,
        required: false, // Optional, as not all certifications may have a URL
        trim: true,
      },
      tags: {
        type: [String], // Array of strings for multiple tags
        default: [],    // Default to an empty array
      },
    },
  );

  const educationSchema = new mongoose.Schema({
    
    title: {
      type: String,
      required: true,
    },
    instituteName: {
      type: String,
      required: true,
    },
    fromYear: {
      type: String, 
      required: true,
    },
    toYear: {
      type: String, 
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: false,
    },
    marksheetUrl: {
      type: String,
      required: false,
    },
  });
  
  const FooterLinksSchema = new mongoose.Schema({
    linkedin: { type: String, trim: true },
    github: { type: String, trim: true },
    twitter: { type: String, trim: true },
    email: { type: String, trim: true },
    resume: { type: String, trim: true },
    website: { type: String, trim: true }
  });

  const personalInfoSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    gender: { type: String, required: true, trim: true },
    contactNumber: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    address: { type: String, trim: true },
    summary: { type: String, required: true, trim: true },
    intro: { type: String,  trim: true },
    photoUrl: { type: String, trim: true }, // URL to profile photo
    languages: [{
    name: { type: String, trim: true },
    proficiency: { type: String, trim: true } // e.g., Native, Fluent, Intermediate
  }]
  });

  const referenceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  designation: { type: String, trim: true }, // e.g., Senior Software Engineer
  relation: { type: String, required: true, trim: true }, // e.g., Former Manager, Mentor
  contact: { type: String, required: true, trim: true }, // phone or email
  organization: { type: String, trim: true }, // optional, e.g., Google Inc.
});

  const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  quote: { type: String, required: true, trim: true },
  company: { type: String, trim: true }
});

// Awards
const awardSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  year: { type: String, trim: true },
  description: { type: String, trim: true }
});

// Blog Posts
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  url: { type: String, required: true, trim: true },
  summary: { type: String, trim: true }
});

// Activity Logs
const activityLogSchema = new mongoose.Schema({
  action: { type: String, required: true, trim: true },
  timestamp: { type: Date, default: Date.now }
});

  
  const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }, // Should be hashed
    isVerified: {type: Boolean, default:false},
    uid: { type: String, trim: true },

    resume: {
      references: {type:[referenceSchema], default:[]},
      personalInfo: personalInfoSchema,
      experiences: {type:[experienceSchema], default:[]},
      projects:{type:[projectSchema], default:[]} ,
      certificates :{type:[certificateSchema], default:[]},
      education: {type:[educationSchema], default:[]},
      footerLinks: FooterLinksSchema,
      skills:[{type:String, trim:true}],
      testimonials: { type: [testimonialSchema], default: [] },
      hobbies: { type: [String], default: [] },
      awards: { type: [awardSchema], default: [] },
      blogs: { type: [blogSchema], default: [] },
      resumeTheme: { type: String, default: 'classic' },
    },
      
    portfolioTheme: { type: String, default: 'light' },

        // 1. Basic Meta Info
      lastLoginAt: { type: Date },
      role: { type: String, default: 'user' },
      status: { type: String, default: 'active' }, // active, suspended, deleted
      loginCount: { type: Number, default: 0 },
      provider: { type: String, trim: true },

      // 2. Portfolio / Site Customization
      theme: { type: String, default: 'default' },
      isPublic: { type: Boolean, default: true },

      // 3. Tracking & Analytics
      viewsCount: { type: Number, default: 0 },
      downloadsCount: { type: Number, default: 0 },
      lastViewedAt: { type: Date },
      activityLogs: { type: [activityLogSchema], default: [] },

      // 4. Security / Verification
      emailVerifiedAt: { type: Date },
      phoneNumber: { type: String, trim: true },
      twoFactorEnabled: { type: Boolean, default: false },
      resetPasswordToken: { type: String, trim: true },

      // 5. Professional Details Expansion
      openToWork: { type: Boolean, default: false },
      expectedSalary: { type: String, trim: true },
      preferredJobLocation: { type: [String], default: [] },
      languagesProficiency: { type: [String], default: [] },

      // 6. System Management
       deletedAt: { type: Date, default: null },
       isBanned: { type: Boolean, default: false },
       notes: { type: String, trim: true },
       createdBy: { type: String, default: 'user', enum: ['user', 'admin'] },
       updatedBy: { type: String, default: 'user', enum: ['user', 'admin'] },

  },{ timestamps: true });

const User = mongoose.model('user', UserSchema);

const Project = mongoose.model('project', projectSchema);
const Experience = mongoose.model('experience', experienceSchema);
const Certificate = mongoose.model('certificate', certificateSchema);
const Education = mongoose.model('education', educationSchema);
const PersonalInfo = mongoose.model('personalInfo', personalInfoSchema);

module.exports = {User,Project, Experience, Certificate, Education, PersonalInfo};