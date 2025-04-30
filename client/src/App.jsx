import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Background from './components/Background';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './components/Register';
import Experiences from './components/Experiences';
import ExperienceForm from './components/ExperienceForm';
import PrivateRoute from '../src/PrivateRoute/PrivateRoute'
import Dashboard from './components/Dashboard';
import ProjectForm from './components/ProjectForm';
import Project from './components/Projects';
import FooterLinksForm from './components/FooterLinksForm';
import CertificateForm from './components/CertificateForm';
import PublicRoute from './PrivateRoute/PublicRoute';
import ProtectedRoute from './PrivateRoute/ProtectedRoute';


const App = () => {
  return (
    <div className="relative min-h-screen bg-background text-text">
      <BrowserRouter>
    
       <Navbar/>
    
      <Routes>
      <Route path='/' element={<PublicRoute><Home/></PublicRoute>} />
      {/* <Route path='/:email' element={<Home/>} /> */}
        <Route path='login' element={<PublicRoute><Login/></PublicRoute>} />
        <Route path='register' element={<PublicRoute><Register/></PublicRoute>} />
        
        <Route path='dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path='experience-form' element={<ProtectedRoute><ExperienceForm/></ProtectedRoute>} />
        <Route path='project-form' element={<ProtectedRoute><ProjectForm/></ProtectedRoute>} />
        <Route path='footer-form' element={<ProtectedRoute><FooterLinksForm/></ProtectedRoute>} />
        <Route path='certificate-form' element={<ProtectedRoute><CertificateForm/></ProtectedRoute>} />

      </Routes>

      <Footer/>
     

      </BrowserRouter>
     
    </div>
  );
}

export default App;
