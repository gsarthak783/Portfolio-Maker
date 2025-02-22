import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const ProjectCard = ({ title, description, imageUrl, projectUrl, githubUrl, technologies }) => {
  return (
    <div className="card bg-neutral shadow-md hover:shadow-lg transition duration-300 p-6 border border-base-300">
      <figure>
        <a href={projectUrl} target="_blank" rel="noopener noreferrer">
                    <iframe 
            src={projectUrl} 
            className="w-full h-48 bg-white border border-gray-300 rounded-md" 
            loading="lazy" 
            sandbox="allow-scripts allow-same-origin" 
            style={{
                overflow: "hidden",
                pointerEvents: "none",
                userSelect: "none",
                border: "none"
            }}
            ></iframe>

        </a>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold">
          <a href={projectUrl} className="text-primary transition">{title}</a>
        </h2>
        <p className="text-accent">{description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {technologies.map((tag, index) => (
            <span key={index} className="badge badge-outline badge-primary">#{tag}</span>
          ))}
        </div>
        <div className="card-actions justify-end mt-4">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-error btn-sm">
            GitHub
          </a>
          <a href={projectUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
            Visit Project
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {userData, isLoading} = useSelector(state => state.userState);

 useEffect(() => {
       if (!isLoading) {
         setData(userData.resume?.projects || []);
         setLoading(false);
       }
     }, [isLoading, userData]);

     if (isLoading) {
      return <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>;
    }

  return (
    <div className="min-h-screen bg-base-100 px-6 py-12">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <p className="text-lg text-primary uppercase tracking-wide font-semibold">My Creations</p>
        <h2 className="text-4xl font-bold">Projects</h2>
        <div className="w-24 mx-auto mt-2 h-1 bg-primary rounded"></div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              projectUrl={project.projectUrl}
              githubUrl={project.githubUrl}
              technologies={project.technologies}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
