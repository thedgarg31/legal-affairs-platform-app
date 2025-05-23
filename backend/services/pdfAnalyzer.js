const pdfParse = require('pdf-parse');

const RISK_KEYWORDS = [
  'liable', 'liability', 'penalty', 'penalties', 'breach', 'termination', 
  'indemnify', 'indemnification', 'damages', 'forfeit', 'void', 'cancel'
];

class PDFAnalyzer {
  async analyzePDF(buffer) {
    try {
      console.log('Starting PDF analysis...'); // Debug log
      const data = await pdfParse(buffer);
      console.log('PDF parsed, text length:', data.text.length); // Debug log
      
      const sentences = data.text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 10);
      console.log('Found sentences:', sentences.length); // Debug log
      
      const analyzedSentences = sentences.map((sentence, index) => {
        const lowerSentence = sentence.toLowerCase();
        const riskKeywords = RISK_KEYWORDS.filter(keyword => 
          lowerSentence.includes(keyword.toLowerCase())
        );
        
        return {
          id: index,
          text: sentence.trim(),
          riskLevel: riskKeywords.length > 0 ? 'high' : 'normal',
          highlightColor: riskKeywords.length > 0 ? 'red' : 'neutral',
          explanation: riskKeywords.length > 0 ? `Risk detected: ${riskKeywords.join(', ')}` : '',
          keywords: riskKeywords,
          riskScore: riskKeywords.length * 10
        };
      });
      
      const riskSentences = analyzedSentences.filter(s => s.highlightColor === 'red');
      
      return {
        success: true,
        totalSentences: sentences.length,
        analyzedText: analyzedSentences,
        riskSummary: {
          totalRiskSentences: riskSentences.length,
          totalSentences: sentences.length,
          riskPercentage: Math.round((riskSentences.length / sentences.length) * 100),
          overallRiskLevel: riskSentences.length > 2 ? 'HIGH' : 'LOW'
        }
      };
    } catch (error) {
      console.error('PDF analysis error:', error);
      throw new Error(`PDF analysis failed: ${error.message}`);
    }
  }
}

module.exports = new PDFAnalyzer();
