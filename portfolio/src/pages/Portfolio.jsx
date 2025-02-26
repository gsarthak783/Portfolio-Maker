import React , {use, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Portfolio = () => {
    const { email } = useParams();
    console.log(email);
    localStorage.setItem('email', email);

    const dispatch = useDispatch();
    const {userData} = useSelector((state) => state.userState);
    console.log(userData);
    
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
     
      
      {/* Welcome Message Section */}
      <section className="hero min-h-screen bg-base-100 text-base-content">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hi, welcome to my Portfolio!</h1>
            <p className="py-6">I’m a passionate software developer, and this is where I showcase my skills and experiences. Take a look at my journey and let's connect!</p>
            <Link to={`/${email}/experiences`} className="btn btn-secondary text-white">Explore More</Link>
          </div>
        </div>
      </section>
      
   
    </div>
  );
}

export default Portfolio;
