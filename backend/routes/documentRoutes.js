console.log('=== DOCUMENT ROUTES FILE LOADED ==='); // Debug line

const express = require('express');
const multer = require('multer');
const { analyzeDocument } = require('../controllers/documentController');
const router = express.Router(); // ONLY ONE router declaration

// Configure multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'));
        }
    }
});

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Document routes working' });
});

// Analyze route
router.post('/analyze', upload.single('pdf'), analyzeDocument);

module.exports = router;
