const express = require('express');
const router = express.Router();

// Example routes (replace with your actual routes)
router.post('/login', (req, res) => {
    res.json({ message: 'Login route' });
});

router.post('/register', (req, res) => {
    res.json({ message: 'Register route' });
});

// IMPORTANT: Make sure this line exists at the end
module.exports = router;
