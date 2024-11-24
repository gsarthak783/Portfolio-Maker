import React from "react";
import { useForm } from "react-hook-form";

const FooterLinksForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Footer Links Submitted:", data);
    // Add backend submission logic here
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">
          Add Footer Links
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Twitter */}
          <div>
            <label className="block text-gray-700 font-medium">Twitter URL</label>
            <input
              type="url"
              {...register("twitter", {
                required: "Twitter URL is required",
              })}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.twitter ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.twitter && (
              <span className="text-red-500 text-sm">{errors.twitter.message}</span>
            )}
          </div>

          {/* GitHub */}
          <div>
            <label className="block text-gray-700 font-medium">GitHub URL</label>
            <input
              type="url"
              {...register("github", {
                required: "GitHub URL is required",
              })}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.github ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.github && (
              <span className="text-red-500 text-sm">{errors.github.message}</span>
            )}
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-gray-700 font-medium">LinkedIn URL</label>
            <input
              type="url"
              {...register("linkedin", {
                required: "LinkedIn URL is required",
               
              })}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.linkedin ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.linkedin && (
              <span className="text-red-500 text-sm">{errors.linkedin.message}</span>
            )}
          </div>

          {/* Mail */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                
              })}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FooterLinksForm;
