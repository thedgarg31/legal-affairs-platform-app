const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes');
const lawyerRoutes = require('./routes/lawyerRoutes');
const locationRoutes = require('./routes/locationRoutes');

// server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

require('dotenv').config();  // Add this at the very top
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to database
// connectDB();

// Allow all origins for development
app.use(cors({
  origin: 'http://localhost:3000', // Your React app's URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Middleware
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



app.post('/api/analyze', upload.single('file'), async (req, res) => {
  const pdfPath = req.file.path;
  const outputPath = `annotated-${req.file.filename}.pdf`;

  exec(`python3 analyzer.py ${pdfPath} ${outputPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Python error: ${stderr}`);
      return res.status(500).send('Failed to analyze PDF');
    }
    res.download(outputPath, 'analyzed.pdf', () => {
      fs.unlinkSync(pdfPath);
      fs.unlinkSync(outputPath);
    });
  });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
