import React from "react";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/Firebase";
import { set } from "react-hook-form";

const EmailVerify = () => {
    const user = auth.currentUser;
    const [message, setMessage] = React.useState("");
    const [error, setError] = React.useState("");


    const handleClick = async () => {
        try {
            setMessage("");
            await sendEmailVerification(auth.currentUser);
            // alert("Verification email sent!");
            setMessage("Verification email sent!");
        } catch (error) {
            console.error("Error sending verification email:", error);
            setError("Failed to send email. Please try again later.");
            
        }
    };

  return (
     <div className="flex flex-col items-center justify-top min-h-screen bg-slate-200 px-4">
        <div className="card mt-10 bg-white shadow-xl max-w-200 p-6 text-center rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            Email Not Verified
          </h1>
          <p className="text-base text-gray-800 mb-6">
            Please verify your account using the link sent to your registered email address: <br />
            <span className="text-primary font-medium">{user.email}</span>
          </p>
          <div className="text-sm text-gray-600">
            If you didn’t receive the email, try checking your spam folder or
            request a new verification link.
          </div>
        </div>
        <div>
            <button onClick={handleClick} className="mt-6 btn btn-dash btn-primary">Send Verification Link</button>
            {message && (
              <p className="mt-4 ml-4 text-sm text-green-600">{message}</p>
            )}
            {error && (
              <p className="mt-4 ml-4 text-sm text-red-600">{error}</p>
            )}
        </div>
      </div>
  );
}

export default EmailVerify;