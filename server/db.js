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
    photo: { type: String, trim: true }, // URL to profile photo
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

  
  const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }, // Should be hashed
    resume: {
      references: {type:[referenceSchema], default:[]},
      personalInfo: personalInfoSchema,
      experiences: {type:[experienceSchema], default:[]},
      projects:{type:[projectSchema], default:[]} ,
      certificates :{type:[certificateSchema], default:[]},
      education: {type:[educationSchema], default:[]},
      footerLinks: FooterLinksSchema,
      skills:[{type:String, trim:true}]
    },
  });

const User = mongoose.model('user', UserSchema);

const Project = mongoose.model('project', projectSchema);
const Experience = mongoose.model('experience', experienceSchema);
const Certificate = mongoose.model('certificate', certificateSchema);
const Education = mongoose.model('education', educationSchema);
const PersonalInfo = mongoose.model('personalInfo', personalInfoSchema);

module.exports = {User,Project, Experience, Certificate, Education, PersonalInfo};