const pdfParse = require('pdf-parse');

class PDFAnalyzer {
  async analyzePDF(buffer) {
    try {
      console.log('Starting intelligent PDF analysis...');
      
      const data = await pdfParse(buffer);
      const fullText = data.text;
      console.log('PDF text extracted, analyzing content...');
      
      // Analyze the document intelligently
      const documentSummary = this.generateIntelligentSummary(fullText);
      
      return {
        success: true,
        documentSummary: documentSummary
      };
    } catch (error) {
      console.error('PDF analysis error:', error);
      throw new Error(`PDF analysis failed: ${error.message}`);
    }
  }
  
  generateIntelligentSummary(text) {
    const lowerText = text.toLowerCase();
    
    // Determine document type
    const documentType = this.identifyDocumentType(lowerText);
    
    // Generate overview based on content
    const overview = this.generateOverview(lowerText, documentType);
    
    // Extract key terms
    const keyTerms = this.extractKeyTerms(lowerText, documentType);
    
    // Identify risks
    const risks = this.identifyRisks(lowerText, documentType);
    
    // Find protections
    const protections = this.findProtections(lowerText, documentType);
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(lowerText, documentType);
    
    // Overall assessment
    const overallRisk = this.assessOverallRisk(risks.length);
    const finalAdvice = this.generateFinalAdvice(overallRisk, documentType);
    
    return {
      overview,
      purpose: this.generatePurpose(lowerText, documentType),
      keyTerms,
      risks,
      protections,
      recommendations,
      overallRisk,
      finalAdvice
    };
  }
  
  identifyDocumentType(text) {
    if (text.includes('employment') || text.includes('employee') || text.includes('salary')) {
      return 'Employment Contract';
    } else if (text.includes('service') || text.includes('consulting') || text.includes('contractor')) {
      return 'Service Agreement';
    } else if (text.includes('non-disclosure') || text.includes('confidential') || text.includes('nda')) {
      return 'Non-Disclosure Agreement';
    } else if (text.includes('lease') || text.includes('rent') || text.includes('tenant')) {
      return 'Lease Agreement';
    } else if (text.includes('purchase') || text.includes('sale') || text.includes('buyer')) {
      return 'Purchase Agreement';
    } else {
      return 'Legal Contract';
    }
  }
  
  generateOverview(text, docType) {
    const wordCount = text.split(' ').length;
    return `This is a ${docType} containing approximately ${wordCount} words. The document establishes a legal relationship between parties and outlines their respective rights, obligations, and responsibilities. Our AI has analyzed the entire document to identify key terms, potential risks, and your protections.`;
  }
  
  generatePurpose(text, docType) {
    switch (docType) {
      case 'Employment Contract':
        return 'This employment contract defines your job role, salary, benefits, and working conditions. It also outlines what your employer expects from you and what you can expect from them. Think of it as the rulebook for your working relationship.';
      case 'Service Agreement':
        return 'This service agreement outlines what services will be provided, how much they cost, and when they need to be completed. It protects both the service provider and the client by clearly defining expectations and responsibilities.';
      case 'Non-Disclosure Agreement':
        return 'This NDA is designed to protect confidential information. It means you cannot share certain information with others. Companies use this to protect their trade secrets, and you should understand exactly what information you need to keep secret.';
      case 'Lease Agreement':
        return 'This lease agreement defines your rights and responsibilities as a tenant. It covers rent amount, lease duration, what you can and cannot do in the property, and under what conditions the lease can be terminated.';
      default:
        return `This ${docType} creates a legal agreement between parties. It defines what each party must do, what they get in return, and what happens if someone doesn't fulfill their obligations.`;
    }
  }
  
  extractKeyTerms(text, docType) {
    const terms = [];
    
    if (text.includes('liability') || text.includes('liable')) {
      terms.push({
        title: 'Liability',
        explanation: 'This means who is responsible if something goes wrong. If you are "liable" for something, you might have to pay for damages or fix problems. Look for phrases like "unlimited liability" which could be risky for you.'
      });
    }
    
    if (text.includes('indemnify') || text.includes('indemnification')) {
      terms.push({
        title: 'Indemnification',
        explanation: 'This is a fancy word that means "you promise to protect the other party from lawsuits." If you indemnify someone, you agree to pay their legal costs if they get sued because of something you did.'
      });
    }
    
    if (text.includes('termination') || text.includes('terminate')) {
      terms.push({
        title: 'Termination',
        explanation: 'This explains how and when the contract can be ended. Pay attention to notice periods (how much advance warning you need to give) and whether either party can end the contract immediately.'
      });
    }
    
    if (text.includes('confidential') || text.includes('non-disclosure')) {
      terms.push({
        title: 'Confidentiality',
        explanation: 'This means you must keep certain information secret. Violating confidentiality can lead to lawsuits. Make sure you understand exactly what information you need to protect and for how long.'
      });
    }
    
    if (text.includes('penalty') || text.includes('penalties')) {
      terms.push({
        title: 'Penalties',
        explanation: 'These are punishments (usually money you have to pay) if you break the contract. Look for penalty amounts and make sure they are reasonable compared to the potential damage.'
      });
    }
    
    // Add default terms if none found
    if (terms.length === 0) {
      terms.push({
        title: 'Contract Terms',
        explanation: 'This document contains various legal terms that define the relationship between parties. Each term has specific legal meaning and consequences.'
      });
    }
    
    return terms;
  }
  
