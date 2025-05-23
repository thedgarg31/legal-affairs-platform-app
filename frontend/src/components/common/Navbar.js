import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { t } = useLanguage();
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav style={{ 
            padding: '1rem', 
            backgroundColor: '#f8f9fa', 
            borderBottom: '1px solid #dee2e6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div>
                <a href="/" style={{ textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Legal Affairs Platform
                </a>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="/">{t('home')}</a>
                <a href="/find-lawyer">{t('findLawyer')}</a>
                <a href="/document-analysis">{t('documentAnalysis')}</a>
                {isAuthenticated ? (
                    <>
                        <a href="/dashboard">{t('dashboard')}</a>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <a href="/login">{t('login')}</a>
                        <a href="/register">{t('register')}</a>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
