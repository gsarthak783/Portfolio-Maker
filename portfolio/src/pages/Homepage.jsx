import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeController from "../components/ThemeController";

const Homepage = () => {


    const [email, setEmail] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (email) {
        localStorage.setItem("email", email);
        navigate(`/${email}`);
      }
    };


    return (
        
        <div className="flex flex-col items-center justify-center h-screen bg-base-200">
        <div className="card bg-base-100 shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-4 text-center">Portfolio Builder</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="btn btn-primary">View Portfolio</button>
          </form>
        </div>
      
      <ThemeController />
    </div>
        
    );
}

export default Homepage;