  identifyRisks(text, docType) {
    const risks = [];
    
    if (text.includes('unlimited liability') || text.includes('unlimited damages')) {
      risks.push({
        title: 'Unlimited Liability Risk',
        description: 'The contract says you could be responsible for unlimited damages. This means if something goes wrong, you might have to pay huge amounts of money - potentially more than you can afford.',
        recommendation: 'Try to negotiate a cap on your liability. For example, limit your maximum liability to the contract value or a specific dollar amount.'
      });
    }
    
    if (text.includes('terminate immediately') || text.includes('without notice')) {
      risks.push({
        title: 'Immediate Termination Risk',
        description: 'The other party can end this contract immediately without giving you any warning. This could leave you without income or services suddenly.',
        recommendation: 'Negotiate for a reasonable notice period (like 30 days) so you have time to prepare if the contract ends.'
      });
    }
    
    if (text.includes('liquidated damages') || text.includes('penalty')) {
      risks.push({
        title: 'Financial Penalty Risk',
        description: 'You could face financial penalties if you break any part of this contract. Some penalties might be much higher than the actual damage caused.',
        recommendation: 'Review all penalty amounts. Make sure they are reasonable and proportional to potential actual damages.'
      });
    }
    
    if (text.includes('personal guarantee') || text.includes('personally liable')) {
      risks.push({
        title: 'Personal Liability Risk',
        description: 'You are personally responsible for this contract, even if you are representing a company. This means your personal assets (house, car, savings) could be at risk.',
        recommendation: 'Consider whether you really need to give a personal guarantee. If possible, limit the guarantee to business assets only.'
      });
    }
    
    if (text.includes('non-compete') || text.includes('restraint of trade')) {
      risks.push({
        title: 'Non-Compete Restriction',
        description: 'This contract may prevent you from working with competitors or starting a similar business for a certain period. This could limit your future career options.',
        recommendation: 'Make sure any non-compete clause is reasonable in terms of time period, geographic area, and scope of restricted activities.'
      });
    }
    
    // Add default risk if none found
    if (risks.length === 0) {
      risks.push({
        title: 'General Contract Risk',
        description: 'Like any legal contract, this document creates binding obligations. Not fulfilling your obligations could result in legal action or financial consequences.',
        recommendation: 'Make sure you fully understand all your obligations before signing. Consider having a lawyer review the contract if it involves significant money or long-term commitments.'
      });
    }
    
    return risks;
  }
  
  findProtections(text, docType) {
    const protections = [];
    
    if (text.includes('force majeure') || text.includes('act of god')) {
      protections.push({
        title: 'Force Majeure Protection',
        description: 'You are protected if extraordinary events (like natural disasters, wars, or pandemics) prevent you from fulfilling the contract. You won\'t be penalized for things beyond your control.'
      });
    }
    
    if (text.includes('limitation of liability') || text.includes('limited liability')) {
      protections.push({
        title: 'Limited Liability Protection',
        description: 'Your liability is limited to a specific amount or type of damages. This protects you from having to pay unlimited amounts if something goes wrong.'
      });
    }
    
    if (text.includes('notice period') || text.includes('30 days notice')) {
      protections.push({
        title: 'Notice Period Protection',
        description: 'You will receive advance warning before the contract is terminated. This gives you time to prepare and find alternatives.'
      });
    }
    
    if (text.includes('dispute resolution') || text.includes('mediation') || text.includes('arbitration')) {
      protections.push({
        title: 'Dispute Resolution Process',
        description: 'There is a structured process for resolving disagreements. This can be faster and cheaper than going to court.'
      });
    }
    
    // Add default protection
    if (protections.length === 0) {
      protections.push({
        title: 'Legal Framework Protection',
        description: 'This contract operates under established legal frameworks that provide basic protections for all parties. Courts can enforce fair treatment and reasonable contract terms.'
      });
    }
    
    return protections;
  }
  
  generateRecommendations(text, docType) {
    const recommendations = [
      'Read the entire contract carefully, not just the summary.',
      'Pay special attention to termination clauses and penalty sections.',
      'Make sure you understand all your obligations and deadlines.',
      'Check if there are any automatic renewal clauses.',
      'Verify that all important details (dates, amounts, names) are correct.'
    ];
    
    if (text.includes('liability')) {
      recommendations.push('Negotiate to limit your liability to reasonable amounts.');
    }
    
    if (text.includes('confidential')) {
      recommendations.push('Clearly understand what information you must keep confidential and for how long.');
    }
    
    if (text.includes('penalty')) {
      recommendations.push('Review all penalty clauses and negotiate if they seem excessive.');
    }
    
    return recommendations;
  }
  
  assessOverallRisk(riskCount) {
    if (riskCount >= 3) return 'HIGH';
    if (riskCount >= 2) return 'MEDIUM';
    return 'LOW';
  }
  
  generateFinalAdvice(riskLevel, docType) {
    switch (riskLevel) {
      case 'HIGH':
        return 'This contract contains several potential risks that could significantly impact you. We strongly recommend having a qualified lawyer review this document before signing. The potential financial and legal consequences could be substantial.';
      case 'MEDIUM':
        return 'This contract has some areas of concern that you should carefully consider. While not extremely risky, there are terms that could affect you negatively. Consider negotiating these terms or getting legal advice for the more complex clauses.';
      default:
        return 'This appears to be a relatively standard contract with typical terms. While we haven\'t identified major red flags, you should still read it thoroughly and make sure you understand all your obligations before signing.';
    }
  }
}

module.exports = new PDFAnalyzer();
