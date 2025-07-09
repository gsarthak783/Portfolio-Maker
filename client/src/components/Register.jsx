import React,{useState} from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword,updateProfile, signOut, sendEmailVerification,
  GoogleAuthProvider, signInWithPopup, fetchSignInMethodsForEmail,signInWithEmailAndPassword,
  linkWithCredential} from 'firebase/auth';
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
      const uid = auth.currentUser.uid;
      await signOut(auth);
       const updatedData = {...data,uid:uid};
       const response = await axios.post('https://portfolio-server-two-tawny.vercel.app/user/post-data',updatedData) 
       console.log(response.data)
      //  await sendEmailVerification(auth.currentUser);
         const htmlBody = await fetch('/welcomeEmail.html').then(res => res.text())
       await verificationEmailTrigger(data.email,uid, htmlBody, "Welcome to ShowCaze!");
        console.log("Email Verification Sent")
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

  const handleGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const googleUser = result.user;
    console.log("Google User:", googleUser);
    // Check what sign-in methods exist for this email
    const signInMethods = await fetchSignInMethodsForEmail(auth, googleUser.email);
    console.log("Sign-in methods for email:", signInMethods);
    if (signInMethods.includes('password')) {
      // User has already registered with email/password
      // Ask them to sign in using email/password, then link Google

      alert("You already signed up with email/password. Please log in first to link your Google account.");

      // Optionally, you could prefill the email on the login page
      navigate('/login?email=' + googleUser.email);

      // Sign them out to avoid confusion
      await auth.signOut();
      return;
    }

    // If it's a new user or only signed in with Google before
    const data = {
      name: googleUser.displayName,
      email: googleUser.email,
      password: googleUser.uid, //temp password
      uid:googleUser.uid 
      // photoURL: googleUser.photoURL
    };
    console.log("Data to send:", data);
     const response = await axios.post('https://portfolio-server-two-tawny.vercel.app/user/post-data', data);
     console.log(response.data)
     await signOut(auth);
      const htmlBody = await fetch('/welcomeEmail.html').then(res => res.text())
       await verificationEmailTrigger(data.email,data.uid, htmlBody, "Welcome to ShowCaze!");
     navigate('/login')

  } catch (error) {
    console.error("Google Sign-In Error:", error);
    await signOut(auth);
     navigate('/login')
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
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>

         <div className="mt-4">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-black py-2 rounded-md hover:bg-gray-100 transition duration-200"
        >
          <img src="./google.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>
      </div>
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

export const verificationEmailTrigger = async (email,uid, htmlBody, subject) =>{
      try {
         const verificationLink = `https://showcaze.vercel.app/verify-email?uid=${uid}`;
        const emailHtml = htmlBody.replace("{{VERIFICATION_URL}}", verificationLink);
        // console.log(htmlBody)
       const customEmail = await axios.post('https://mailforge-service.vercel.app/api/v1/send-custom-email',{
          "from": `"ShowCaze" <showcaze.portfolio@gmail.com>`,
          "to": email,
          "subject": subject,
          "text": "Welcome to ShowCaze! Please verify your email to continue.",
          "html": emailHtml,

          "smtp": {
            "host": "smtp.gmail.com",
          
            "port": 587,
            "secure": false,
            "auth": {
              "user": import.meta.env.VITE_EMAIL_USER,
              "pass": import.meta.env.VITE_EMAIL_PASS
    }
  }
}
,{
    
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      "Content-Type": "application/json"
    }
  });
       console.log(customEmail.data);
       return customEmail.data;
      } catch (error) {
        console.log(error)
      }
  }