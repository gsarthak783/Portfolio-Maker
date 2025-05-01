import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '../firebase/Firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [loginError, setLoginError] = useState('');


  const closeResetDialog = () => {
    setShowResetDialog(false);
    setResetEmail('');
    setResetError('');
    setResetSuccess('');
  }

  const onSubmit = async (data) => {
    try {
      const user = await signInWithEmailAndPassword(auth, data.email, data.password);
      localStorage.setItem('name', user.user.displayName);
      localStorage.setItem('email', user.user.email);
      setLoginError(''); // clear any previous error
      navigate('/dashboard');
    } catch (err) {
      console.log("Login Error:", err);

      switch (err.code) {
        case 'auth/user-not-found':
          setLoginError('No account found with this email.');
          break;
        case 'auth/wrong-password':
          setLoginError('Incorrect password.');
          break;
        case 'auth/invalid-email':
          setLoginError('Invalid email format.');
          break;
        case 'auth/invalid-credential':
          setLoginError('Invalid email or password.');
          break;
        default:
          setLoginError('Login failed. Please try again.');
      }
    }
  };

  const handleResetPassword = async () => {
    try {
    let res = await sendPasswordResetEmail(auth, resetEmail);
     console.log(res);
      setResetSuccess("Password reset email sent.");
      setResetError("");
    } catch (error) {
      setResetError("Failed to send reset email.");
      setResetSuccess("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
          </div>

          <button
            type="submit" onClick={() => setLoginError('')}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>

        {loginError && (
        <div className="mt-4 text-red-500 text-md text-center">
         {loginError}
       </div>
       )}

        <div className='mt-4 font-semibold text-gray-700'>
          Forgot Password? <span onClick={() => setShowResetDialog(true)} className="text-blue-500 hover:underline cursor-pointer">Click here</span>
        </div>


        <div className='mt-2 font-semibold text-gray-700'>
          Not an existing user? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
        </div>
      </div>

      {/* Reset Password Dialog */}
      {showResetDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={closeResetDialog}>✕</button>
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Reset Password</h3>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />

            {resetError && <p className="text-red-500 text-sm mb-2">{resetError}</p>}
            {resetSuccess && <p className="text-green-500 text-sm mb-2">{resetSuccess}</p>}

            <button
              onClick={handleResetPassword}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Send Reset Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
