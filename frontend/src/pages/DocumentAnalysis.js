import React, { useState } from 'react';
import { analyzeDocument } from '../api/documents';
import { highlightRiskText, getRiskStyling } from '../utils/highlighter';

const DocumentAnalysis = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [viewMode, setViewMode] = useState('summary');

  const handleFileUpload = async (file) => {
    if (!file || file.type !== 'application/pdf') {
      alert('Please upload a PDF file only.');
      return;
    }

    setLoading(true);
    setUploadedFileName(file.name);
    
    const fileUrl = URL.createObjectURL(file);
    setPdfUrl(fileUrl);
    
    try {
      const result = await analyzeDocument(file);
      if (result.success) {
        setAnalysis(result.analysis);
        console.log('Analysis completed:', result);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Failed to analyze document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div className="fade-in-up">
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>
          <span className="ai-badge" style={{ marginRight: '12px' }}>AI</span>
          Document Risk Analysis
        </h1>
        <p style={{ textAlign: 'center', color: '#a0a0a0', marginBottom: '3rem', fontSize: '1.1rem' }}>
          Upload your legal document and get instant AI-powered risk assessment with highlighted problematic clauses
        </p>
      </div>

      {/* File Upload Area */}
      <div 
        className={`card ${dragActive ? 'drag-active' : ''}`}
        style={{ 
          marginBottom: '2rem',
          border: dragActive ? '2px dashed #667eea' : '2px dashed rgba(255,255,255,0.2)',
          backgroundColor: dragActive ? 'rgba(102, 126, 234, 0.1)' : 'rgba(255,255,255,0.05)',
          textAlign: 'center',
          padding: '3rem',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input').click()}
      >
        <input
          id="file-input"
          type="file"
          accept="application/pdf"
          onChange={handleFileInput}
          style={{ display: 'none' }}
          disabled={loading}
        />
        
        {loading ? (
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔄</div>
            <h3 className="gradient-text">Analyzing Document...</h3>
            <p style={{ color: '#a0a0a0' }}>AI is processing your PDF for risks</p>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
            <h3 className="gradient-text">Drop PDF Here or Click to Upload</h3>
            <p style={{ color: '#a0a0a0' }}>Supported format: PDF files only</p>
            {uploadedFileName && (
              <p style={{ color: '#667eea', marginTop: '1rem', fontWeight: 'bold' }}>
                📎 Last uploaded: {uploadedFileName}
              </p>
            )}
          </div>
        )}
      </div>

      {/* View Mode Toggle */}
      {analysis && pdfUrl && (
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '4px' }}>
            <button
              onClick={() => setViewMode('summary')}
              className={`btn ${viewMode === 'summary' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ margin: '0 4px', padding: '12px 24px' }}
            >
              📊 Risk Analysis
            </button>
            <button
              onClick={() => setViewMode('pdf')}
              className={`btn ${viewMode === 'pdf' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ margin: '0 4px', padding: '12px 24px' }}
            >
              📄 Original PDF
            </button>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="fade-in-up">
          {viewMode === 'summary' ? (
            <>
              {/* Risk Summary Dashboard */}
              <div className="card" style={{ marginBottom: '2rem' }}>
                <h3 className="gradient-text" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                  🚨 Risk Assessment Summary
                </h3>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    ...getRiskStyling(analysis.riskSummary.overallRiskLevel),
                    padding: '1rem',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <h4>Overall Risk</h4>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                      {analysis.riskSummary.overallRiskLevel}
                    </div>
                  </div>
                  
                  <div style={{
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    border: '1px solid rgba(244, 67, 54, 0.3)',
                    padding: '1rem',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <h4 style={{ color: '#f44336' }}>Risk Sentences</h4>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f44336' }}>
                      {analysis.riskSummary.totalRiskSentences}
                    </div>
                  </div>
                  
                  <div style={{
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    border: '1px solid rgba(255, 152, 0, 0.3)',
                    padding: '1rem',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <h4 style={{ color: '#ff9800' }}>Risk Percentage</h4>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ff9800' }}>
                      {analysis.riskSummary.riskPercentage}%
                    </div>
                  </div>
                  
                  <div style={{
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                    padding: '1rem',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <h4 style={{ color: '#667eea' }}>Total Sentences</h4>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
                      {analysis.riskSummary.totalSentences}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Risk Analysis */}
              <div className="card" style={{ marginBottom: '2rem' }}>
                <h3 className="gradient-text" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                  📋 AI-Powered Risk Analysis with Highlighting
                </h3>
                <p style={{ color: '#a0a0a0', marginBottom: '1.5rem' }}>
                  🔴 Red highlights indicate potentially risky clauses that may be unfavorable to you.
                </p>
                
                <div style={{ 
                  maxHeight: '600px', 
                  overflowY: 'auto',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  {analysis.analyzedText.map((sentence) => (
                    <div
                      key={sentence.id}
                      style={{
                        padding: '12px',
                        margin: '8px 0',
                        borderRadius: '6px',
                        lineHeight: '1.6',
                        backgroundColor: sentence.highlightColor === 'red' ? 'rgba(244, 67, 54, 0.1)' : 'transparent',
                        border: sentence.highlightColor === 'red' ? '1px solid rgba(244, 67, 54, 0.3)' : '1px solid transparent',
                        transition: 'all 0.3s ease'
                      }}
                      title={sentence.explanation}
                    >
                      {sentence.highlightColor === 'red' ? (
                        <div>
                          <div style={{ marginBottom: '8px' }}>
                            {highlightRiskText(sentence.text, sentence.keywords, 'red')}
                          </div>
                          <div style={{ 
                            fontSize: '0.9rem', 
                            color: '#f44336', 
                            fontStyle: 'italic',
                            backgroundColor: 'rgba(244, 67, 54, 0.1)',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            border: '1px solid rgba(244, 67, 54, 0.2)'
                          }}>
                            {sentence.explanation}
                          </div>
                        </div>
                      ) : (
                        <span style={{ color: '#e0e0e0' }}>{sentence.text}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="card">
                <h3 className="gradient-text" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                  🤖 AI Recommendations
                </h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '1.5rem' 
                }}>
                  <div style={{
                    padding: '1.5rem',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(244, 67, 54, 0.3)'
                  }}>
                    <h4 style={{ color: '#f44336', marginBottom: '1rem' }}>🔍 Immediate Actions</h4>
                    <ul style={{ color: '#a0a0a0', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                      <li>Review all red-highlighted clauses with legal counsel</li>
                      <li>Negotiate liability limitations where possible</li>
                      <li>Request clarification on ambiguous termination terms</li>
                    </ul>
                  </div>
                  
                  <div style={{
                    padding: '1.5rem',
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 152, 0, 0.3)'
                  }}>
                    <h4 style={{ color: '#ff9800', marginBottom: '1rem' }}>⚖️ Legal Considerations</h4>
                    <ul style={{ color: '#a0a0a0', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                      <li>Consider adding mutual indemnification clauses</li>
                      <li>Include force majeure protections</li>
                      <li>Define clear termination procedures</li>
                    </ul>
                  </div>
                  
                  <div style={{
                    padding: '1.5rem',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(76, 175, 80, 0.3)'
                  }}>
                    <h4 style={{ color: '#4caf50', marginBottom: '1rem' }}>✅ Next Steps</h4>
                    <ul style={{ color: '#a0a0a0', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                      <li>View original PDF for reference</li>
                      <li>Consult with a qualified attorney</li>
                      <li>Prepare negotiation points for contract revision</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Simple PDF Viewer */
            <div className="card">
              <h3 className="gradient-text" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                📄 Original PDF Document
              </h3>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.3)',
                padding: '2rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                position: 'relative',
                minHeight: '600px'
              }}>
                <iframe
                  src={pdfUrl}
                  width="100%"
                  height="600px"
                  style={{
                    border: 'none',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                  title="PDF Document"
                />
                
                {/* Risk Overlay Indicator */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: 'rgba(244, 67, 54, 0.9)',
                  color: 'white',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  zIndex: 10
                }}>
                  🚨 {analysis.riskSummary.totalRiskSentences} Risk Areas Detected
                </div>
              </div>

              {/* Instructions */}
              <div style={{ 
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <p style={{ color: '#a0a0a0', marginBottom: '0.5rem' }}>
                  <strong>💡 Tip:</strong> Switch to "Risk Analysis" view to see detailed highlighting and explanations of risky terms found in this document.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                  <span style={{ color: '#f44336' }}>🔴 {analysis.riskSummary.totalRiskSentences} High Risk Terms Found</span>
                  <span style={{ color: '#ff9800' }}>⚠️ {analysis.riskSummary.riskPercentage}% Risk Level</span>
                  <span style={{ color: '#667eea' }}>📊 {analysis.riskSummary.totalSentences} Total Sentences Analyzed</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentAnalysis;
