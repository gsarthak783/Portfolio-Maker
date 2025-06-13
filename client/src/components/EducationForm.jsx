import React,{useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const EducationForm = () => {

    const [educationData, setEducationData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const email = localStorage.getItem("email");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchEducationData = async () => {
        try {
            const email = localStorage.getItem("email");
            const response = await axios.get(
                `https://portfolio-server-two-tawny.vercel.app/education/get-data/${email}` 
            );
            setEducationData(response.data.payload);
            console.log(response.data.payload);
        } catch (error) {
            console.error("Error fetching education data:", error);
        }
    };
    fetchEducationData();
    }, [refresh]);

  

  const onSubmit = async (data) => {
    try {
         data.fromYear = formatMonthYear(data.fromYear);
         data.toYear = formatMonthYear(data.toYear);
      // Send email and data to backend 
      console.log("Education Data:", data);
      const response = await axios.post(
        "https://portfolio-server-two-tawny.vercel.app/education/post-data",
        { email, data }
      );
      console.log("Education saved:", response.data);
    
    // setEducationData((prev) => [...prev, data]); // Update local state
      reset(); // Reset form after submit
      setRefresh(!refresh); // Trigger refresh to fetch updated data
    } catch (error) {
      console.error("Error saving education:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
        const response = await axios.post(
            "http://localhost:4000/education/delete-data",
            {email, _id}
        );
        console.log("Education deleted:", response.data);
        setRefresh(!refresh); // Trigger refresh to fetch updated data
    } catch (error) {
        console.error("Error deleting education:", error);
    }
  };    

  function formatMonthYear(dateStr) {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return `${months[parseInt(month, 10) - 1]}, ${year}`;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-stretch p-4 space-x-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/2">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">
          Add Education
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">Title <span className="text-red-600">*</span></label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-2 mt-2 border rounded-lg text-black"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">{errors.title.message}</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Institute Name <span className="text-red-600">*</span></label>
            <input
              type="text"
              {...register("instituteName", {
                required: "Institute name is required",
              })}
              className="w-full px-4 py-2 mt-2 border rounded-lg text-black"
            />
            {errors.instituteName && (
              <span className="text-red-500 text-sm">{errors.instituteName.message}</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700">From Year <span className="text-red-600">*</span></label>
            <input
              type="month"
              {...register("fromYear", { required: "From year is required" })}
              className="w-full px-4 py-2 mt-2 border rounded-lg text-black"
            />
            {errors.fromYear && (
              <span className="text-red-500 text-sm">{errors.fromYear.message}</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700">To Year <span className="text-red-600">*</span></label>
            <input
              type="month"
              {...register("toYear", { required: "To year is required" })}
              className="w-full px-4 py-2 mt-2 border rounded-lg text-black"
            />
            {errors.toYear && (
              <span className="text-red-500 text-sm">{errors.toYear.message}</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Grade <span className="text-red-600">*</span></label>
            <input
              type="text"
              {...register("grade", { required: "Grade is required" })}
              className="w-full px-4 py-2 mt-2 border rounded-lg text-black"
            />
            {errors.grade && (
              <span className="text-red-500 text-sm">{errors.grade.message}</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Website</label>
            <input
              type="url"
              {...register("website")}
              className="w-full px-4 py-2 mt-2 border rounded-lg text-black"
            />
          </div>

          <div>
            <label className="block text-gray-700">Marksheet URL</label>
            <input
              type="url"
              {...register("marksheetUrl")}
              className="w-full px-4 py-2 mt-2 border rounded-lg text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="w-1/2 space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">Education Details</h2>
        {educationData.map((edu,index) => (
          <div key={edu._id} className="bg-white p-4 rounded-lg shadow-md space-y-2">
            <h3 className="text-lg font-semibold text-blue-600">{edu.title}</h3>
            <p className="text-gray-800">{edu.instituteName}</p>
            <p className="text-gray-600">Year: {edu.fromYear} to {edu.toYear}</p>
            <p className="text-gray-600">Grade: {edu.grade}</p>
            {edu.website && <a href={edu.website} className="text-blue-500 underline" target="_blank">Website</a>}
            {edu.certificateUrl && <a href={edu.marksheetUrl} className="text-blue-500 underline block" target="_blank">Marksheet</a>}
            <button
              onClick={() => handleDelete(edu._id)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationForm;
