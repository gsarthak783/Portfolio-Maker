import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ContactPage = () => {
    const receiverEmail = localStorage.getItem("email");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const showToast = (message, type = 'success') => {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `alert ${type === 'success' ? 'alert-success' : 'alert-error'} text-white`;
    toast.innerHTML = `
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };
  

  const submitHandler = async (data) => {
    console.log("Form Submitted:", data);
    const emailData = {...data, receiverEmail}
    const response = await axios.post("http://localhost:4000/email/send-email", emailData);
    console.log(response.data);
    if (response?.data.message === "success") {
        showToast("Email sent successfully!", "success");
      } else {
        showToast("Failed to send email. Please try again.", "error");
      }
    reset();
  };

  return (
    <div className="min-h-screen bg-base-100 py-12 px-6">
      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-lg text-primary uppercase tracking-wide font-semibold">
          Get In Touch
        </p>
        <h2 className="text-4xl font-bold">Contact Me</h2>
        <div className="w-24 mx-auto mt-2 h-1 bg-primary rounded"></div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto bg-base-200 p-8 rounded-xl shadow-md">
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Your name"
              {...register("name", { required: "Name is required" })}
              className={`input input-bordered w-full ${
                errors.name ? "input-error" : ""
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Your email"
              {...register("senderEmail", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className={`input input-bordered w-full ${
                errors.senderEmail ? "input-error" : ""
              }`}
            />
            {errors.senderEmail && (
              <span className="text-red-500 text-sm">{errors.senderEmail.message}</span>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block font-medium mb-1">Subject</label>
            <input
              type="text"
              placeholder="Subject"
              {...register("subject", { required: "Subject is required" })}
              className={`input input-bordered w-full ${
                errors.subject ? "input-error" : ""
              }`}
            />
            {errors.subject && (
              <span className="text-red-500 text-sm">{errors.subject.message}</span>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block font-medium mb-1">Message</label>
            <textarea
              rows={6}
              placeholder="Write your message here..."
              {...register("message", { required: "Message is required" })}
              className={`textarea textarea-bordered w-full ${
                errors.message ? "textarea-error" : ""
              }`}
            />
            {errors.message && (
              <span className="text-red-500 text-sm">{errors.message.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button className="btn btn-primary px-6">Send Message</button>
          </div>
        </form>
      </div>

      <div className="toast toast-top toast-end z-50" id="toast-container"></div>

    </div>
  );
};

export default ContactPage;
