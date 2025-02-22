import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";

const ExperienceForm = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      summaryPoints: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "summaryPoints",
  });

  const [experiences, setExperiences] = useState([]);
  const [flag,setFlag] = useState(false);
  const email = localStorage.getItem('email');
  // Fetch experiences from the database
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get(`https://portfolio-server-two-tawny.vercel.app/experience/get-data/${email}`);
        setExperiences(response.data.payload);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    fetchExperiences();
  }, [flag]);

  const onSubmit = async (data) => {
    try {
      let email = localStorage.getItem('email')
      const response = await axios.post("https://portfolio-server-two-tawny.vercel.app/experience/post-data", {email,data});
      console.log(response.data)
      setFlag(!flag);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(id)
    const response =  await axios.post('https://portfolio-server-two-tawny.vercel.app/experience/delete-data',{id});
    console.log(response.data)
      setFlag(!flag);
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-stretch p-4 space-x-4">
      {/* Left Side: Form */}
      <div className="bg-white p-8 rounded-lg shadow-md w-1/2">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">
          Experience Form
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Form Fields */}
          <div>
            <label className="block text-gray-700">Company Name</label>
            <input
              type="text"
              {...register("companyName", { required: "Company name is required" })}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.companyName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.companyName && (
              <span className="text-red-500 text-sm">{errors.companyName.message}</span>
            )}
          </div>

          <div>
             <label className="block text-gray-700">Role</label>
        <input
              type="text"
              {...register("role", { required: "Role is required" })}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.role && (
              <span className="text-red-500 text-sm">{errors.role.message}</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Duration</label>
            <input
              type="text"
              {...register("duration", { required: "Duration is required" })}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.duration ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.duration && (
              <span className="text-red-500 text-sm">{errors.duration.message}</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Company Logo (URL)</label>
            <input
              type="url"
              {...register("companyLogo", { required: "Company logo is required" })}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.companyLogo ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.companyLogo && (
              <span className="text-red-500 text-sm">{errors.companyLogo.message}</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Company URL</label>
            <input
              type="url"
              {...register("companyUrl", { required: "Company URL is required" })}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.companyUrl ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.companyUrl && (
              <span className="text-red-500 text-sm">{errors.companyUrl.message}</span>
            )}
          </div>

          {/* Other form fields */}
          {/* Same fields from the previous form */}

          {/* Summary Points */}
          <div>
            <label className="block text-gray-700">Summary Points</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 mt-2">
                <input
                  type="text"
                  {...register(`summaryPoints.${index}`, { required: "Point is required" })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                    errors.summaryPoints?.[index] ? "border-red-500" : "border-gray-300"
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
              Add Point
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

      {/* Right Side: Display Cards */}
      <div className="w-1/2 space-y-4">
  {/* Main Heading */}
  <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">Experiences</h2>

  {experiences?.map((exp) => (
    <div key={exp._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-3">
      {/* Logo and Company Name */}
      <div className="flex items-center space-x-3">
        {exp.companyLogo && (
          <img
            src={exp.companyLogo}
            alt={`${exp.companyName} Logo`}
            className="w-12 h-12 object-cover rounded-full"
          />
        )}
        <div>
          <h3 className="text-xl font-semibold text-blue-500">{exp.companyName}</h3>
          <a
            href={exp.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            {exp.companyUrl}
          </a>
        </div>
      </div>

      {/* Role and Duration */}
      <div>
        <p className="text-gray-700 font-medium">{exp.role}</p>
        <p className="text-gray-500">{exp.duration}</p>
      </div>

      {/* Summary Points */}
      <ul className="list-disc pl-5 space-y-1">
        {exp.summaryPoints.map((point, idx) => (
          <li key={idx} className="text-gray-600">
            {point}
          </li>
        ))}
      </ul>

      {/* Delete Button */}
      <button
        onClick={() => handleDelete(exp._id)}
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

export default ExperienceForm;

