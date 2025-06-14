import React,{useState} from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword,updateProfile, signOut, sendEmailVerification} from 'firebase/auth';
import { auth } from '../firebase/Firebase';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const [registerError, setRegisterError] = useState('');


  const onSubmit = async (data) => {
    
    try{
       console.log(data,data.name)
        const user = await createUserWithEmailAndPassword(auth, data.email, data.password)
        console.log(user)
        const update = await updateProfile(auth.currentUser, {
            displayName: data.name
          })
        console.log("Name Added") 
       const response = await axios.post('https://portfolio-server-two-tawny.vercel.app/user/post-data',data) 
       console.log(response.data)
       await sendEmailVerification(auth.currentUser);
        console.log("Email Verification Sent")
       await signOut(auth);
      
        navigate('/login') 
        

    }
    catch(err){
        console.log("Error", err)

        switch (err.code) {
          case 'auth/email-already-in-use':
            setRegisterError('This email is already registered.');
            break;
          case 'auth/invalid-email':
            setRegisterError('Please enter a valid email address.');
            break;
          case 'auth/weak-password':
            setRegisterError('Password should be at least 6 characters.');
            break;
          default:
            setRegisterError('Registration failed. Please try again.');
        }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
          </div>
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
            type="submit" onClick={() => setRegisterError('')}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>

        {registerError && <p className=" mt-2 text-red-500 text-md text-center">{registerError}</p>}


        <div className='mt-4 font-semibold text-gray-700'>
          Already an user? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
