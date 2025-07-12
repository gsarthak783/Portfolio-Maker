import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import Portfolio from './pages/Portfolio'
import Experiences from './pages/Experiences'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Projects from './pages/Projects'
import Certificates from './pages/Certificates'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData } from './slices/userDataSlice'
import { useEffect } from 'react'
import ResumePage from './pages/ResumePage'
import ContactPage from './pages/ContactPage'
import Education from './pages/Education'
import ResumeDisplay from './pages/Resume'
import NotFound from './pages/NotFound'

// Resume themes
import USResume from './ResumeThemes/USResume'
import IndiaResume from './ResumeThemes/IndiaResume'
import JapanResume from './ResumeThemes/JapanResume'
import GermanyResume from './ResumeThemes/GermanyResume'
import UKResume from './ResumeThemes/UKResume'
import ResearchResume from './ResumeThemes/ResearchResume'
import StudentResume from './ResumeThemes/StudentResume'
import CanadaResume from './ResumeThemes/CanadaResume'
import ITProfessionalResume from './ResumeThemes/ITProfessionalResume'
import AustraliaResume from './ResumeThemes/AustraliaResume'
import ModernResume from './ResumeThemes/ModernResume'
import ClassicResume from './ResumeThemes/ClassisResume'
import EuropeResume from './ResumeThemes/EuropeResume'
import PageNotFound from './pages/PageNotFound'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function AppLayout() {
  const location = useLocation()
  const isNotFound = location.pathname === "/not-found"
   const {userData} = useSelector((state) => state.userState);


  return (
    <>
      {isNotFound && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:email" element={<Portfolio />} />
        <Route path="/:email/experiences" element={<Experiences />} />
        <Route path="/:email/projects" element={<Projects />} />
        <Route path="/:email/certificates" element={<Certificates />} />
        <Route path="/:email/resume" element={<ResumePage />} />
        <Route path="/:email/contact" element={<ContactPage />} />
        <Route path="/:email/education/" element={<Education />} />
        <Route path="/:email/resume-display" element={<ResumeDisplay />} />

        <Route path="/:email/resume-us" element={<USResume />} />
        <Route path="/:email/resume-india" element={<IndiaResume />} />
        <Route path="/:email/resume-japan" element={<JapanResume />} />
        <Route path="/:email/resume-germany" element={<GermanyResume />} />
        <Route path="/:email/resume-europe" element={<EuropeResume />} />
        <Route path="/:email/resume-uk" element={<UKResume />} />
        <Route path="/:email/resume-research" element={<ResearchResume />} />
        <Route path="/:email/resume-student" element={<StudentResume />} />
        <Route path="/:email/resume-canada" element={<CanadaResume />} />
        <Route path="/:email/resume-itprofessional" element={<ITProfessionalResume />} />
        <Route path="/:email/resume-australia" element={<AustraliaResume />} />
        <Route path="/:email/resume-modern" element={<ModernResume />} />
        <Route path="/:email/resume-classic" element={<ClassicResume />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>

       
      {!isNotFound && <Footer />}
    </>
  )
}

function App() {
  
  const email = localStorage.getItem('email')


  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  )
}

export default App
