import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import LawyerProfile from './pages/LawyerProfile';
import FindLawyer from './pages/FindLawyer';
import DocumentAnalysis from './pages/DocumentAnalysis';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import './App.css'; // Import the modern styles

function App() {
    return (
        <AuthProvider>
            <LanguageProvider>
                <Router>
                    <div className="app-container">
                        <Navbar />
                        <main className="main-content">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/verify-email/:token" element={<VerifyEmail />} />
                                <Route path="/find-lawyer" element={<FindLawyer />} />
                                <Route path="/lawyer/:id" element={<LawyerProfile />} />
                                <Route 
                                    path="/dashboard" 
                                    element={
                                        <PrivateRoute>
                                            <Dashboard />
                                        </PrivateRoute>
                                    } 
                                />
                                <Route 
                                    path="/document-analysis" 
                                    element={
                                        <PrivateRoute>
                                            <DocumentAnalysis />
                                        </PrivateRoute>
                                    } 
                                />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </LanguageProvider>
        </AuthProvider>
    );
}

export default App;

// App.jsx or Home.jsx
export default function StepsSection() {
  return (
    <section className="lt-steps-section">
      <div className="lt-steps">
        {[1, 2, 3].map((step) => {
          const stepContent = [
            {
              title: 'Choose Your Legal Form',
              text: 'Browse 160+ legal contracts & documents.',
            },
            {
              title: 'Answer Simple Questions',
              text: 'Our contract creator customizes your form.',
            },
            {
              title: 'Download & Sign',
              text: 'Download, print, or e-sign your legal document.',
            },
          ][step - 1];

          return (
            <div key={step} className="lt-step card fade-in-up">
              <span className="lt-step-num gradient-text">{step}</span>
              <h3>{stepContent.title}</h3>
              <p>{stepContent.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

