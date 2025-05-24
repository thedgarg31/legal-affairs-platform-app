import React, { useState } from 'react';
import { analyzeDocument } from '../api/documents';
import { highlightText, getRiskColor } from '../utils/highlighter';

const DocumentAnalysis = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [viewMode, setViewMode] = useState('analysis');

  const handleFileUpload = async (file) => {
  console.log('=== FILE UPLOAD STARTED ===', file.name); // ADD THIS
  
  if (!file || file.type !== 'application/pdf') {
    alert('Please upload a PDF file only.');
    return;
  }

  setLoading(true);
  setUploadedFileName(file.name);
  
  console.log('=== CREATING FILE URL ==='); // ADD THIS
  const fileUrl = URL.createObjectURL(file);
  setPdfUrl(fileUrl);
  
  try {
    console.log('=== CALLING ANALYZE DOCUMENT API ==='); // ADD THIS
    const result = await analyzeDocument(file);
    console.log('=== API RESULT ===', result); // ADD THIS
    
    if (result.success) {
      console.log('=== SETTING ANALYSIS ===', result.analysis); // ADD THIS
      setAnalysis(result.analysis);
      console.log('Analysis completed:', result);
    } else {
      console.log('=== API RETURNED SUCCESS FALSE ==='); // ADD THIS
    }
  } catch (error) {
    console.error('=== API ERROR ===', error); // ADD THIS
    alert('Failed to analyze document. Please try again.');
  } finally {
    console.log('=== SETTING LOADING FALSE ==='); // ADD THIS
    setLoading(false);
  }
};


 /* const handleFileUpload = async (file) => {
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
  };*/

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
      {analysis && (
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '4px' }}>
            <button
              onClick={() => setViewMode('analysis')}
              className={`btn ${viewMode === 'analysis' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ margin: '0 4px', padding: '12px 24px' }}
            >
              🔍 AI Analysis with Highlights
            </button>
            <button
              onClick={() => setViewMode('summary')}
              className={`btn ${viewMode === 'summary' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ margin: '0 4px', padding: '12px 24px' }}
            >
              📊 Risk Summary
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
          {viewMode === 'analysis' && (
            <div className="card">
              <h3 className="gradient-text" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                🔍 AI-Powered Document Analysis with Risk Highlighting
              </h3>
              <p style={{ color: '#a0a0a0', marginBottom: '1.5rem', textAlign: 'center' }}>
                🔴 Red highlights show risky clauses • 🟢 Green shows safe content • Hover for explanations
              </p>
              <div style={{
                backgroundColor: 'white',
                color: '#333',
                padding: '3rem',
                borderRadius: '8px',
                minHeight: '600px',
                fontFamily: 'Times, serif',
                fontSize: '16px',
                lineHeight: '1.8',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                border: '1px solid #e0e0e0',
                maxHeight: '800px',
                overflowY: 'auto',
                position: 'relative'
              }}>
                <div style={{
                  textAlign: 'center',
                  marginBottom: '2rem',
                  borderBottom: '3px solid #333',
                  paddingBottom: '1rem'
                }}>
                  <h2 style={{
                    margin: 0,
                    fontSize: '20px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}>
                    📄 {uploadedFileName}
                  </h2>
                </div>
                <div>
                  {highlightText(analysis.text, analysis.risks, getRiskColor)}
                </div>
              </div>
            </div>
          )}

          {viewMode === 'summary' && (
            <div className="card">
              <h3 className="gradient-text" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                📊 Risk Summary
              </h3>
              <ul style={{ color: '#a0a0a0', fontSize: '1rem' }}>
                {analysis.risks.map((risk, idx) => (
                  <li key={idx}>
                    <strong>{risk.label}</strong>: {risk.description}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {viewMode === 'pdf' && pdfUrl && (
            <div className="card">
              <h3 className="gradient-text" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                📄 Original Uploaded PDF
              </h3>
              <iframe
                src={pdfUrl}
                title="Uploaded PDF"
                style={{ width: '100%', height: '800px', border: 'none' }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentAnalysis;
