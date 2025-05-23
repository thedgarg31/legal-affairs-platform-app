import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { t } = useLanguage();
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <a href="/" className="navbar-brand">
                    Legal AI Platform
                </a>
                <div className="navbar-links">
                    <a href="/" className="navbar-link">{t('home')}</a>
                    <a href="/find-lawyer" className="navbar-link">{t('findLawyer')}</a>
                    <a href="/document-analysis" className="navbar-link">
                        <span className="ai-badge">AI</span> {t('documentAnalysis')}
                    </a>
                    {isAuthenticated ? (
                        <>
                            <a href="/dashboard" className="navbar-link">{t('dashboard')}</a>
                            <button onClick={logout} className="btn-logout">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <a href="/login" className="navbar-link">{t('login')}</a>
                            <a href="/register" className="btn btn-primary">
                                {t('register')}
                            </a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

