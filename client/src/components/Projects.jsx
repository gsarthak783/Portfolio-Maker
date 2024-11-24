import React,{useState,useEffect} from 'react';
import axios from 'axios';

const ProjectCard = ({ title, description, imageUrl, projectUrl, githubUrl, technologies }) => {
  return (
    <div className="max-w-md bg-white border-2 border-gray-300 rounded-lg shadow-md overflow-hidden">
      {/* Image Section */}
      <div className="relative w-full h-48">
        <a href={projectUrl}>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
          />
        </a>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        <a href={projectUrl}>
          <h5 className="text-2xl font-semibold text-gray-800 hover:text-blue-500 transition-all">{title}</h5>
        </a>
        <p className="text-sm text-gray-600">{description}</p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-4">
          {technologies.map((tag, index) => (
            <span key={index} className="text-xs text-blue-500 border border-blue-500 rounded-full py-1 px-3">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-center px-6 pb-4">
        <a
          href={githubUrl}
          className="text-red-500 border border-gray-300 rounded-lg py-2 px-4 text-sm font-semibold hover:bg-red-500 hover:text-white transition-all"
        >
          GitHub
        </a>
        <a
          href={projectUrl}
          className="text-blue-500 border border-blue-500 rounded-lg py-2 px-4 text-sm font-semibold hover:bg-blue-500 hover:text-white transition-all"
        >
          Visit Project
        </a>
      </div>
    </div>
  );
};

const Project = () => {

  let [data,setData] = useState([]);

  useEffect(()=>{
    let fetchData = async ()=>{
      let email = localStorage.getItem('email')
      let result = await axios.get(`http://localhost:4000/project/get-data/${email}`)
      console.log(result.data.payload);
      let fetchedData = result.data.payload;
      setData(fetchedData?.reverse());
      
    }

    fetchData();
  },[])


  return (
    <div className="min-h-screen bg-slate-100 p-6 space-y-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Projects</h2>

      {/* Project Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}  // Image URL passed here
            projectUrl={project.projectUrl}
            githubUrl={project.githubUrl}
            technologies={project.technologies}
          />
        ))}
      </div>
    </div>
  );
};

export default Project;
