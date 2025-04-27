import React from "react";
import { Link } from "react-router-dom";

const Home = () => { 
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="hero min-h-screen bg-white text-gray-900">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6 text-blue-600">Build Your Dream Portfolio Effortlessly</h1>
            <p className="mb-6 text-lg text-gray-600">
              Create a professional and beautiful portfolio in minutes. Showcase your skills, projects, and achievements — without writing a single line of code!
            </p>
            <Link to="/signup" className="btn btn-primary btn-lg text-white">Get Started</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="text-center mb-12">
          <p className="text-lg text-blue-600 uppercase tracking-wide font-semibold">
            Features
          </p>
          <h2 className="text-4xl font-bold text-gray-900">Why Choose Our Portfolio Maker?</h2>
          <div className="w-24 mx-auto mt-2 h-1 bg-blue-600 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="card bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Easy Customization</h3>
            <p>Update your experience, projects, and certifications with simple forms — your portfolio updates instantly!</p>
          </div>
          <div className="card bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Responsive Designs</h3>
            <p>Your portfolio looks stunning on all devices, including mobiles, tablets, and desktops.</p>
          </div>
          <div className="card bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Secure & Fast</h3>
            <p>We prioritize security and speed, ensuring a smooth experience for both you and your visitors.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="text-center mb-12">
          <p className="text-lg text-blue-600 uppercase tracking-wide font-semibold">
            How It Works
          </p>
          <h2 className="text-4xl font-bold text-gray-900">Just 3 Easy Steps</h2>
          <div className="w-24 mx-auto mt-2 h-1 bg-blue-600 rounded"></div>
        </div>

        <div className="timeline timeline-vertical max-w-4xl mx-auto">
          <div className="timeline-item">
            <div className="timeline-start text-blue-600">Step 1</div>
            <div className="timeline-middle">
              <div className="timeline-dot bg-blue-600"></div>
            </div>
            <div className="timeline-end mb-10">
              <h3 className="text-lg font-bold">Create Your Account</h3>
              <p>Sign up with your email to start building your portfolio.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-start text-blue-600">Step 2</div>
            <div className="timeline-middle">
              <div className="timeline-dot bg-blue-600"></div>
            </div>
            <div className="timeline-end mb-10">
              <h3 className="text-lg font-bold">Fill In Your Details</h3>
              <p>Enter your work experience, projects, certificates, and skills through simple forms.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-start text-blue-600">Step 3</div>
            <div className="timeline-middle">
              <div className="timeline-dot bg-blue-600"></div>
            </div>
            <div className="timeline-end mb-10">
              <h3 className="text-lg font-bold">Publish Your Portfolio</h3>
              <p>Generate a personalized link and start sharing your portfolio with the world!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-20 px-6 bg-white">
        <div className="text-center mb-12">
          <p className="text-lg text-blue-600 uppercase tracking-wide font-semibold">
            Testimonials
          </p>
          <h2 className="text-4xl font-bold text-gray-900">Loved by Developers</h2>
          <div className="w-24 mx-auto mt-2 h-1 bg-blue-600 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="card bg-white p-6 shadow-md rounded-lg">
            <p>"This portfolio maker saved me hours of coding! Highly recommend for freshers and experienced devs."</p>
            <div className="mt-4 font-semibold text-blue-600">- Alex Johnson</div>
          </div>
          <div className="card bg-white p-6 shadow-md rounded-lg">
            <p>"A simple, intuitive platform that gave me a clean and professional portfolio in no time."</p>
            <div className="mt-4 font-semibold text-blue-600">- Priya Sharma</div>
          </div>
          <div className="card bg-white p-6 shadow-md rounded-lg">
            <p>"Loved the experience. The customization and real-time updates are a game-changer."</p>
            <div className="mt-4 font-semibold text-blue-600">- David Lee</div>
          </div>
        </div>
      </section> */}

      {/* Final Call To Action */}
      <section className="py-20 bg-gray-50  text-center">
        <h2 className="text-4xl font-bold text-blue-600 mb-6">Start Creating Your Portfolio Today</h2>
        <p className="mb-6 text-lg">Join hundreds of developers showcasing their talent beautifully.</p>
        <Link to="/signup" className="btn btn-primary btn-lg text-white">Create My Portfolio</Link>
      </section>
    </div>
  );
};

export default Home;
