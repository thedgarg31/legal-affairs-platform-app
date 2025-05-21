import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
// Load translations from the server
    .use(Backend)
    // Detect user language
    .use(LanguageDetector)
    // Pass i18n instance to react-i18next
    .use(initReactI18next)
    // Initialize i18next
    .init({
        fallbackLng: 'en',
        debug: process.env.NODE_ENV === 'development',

        interpolation: {
            escapeValue: false, // Not needed for React
        },

        // Define namespace
        ns: ['common', 'auth', 'lawyer', 'document', 'maps'],
        defaultNS: 'common',

        // Supported languages
        supportedLngs: ['en', 'hi', 'es', 'fr', 'bn'],

        backend: {
            // Path to translations
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },

        detection: {
            // Order and from where user language should be detected
            order: ['localStorage', 'cookie', 'navigator'],

            // Cache user language on
            caches: ['localStorage', 'cookie'],

            // Optional expire
            cookieExpirationDate: new Date(Date.now() + 30 * 86400000), // 30 days
        },

        react: {
            useSuspense: true,
        },
    });

export default i18n;