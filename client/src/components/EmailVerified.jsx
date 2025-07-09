import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


export default function EmailVerified() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); // 'verifying', 'success', 'error'
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const uid = searchParams.get("uid"); 
        console.log(uid)
      if (!uid) {
        setStatus("error");
        return;
      }

      try {
        const res = await axios.post("https://portfolio-server-two-tawny.vercel.app/user/verify-email",{uid})
        if(res.success){
             console.log("User verified");
             setStatus("success"); 
        }
        else{
            setStatus("error"); 
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        setStatus("error");
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg w-full">
        {status === "verifying" && (
          <h1 className="text-xl text-gray-500 animate-pulse">Verifying your email...</h1>
        )}

        {status === "success" && (
          <>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">You're Verified!</h1>
            <p className="text-gray-600 mb-6">
              Your email has been successfully verified. You can now access all features.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition font-medium"
            >
              Go to Homepage
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-bold mb-4 text-red-500">⚠️ Verification Failed</h1>
            <p className="text-gray-600 mb-6">
              We couldn't verify your email. Please try again or contact support.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition font-medium"
            >
              Go to Homepage
            </button>
          </>
        )}
      </div>
    </div>
  );
}
