const pdfAnalyzer = require('../services/pdfAnalyzer');
const Document = require('../models/Document');

const analyzeDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No PDF file uploaded'
      });
    }

    const analysis = await pdfAnalyzer.analyzePDF(req.file.buffer);
    
    // Save document analysis to database
    const document = new Document({
      userId: req.user?.id,
      filename: req.file.originalname,
      analysis: analysis,
      uploadDate: new Date()
    });
    
    await document.save();
    
    res.json({
      success: true,
      documentId: document._id,
      filename: req.file.originalname,
      analysis: analysis
    });
  } catch (error) {
    console.error('Document analysis error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getChatResponse = async (req, res) => {
  try {
    const { question, documentId } = req.body;
    
    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }
    
    const response = await pdfAnalyzer.getChatResponse(question, document.analysis.analyzedText);
    
    res.json({
      success: true,
      response: response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  analyzeDocument,
  getChatResponse
};
