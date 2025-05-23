// const pdf = require('pdf-parse');
// const fs = require('fs');
// const natural = require('natural');
// const { TfIdf } = natural;

// // Extract text from PDF
// exports.extractTextFromPDF = async(filePath) => {
//     try {
//         const dataBuffer = fs.readFileSync(filePath);
//         const data = await pdf(dataBuffer);
//         return data.text;
//     } catch (error) {
//         throw new Error(`Error extracting text from PDF: ${error.message}`);
//     }
// };

// // Analyze legal document
// exports.analyzeLegalDocument = async(filePath) => {
//     try {
//         // Extract text from PDF
//         const text = await this.extractTextFromPDF(filePath);

//         // Generate summary (basic implementation)
//         const summary = generateSummary(text);

//         // Extract key terms
//         const keyTerms = extractKeyTerms(text);

//         // Identify risk factors
//         const riskFactors = identifyRiskFactors(text);

//         // Extract parties
//         const parties = extractParties(text);

//         // Extract dates
//         const dates = extractDates(text);

//         return {
//             summary,
//             keyTerms,
//             riskFactors,
//             parties,
//             dates,
//         };
//     } catch (error) {
//         throw new Error(`Error analyzing legal document: ${error.message}`);
//     }
// };

// // Generate a basic summary
// function generateSummary(text) {
//     // Basic implementation: Take first 500 characters or find first paragraph
//     const firstParagraph = text.split('\n\n')[0];
//     return firstParagraph.length > 500 ?
//         firstParagraph.substring(0, 500) + '...' :
//         firstParagraph;
// }

// // Extract key terms using TF-IDF
// function extractKeyTerms(text) {
//     const tfidf = new TfIdf();

//     // Add document
//     tfidf.addDocument(text);

//     // Get top 10 terms
//     const terms = [];
//     tfidf.listTerms(0).slice(0, 10).forEach(item => {
//         terms.push(item.term);
//     });

//     return terms;
// }

// // Identify potential risk factors
// function identifyRiskFactors(text) {
//     const riskKeywords = [
//         'liability', 'risk', 'penalty', 'termination', 'dispute',
//         'breach', 'damages', 'litigation', 'lawsuit', 'claim',
//         'indemnity', 'limitation', 'warranty', 'representation'
//     ];

//     const risks = [];

//     // Check for each risk keyword
//     riskKeywords.forEach(keyword => {
//         if (text.toLowerCase().includes(keyword.toLowerCase())) {
//             // Get the sentence containing the keyword
//             const regex = new RegExp(`[^.!?]*(?<=[.!?\\s])${keyword}(?=[\\s.!?])[^.!?]*[.!?]`, 'gi');
//             const matches = text.match(regex);

//             if (matches) {
//                 matches.forEach(match => {
//                     risks.push(match.trim());
//                 });
//             }
//         }
//     });

//     return [...new Set(risks)]; // Remove duplicates
// }

// // Extract parties mentioned in the document
// function extractParties(text) {
//     // This is a simplified implementation
//     // Real implementation would use NER (Named Entity Recognition)
//     const partyIndicators = ['party', 'parties', 'between', 'and', 'plaintiff', 'defendant'];
//     const parties = [];

//     // Simple regex to find company names (very basic)
//     const companyRegex = /([A-Z][a-z]+ )+(?:LLC|Inc\.|Corp\.|Corporation|Company|Ltd\.)/g;
//     const companies = text.match(companyRegex);

//     if (companies) {
//         parties.push(...companies);
//     }

//     return [...new Set(parties)]; // Remove duplicates
// }

// // Extract dates from the document
// function extractDates(text) {
//     // Match common date formats
//     const dateRegex = /\b\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}\b|\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\b/g;
//     const dateMatches = text.match(dateRegex);

//     const dates = [];
//     if (dateMatches) {
//         dateMatches.forEach(match => {
//             try {
//                 const date = new Date(match);
//                 if (!isNaN(date.getTime())) {
//                     dates.push(date);
//                 }
//             } catch (e) {
//                 // Invalid date format, skip
//             }
//         });
//     }

//     return dates;
// }

// My Updated Code:
const pdfParse = require('pdf-parse');

