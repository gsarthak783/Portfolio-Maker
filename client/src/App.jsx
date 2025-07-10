import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './context/userContext';

import Background from './components/Background';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './components/Register';
import Experiences from './components/Experiences';
import ExperienceForm from './components/ExperienceForm';
import PrivateRoute from '../src/PrivateRoute/PrivateRoute';
import Dashboard from './components/Dashboard';
import ProjectForm from './components/ProjectForm';
import Project from './components/Projects';
import FooterLinksForm from './components/FooterLinksForm';
import CertificateForm from './components/CertificateForm';
import PublicRoute from './PrivateRoute/PublicRoute';
import ProtectedRoute from './PrivateRoute/ProtectedRoute';
import PersonalInfo from './components/PersonalInfoForm';
import EducationForm from './components/EducationForm';
import AvatarPage from './components/AvatarPage';
import EmailVerified from './components/EmailVerified';
import NotFound from './components/NotFound';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const MainLayout = ({ children }) => (
  <>
    <Navbar />
    <div className="pt-16">{children}</div>
    <Footer />
  </>
);

const App = () => {
  return (
    <UserProvider>
      <div className="relative min-h-screen bg-background text-text">
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Standalone Page */}
            <Route path="verify-email" element={<EmailVerified />} />

            {/* Pages with Navbar + Footer */}
            <Route
              path="/"
              element={
                <MainLayout>
                  <PublicRoute>
                    <Home />
                  </PublicRoute>
                </MainLayout>
              }
            />
            <Route
              path="login"
              element={
                <MainLayout>
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                </MainLayout>
              }
            />
            <Route
              path="register"
              element={
                <MainLayout>
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                </MainLayout>
              }
            />
            <Route
              path="dashboard"
              element={
                <MainLayout>
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                </MainLayout>
              }
            />
            <Route
              path="experience-form"
              element={
                <MainLayout>
                  <ProtectedRoute>
                    <ExperienceForm />
                  </ProtectedRoute>
                </MainLayout>
              }
            />
            <Route
              path="project-form"
              element={
                <MainLayout>
                  <ProtectedRoute>
                    <ProjectForm />
                  </ProtectedRoute>
                </MainLayout>
              }
            />
            <Route
              path="footer-form"
              element={
                <MainLayout>
                  <ProtectedRoute>
                    <FooterLinksForm />
                  </ProtectedRoute>
                </MainLayout>
              }
            />
            <Route
              path="certificate-form"
              element={
                <MainLayout>
                  <ProtectedRoute>
                    <CertificateForm />
                  </ProtectedRoute>
                </MainLayout>
              }
            />
            <Route
              path="personal-info"
              element={
                <MainLayout>
                  <ProtectedRoute>
                    <PersonalInfo />
                  </ProtectedRoute>
                </MainLayout>
              }
            />
            <Route
              path="education-form"
              element={
                <MainLayout>
                  <ProtectedRoute>
                    <EducationForm />
                  </ProtectedRoute>
                </MainLayout>
              }
            />
            <Route
              path="avatar"
              element={
                <MainLayout>
                  <ProtectedRoute>
                    <AvatarPage />
                  </ProtectedRoute>
                </MainLayout>
              }
            />
            <Route
              path="*"
              element={
                <MainLayout>
                  
                    <NotFound />
                  
                </MainLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
};

export default App;
