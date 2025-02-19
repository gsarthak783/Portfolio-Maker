
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import Portfolio from './pages/Portfolio'
import Experiences from './pages/Experiences'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Projects from './pages/Projects'

function App() {
 

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/:email" element={<Portfolio/>} />
          <Route path="/:email/experiences" element={<Experiences/>} />
          <Route path="/:email/projects" element={<Projects/>} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
