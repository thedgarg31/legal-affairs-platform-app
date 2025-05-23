const analyzeDocument = async (req, res) => {
  console.log('=== ANALYZE ROUTE HIT ==='); // You should see this in backend terminal
  
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No PDF file uploaded'
      });
    }

    console.log('File received:', req.file.originalname);
    
    // Simple test response for now
    res.json({
      success: true,
      filename: req.file.originalname,
      fileSize: req.file.size,
      analysis: {
        success: true,
        totalSentences: 2,
        analyzedText: [
          {
            id: 0,
            text: "Test sentence with liability risk.",
            riskLevel: 'high',
            highlightColor: 'red',
            explanation: 'Risk detected: liability',
            keywords: ['liability'],
            riskScore: 10
          }
        ],
        riskSummary: {
          totalRiskSentences: 1,
          totalSentences: 2,
          riskPercentage: 50,
          overallRiskLevel: 'HIGH'
        }
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  analyzeDocument
};

