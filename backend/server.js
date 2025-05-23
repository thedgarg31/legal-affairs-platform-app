const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes');
const lawyerRoutes = require('./routes/lawyerRoutes');
const locationRoutes = require('./routes/locationRoutes');

require('dotenv').config();  // Add this at the very top
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to database
// connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (keep commented for now)
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/lawyers', lawyerRoutes);
app.use('/api/locations', locationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
