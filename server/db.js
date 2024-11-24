const mongoose = require('mongoose')


const url = process.env.DB_URL
mongoose.connect(url)
.then(()=> console.log("DB Connect Success"))
.catch(err => console.log("Error in DB Connect", err))

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  projectUrl: { type: String, trim: true },
  imageUrl: { type: String, trim: true },
  githubUrl: { type: String, trim: true },
  technologies: [{ type: String, trim: true }], // List of tech used
})

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

  const ExperienceSchema = new mongoose.Schema({
    companyName: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    companyLogo: { type: String, trim: true },
    companyUrl: { type: String, trim: true },
    summaryPoints: [{ type: String, trim: true }],
  });
  
  const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    projectUrl: { type: String, trim: true },
    technologies: [{ type: String, trim: true }], // List of tech used
  });
  
  const FooterLinksSchema = new mongoose.Schema({
    linkedin: { type: String, trim: true },
    github: { type: String, trim: true },
    twitter: { type: String, trim: true },
    portfolio: { type: String, trim: true },
  });
  
  const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }, // Should be hashed
    profilePicture: { type: String, trim: true },
    resume: {
      about: { type: String, trim: true }, // Short bio or description
      experiences: [ExperienceSchema],
      projects: [ProjectSchema],
      footerLinks: FooterLinksSchema,
    },
  });


const Project = mongoose.model('project', projectSchema);
const Experience = mongoose.model('experience', experienceSchema);

module.exports = {Project, Experience};