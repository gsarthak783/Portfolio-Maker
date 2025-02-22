import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";

const CertificateForm = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tags: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  const [certificates, setCertificates] = useState([]);
  const [flag, setFlag] = useState(false);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get(`https://portfolio-server-two-tawny.vercel.app/certificate/get-data/${email}`);
        setCertificates(response.data.payload);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };
    fetchCertificates();
  }, [flag]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://portfolio-server-two-tawny.vercel.app/certificate/post-data", { email, data });
      console.log(response.data);
      setFlag(!flag);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post("https://portfolio-server-two-tawny.vercel.app/certificate/delete-data", { id });
      setFlag(!flag);
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-stretch p-4 space-x-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/2">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">Certificate Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">Title</label>
            <input type="text" {...register("title", { required: "Title is required" })} className="w-full px-4 py-2 mt-2 border rounded-lg text-black" />
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
          </div>

          <div>
            <label className="block text-gray-700">Issuer</label>
            <input type="text" {...register("issuer", { required: "Issuer is required" })} className="w-full px-4 py-2 mt-2 border rounded-lg text-black" />
            {errors.issuer && <span className="text-red-500 text-sm">{errors.issuer.message}</span>}
          </div>

          <div>
            <label className="block text-gray-700">Issue Date</label>
            <input type="date" {...register("issueDate", { required: "Issue Date is required" })} className="w-full px-4 py-2 mt-2 border rounded-lg text-black" />
            {errors.issueDate && <span className="text-red-500 text-sm">{errors.issueDate.message}</span>}
          </div>

          <div>
            <label className="block text-gray-700">Certificate URL</label>
            <input type="url" {...register("url")} className="w-full px-4 py-2 mt-2 border rounded-lg text-black" />
          </div>

          <div>
            <label className="block text-gray-700">Tags</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 mt-2">
                <input type="text" {...register(`tags.${index}`)} className="w-full px-4 py-2 border rounded-lg text-black" />
                <button type="button" onClick={() => remove(index)} className="bg-red-500 text-white px-3 py-2 rounded-lg">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => append("")} className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg">Add Tag</button>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">Submit</button>
        </form>
      </div>

      <div className="w-1/2 space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">Certificates</h2>
        {certificates?.map((cert) => (
          <div key={cert._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-500">{cert.title}</h3>
            <p className="text-gray-700">{cert.issuer}</p>
            <p className="text-gray-500">{new Date(cert.issueDate).toLocaleDateString()}</p>
            {cert.url && <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">View Certificate</a>}
            <ul className="list-disc pl-5 space-y-1">
              {cert.tags.map((tag, idx) => <li key={idx} className="text-gray-600">{tag}</li>)}
            </ul>
            <button onClick={() => handleDelete(cert._id)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificateForm;
