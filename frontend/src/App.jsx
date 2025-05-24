// App.jsx
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
import './App.css'; // global styles

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
