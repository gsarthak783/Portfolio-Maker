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


const App = () => {
  return (
    <div className="relative min-h-screen bg-background text-text">
      <BrowserRouter>
    
       <Navbar/>
    
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/:email' element={<Home/>} />
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>} />
        <Route path='experience' element={<Experiences/>} />
        <Route path='project' element={<Project/>} />
        <Route path='experience-form' element={<ExperienceForm/>} />
        <Route path='project-form' element={<ProjectForm/>} />
        <Route path='dashboard' element={<Dashboard/>} />
        <Route path='footer-form' element={<FooterLinksForm/>} />
        <Route path='certificate-form' element={<CertificateForm/>} />

      </Routes>

      <Footer/>
     

      </BrowserRouter>
     
    </div>
  );
}

export default App;
