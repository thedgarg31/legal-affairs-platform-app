const pdfAnalyzer = require('../services/pdfAnalyzer');

const analyzeDocument = async (req, res) => {
  try {
    console.log('=== ANALYZE ROUTE HIT ===');
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No PDF file uploaded'
      });
    }

    console.log('File received:', req.file.originalname);
    
    // Call the ACTUAL PDF analyzer with the real file buffer
    const analysis = await pdfAnalyzer.analyzePDF(req.file.buffer);
    
    console.log('Real analysis completed for:', req.file.originalname);
    
    res.json({
      success: true,
      filename: req.file.originalname,
      fileSize: req.file.size,
      analysis: analysis,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Document analysis error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  analyzeDocument
};
