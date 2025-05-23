import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
    const { t } = useLanguage();

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Welcome to Legal Affairs Platform</h1>
            <p>Your AI-powered legal document analyzer and lawyer finder.</p>
            <div style={{ marginTop: '2rem' }}>
                <a href="/document-analysis" style={{ 
                    padding: '1rem 2rem', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    textDecoration: 'none', 
                    borderRadius: '5px',
                    marginRight: '1rem'
                }}>
                    Analyze Document
                </a>
                <a href="/find-lawyer" style={{ 
                    padding: '1rem 2rem', 
                    backgroundColor: '#28a745', 
                    color: 'white', 
                    textDecoration: 'none', 
                    borderRadius: '5px'
                }}>
                    Find Lawyer
                </a>
            </div>
        </div>
    );
};

export default Home;
