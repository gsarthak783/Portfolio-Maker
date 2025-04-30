
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import Portfolio from './pages/Portfolio'
import Experiences from './pages/Experiences'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Projects from './pages/Projects'
import Certificates from './pages/Certificates'
import { useDispatch } from 'react-redux'
import { fetchUserData } from './slices/userDataSlice'
import { useEffect } from 'react'
import ResumePage from './pages/ResumePage'
import ContactPage from './pages/ContactPage'
function App() {
  
  
  const dispatch = useDispatch();
    let email = localStorage.getItem('email');
  // useEffect(() => {
    
  //   dispatch(fetchUserData(email));
  // }
  // , []);

  return (
    <>
      <Router>
      
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/:email" element={<Portfolio/>} />
          <Route path="/:email/experiences" element={<Experiences/>} />
          <Route path="/:email/projects" element={<Projects/>} />
          <Route path="/:email/certificates" element={<Certificates/>} />
          <Route path="/:email/resume" element={<ResumePage/>} />
          <Route path="/:email/contact" element={<ContactPage/>} />
        </Routes>
        <Footer />
        
      </Router>
    </>
  )
}

export default App
