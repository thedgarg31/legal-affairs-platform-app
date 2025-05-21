const pdf = require('pdf-parse');
const fs = require('fs');
const natural = require('natural');
const { TfIdf } = natural;

// Extract text from PDF
exports.extractTextFromPDF = async(filePath) => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        return data.text;
    } catch (error) {
        throw new Error(`Error extracting text from PDF: ${error.message}`);
    }
};

// Analyze legal document
exports.analyzeLegalDocument = async(filePath) => {
    try {
        // Extract text from PDF
        const text = await this.extractTextFromPDF(filePath);

        // Generate summary (basic implementation)
        const summary = generateSummary(text);

        // Extract key terms
        const keyTerms = extractKeyTerms(text);

        // Identify risk factors
        const riskFactors = identifyRiskFactors(text);

        // Extract parties
        const parties = extractParties(text);

        // Extract dates
        const dates = extractDates(text);

        return {
            summary,
            keyTerms,
            riskFactors,
            parties,
            dates,
        };
    } catch (error) {
        throw new Error(`Error analyzing legal document: ${error.message}`);
    }
};

// Generate a basic summary
function generateSummary(text) {
    // Basic implementation: Take first 500 characters or find first paragraph
    const firstParagraph = text.split('\n\n')[0];
    return firstParagraph.length > 500 ?
        firstParagraph.substring(0, 500) + '...' :
        firstParagraph;
}

// Extract key terms using TF-IDF
function extractKeyTerms(text) {
    const tfidf = new TfIdf();

    // Add document
    tfidf.addDocument(text);

    // Get top 10 terms
    const terms = [];
    tfidf.listTerms(0).slice(0, 10).forEach(item => {
        terms.push(item.term);
    });

    return terms;
}

// Identify potential risk factors
function identifyRiskFactors(text) {
    const riskKeywords = [
        'liability', 'risk', 'penalty', 'termination', 'dispute',
        'breach', 'damages', 'litigation', 'lawsuit', 'claim',
        'indemnity', 'limitation', 'warranty', 'representation'
    ];

    const risks = [];

    // Check for each risk keyword
    riskKeywords.forEach(keyword => {
        if (text.toLowerCase().includes(keyword.toLowerCase())) {
            // Get the sentence containing the keyword
            const regex = new RegExp(`[^.!?]*(?<=[.!?\\s])${keyword}(?=[\\s.!?])[^.!?]*[.!?]`, 'gi');
            const matches = text.match(regex);

            if (matches) {
                matches.forEach(match => {
                    risks.push(match.trim());
                });
            }
        }
    });

    return [...new Set(risks)]; // Remove duplicates
}

// Extract parties mentioned in the document
function extractParties(text) {
    // This is a simplified implementation
    // Real implementation would use NER (Named Entity Recognition)
    const partyIndicators = ['party', 'parties', 'between', 'and', 'plaintiff', 'defendant'];
    const parties = [];

    // Simple regex to find company names (very basic)
    const companyRegex = /([A-Z][a-z]+ )+(?:LLC|Inc\.|Corp\.|Corporation|Company|Ltd\.)/g;
    const companies = text.match(companyRegex);

    if (companies) {
        parties.push(...companies);
    }

    return [...new Set(parties)]; // Remove duplicates
}

// Extract dates from the document
function extractDates(text) {
    // Match common date formats
    const dateRegex = /\b\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}\b|\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\b/g;
    const dateMatches = text.match(dateRegex);

    const dates = [];
    if (dateMatches) {
        dateMatches.forEach(match => {
            try {
                const date = new Date(match);
                if (!isNaN(date.getTime())) {
                    dates.push(date);
                }
            } catch (e) {
                // Invalid date format, skip
            }
        });
    }

    return dates;
}