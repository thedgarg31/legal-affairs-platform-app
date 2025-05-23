// const express = require('express');
// const { analyzeDocument, getChatResponse } = require('../controllers/documentController');
// const upload = require('../middleware/upload');
// const auth = require('../middleware/auth');

// const router = express.Router();

// router.post('/analyze', upload.single('pdf'), analyzeDocument);
// router.post('/chat', auth, getChatResponse);

// module.exports = router;

// Updated Code:
const express = require('express');
const multer = require('multer');
const router = express.Router();

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

// Basic test route
router.get('/test', (req, res) => {
    res.json({ message: 'Document routes working' });
});

// PDF upload route (we'll implement the actual analysis later)
router.post('/analyze', upload.single('pdf'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No PDF file uploaded'
            });
        }

        // For now, just return success
        res.json({
            success: true,
            filename: req.file.originalname,
            message: 'PDF uploaded successfully - analysis coming soon!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;

