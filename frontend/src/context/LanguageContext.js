import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    // Simple translation function
    const t = (key) => {
        const translations = {
            en: {
                home: 'Home',
                login: 'Login',
                register: 'Register',
                findLawyer: 'Find Lawyer',
                documentAnalysis: 'Document Analysis',
                dashboard: 'Dashboard'
            },
            es: {
                home: 'Inicio',
                login: 'Iniciar Sesión',
                register: 'Registrarse',
                findLawyer: 'Encontrar Abogado',
                documentAnalysis: 'Análisis de Documentos',
                dashboard: 'Panel'
            }
        };
        return translations[language][key] || key;
    };

    const value = {
        language,
        changeLanguage,
        t
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