// Define keywords for highlighting
const RISK_KEYWORDS = [
  'liable', 'penalty', 'breach', 'termination', 'indemnify', 'risk',
  'damages', 'forfeit', 'void', 'cancel', 'sue', 'lawsuit', 'default',
  'liquidated damages', 'force majeure', 'non-disclosure violation'
];

const SAFE_KEYWORDS = [
  'agreement', 'party', 'term', 'compliance', 'obligation', 'warranty',
  'standard', 'normal', 'usual', 'customary', 'reasonable', 'mutual',
  'good faith', 'best efforts', 'commercially reasonable'
];

class PDFAnalyzer {
  async analyzePDF(buffer) {
    try {
      const data = await pdfParse(buffer);
      const sentences = data.text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 10);
      
      const analyzedSentences = sentences.map((sentence, index) => {
        const lowerSentence = sentence.toLowerCase();
        let color = 'neutral';
        let riskLevel = 'normal';
        let explanation = '';
        
        // Check for risk keywords
        const riskKeywords = RISK_KEYWORDS.filter(keyword => 
          lowerSentence.includes(keyword)
        );
        
        // Check for safe keywords
        const safeKeywords = SAFE_KEYWORDS.filter(keyword => 
          lowerSentence.includes(keyword)
        );
        
        if (riskKeywords.length > 0) {
          color = 'red';
          riskLevel = 'high';
          explanation = `Risk detected: Contains ${riskKeywords.join(', ')}`;
        } else if (safeKeywords.length > 0) {
          color = 'green';
          riskLevel = 'low';
          explanation = `Standard clause: Contains ${safeKeywords.join(', ')}`;
        }
        
        return {
          id: index,
          text: sentence.trim(),
          color: color,
          riskLevel: riskLevel,
          explanation: explanation,
          keywords: [...riskKeywords, ...safeKeywords]
        };
      });
      
      return {
        success: true,
        totalSentences: sentences.length,
        analyzedText: analyzedSentences,
        riskSummary: this.generateRiskSummary(analyzedSentences),
        suggestions: this.generateSuggestions(analyzedSentences)
      };
    } catch (error) {
      throw new Error(`PDF analysis failed: ${error.message}`);
    }
  }
  
  generateRiskSummary(sentences) {
    const riskSentences = sentences.filter(s => s.color === 'red').length;
    const safeSentences = sentences.filter(s => s.color === 'green').length;
    const totalSentences = sentences.length;
    
    return {
      riskSentences,
      safeSentences,
      neutralSentences: totalSentences - riskSentences - safeSentences,
      riskPercentage: Math.round((riskSentences / totalSentences) * 100),
      overallRisk: riskSentences > totalSentences * 0.3 ? 'High' : 
                   riskSentences > totalSentences * 0.1 ? 'Medium' : 'Low'
    };
  }
  
  generateSuggestions(sentences) {
    const riskSentences = sentences.filter(s => s.color === 'red');
    const suggestions = [];
    
    if (riskSentences.length > 0) {
      suggestions.push('Consider reviewing liability clauses with a legal expert');
      suggestions.push('Negotiate caps on damages and penalties');
      suggestions.push('Add dispute resolution mechanisms');
    }
    
    return suggestions;
  }
  
  async getChatResponse(question, analyzedText) {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('risk') || lowerQuestion.includes('danger')) {
      const riskSentences = analyzedText.filter(s => s.color === 'red');
      return `Found ${riskSentences.length} potential risk areas. Main concerns: ${riskSentences.slice(0, 3).map(s => s.explanation).join('; ')}`;
    }
    
    if (lowerQuestion.includes('change') || lowerQuestion.includes('modify')) {
      return 'Suggested modifications: 1) Add liability caps, 2) Include termination notice periods, 3) Specify dispute resolution process, 4) Add force majeure clauses.';
    }
    
    if (lowerQuestion.includes('safe') || lowerQuestion.includes('good')) {
      const safeSentences = analyzedText.filter(s => s.color === 'green');
      return `Found ${safeSentences.length} standard/safe clauses. These appear to follow industry best practices.`;
    }
    
    return 'I can help analyze contract risks, suggest modifications, or explain specific clauses. Try asking about risks, changes, or specific terms.';
  }
}

module.exports = new PDFAnalyzer();
