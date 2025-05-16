import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const PersonalInfo = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [personalInfo, setPersonalInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      const response = await axios.get(
        `https://portfolio-server-two-tawny.vercel.app/personal/get-data/${email}`
      );
      const data = response.data;
      setPersonalInfo(data.payload);
      reset(data.payload);
    };
    fetchPersonalInfo();
  }, [refresh]);

  const onSubmit = (data) => {
    try{
    console.log("Personal Info Submitted:", data);
    const response = axios.post(
      "https://portfolio-server-two-tawny.vercel.app/personal/post-data",
      { email, data }
    );
    console.log("Response:", response.data);
   setRefresh(!refresh); // Trigger refresh to fetch updated data
    setIsEditing(false);
  } catch (error) {
    console.error("Error submitting form:", error);
  }
  };

 

 

  console.log("isEditing:", isEditing);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">Personal Info</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">First Name <span className="text-red-600">*</span></label>
            <input
              type="text"
              disabled={!isEditing}
              {...register("firstName", { required: "Firstname is required" })}
              
              className={`w-full px-4 py-2 mt-2 border rounded-lg text-black ${!isEditing && "bg-gray-100"}`}
            />
            {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
          </div>

          <div>
            <label className="block text-gray-700">Last Name <span className="text-red-600">*</span></label>
            <input
              type="text"
              disabled={!isEditing}
              {...register("lastName", { required: "Lastname is required" })}
             
              className={`w-full px-4 py-2 mt-2 border rounded-lg text-black ${!isEditing && "bg-gray-100"}`}
            />
            {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
          </div>

          <div>
            <label className="block text-gray-700">Contact Number <span className="text-red-600">*</span></label>
            <input
              type="text"
              disabled={!isEditing}
              {...register("contactNumber", { required: "Contact number is required" })}
             
              className={`w-full px-4 py-2 mt-2 border rounded-lg text-black ${!isEditing && "bg-gray-100"}`}
            />
            {errors.contactNumber && <span className="text-red-500 text-sm">{errors.contactNumber.message}</span>}
          </div>

          <div>
            <label className="block text-gray-700">Email <span className="text-red-600">*</span></label>
            <input
              type="email"
              disabled={!isEditing}
              {...register("email", { required: "Email is required" })}
              
              className={`w-full px-4 py-2 mt-2 border rounded-lg text-black ${!isEditing && "bg-gray-100"}`}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>


          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              disabled={!isEditing}
              {...register("address")}
              
              className={`w-full px-4 py-2 mt-2 border rounded-lg text-black ${!isEditing && "bg-gray-100"}`}
            />
          </div>


          <div>
            <label className="block text-gray-700">Summary <span className="text-red-600">*</span></label>
            <textarea
              disabled={!isEditing}
              {...register("summary", { required: "Summary is required" })}
           
              className={`w-full px-4 py-2 mt-2 border rounded-lg text-black ${!isEditing && "bg-gray-100"}`}
            />
            {errors.summary && <span className="text-red-500 text-sm">{errors.summary.message}</span>}
          </div>

          {isEditing ? (
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
              Save Info
            </button>
          ) : (
            <p type="button" onClick={()=>{setIsEditing(true)}} className="w-full bg-green-500 text-white py-2 rounded-lg justify-center text-center cursor-pointer">
              Edit Info
            </p>
          )}
          
        </form>

        
      </div>
    </div>
  );
};

export default PersonalInfo;
