import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";

const ProjectForm = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      technologies: [""], // Initial technology field
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "technologies",
  });

  const [projects, setProjects] = useState([]);
  const [flag, setFlag] = useState(false);

  // Fetch projects from the database
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:4000/project/get-data");
        setProjects(response.data.payload);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [flag]);

  const onSubmit = async (data) => {
    try {
        console.log(data);
        let email = localStorage.getItem('email')
      const response = await axios.post("http://localhost:4000/project/post-data", {email,data});
      console.log(response.data);
      setFlag(!flag);
      reset();

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const response = await axios.post("http://localhost:4000/project/delete-data", { id });
      console.log(response.data);
      setFlag(!flag);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-stretch p-4 space-x-4">
      {/* Left Side: Form */}
      <div className="bg-white p-8 rounded-lg shadow-md w-1/2">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">
          Project Form
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Form Fields */}
          <div>
            <label className="block text-gray-700">Project Title</label>
            <input
              type="text"
              {...register("title", { required: "Project title is required" })}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <span className="text-red-500 text-sm">{errors.title.message}</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description.message}</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Project URL</label>
            <input
              type="url"
              {...register("projectUrl", { required: "Project URL is required" })}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.githubUrl ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.githubUrl && (
              <span className="text-red-500 text-sm">{errors.githubUrl.message}</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700">HomePage Image URL</label>
            <input
              type="url"
              {...register("imageUrl", { required: "Project image URL is required" })}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.imageUrl ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.imageUrl && (
              <span className="text-red-500 text-sm">{errors.imageUrl.message}</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700">GitHub URL</label>
            <input
              type="url"
              {...register("githubUrl", { required: "GitHub URL is required" })}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.githubUrl ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.githubUrl && (
              <span className="text-red-500 text-sm">{errors.githubUrl.message}</span>
            )}
          </div>

          {/* Technologies Array */}
          <div>
            <label className="block text-gray-700">Technologies</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 mt-2">
                <input
                  type="text"
                  {...register(`technologies.${index}`, { required: "Technology is required" })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                    errors.technologies?.[index] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append("")}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Add Technology
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Right Side: Display Projects */}
      <div className="w-1/2 space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">Projects</h2>

        {projects?.map((proj) => (
          <div key={proj._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-3">
            {/* Project Image and Title */}
            <div className="flex items-center space-x-3">
              {proj.imageUrl && (
                <img
                  src={proj.imageUrl}
                  alt={`${proj.title} Image`}
                  className="w-12 h-12 object-cover rounded-md"
                />
              )}
              <div>
                <h3 className="text-xl font-semibold text-blue-500">{proj.title}</h3>
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  GitHub Repository
                </a>
                <a
                  href={proj.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Project Url
                </a>
              </div>
            </div>

            {/* Project Description */}
            <div>
              <p className="text-gray-700">{proj.description}</p>
            </div>

            {/* Technologies List */}
            <ul className="list-disc pl-5 space-y-1">
              {proj?.technologies?.map((tech, idx) => (
                <li key={idx} className="text-gray-600">{tech}</li>
              ))}
            </ul>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(proj._id)}
              className="self-start bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectForm;
