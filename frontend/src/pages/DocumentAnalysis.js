import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { analyzeDocument } from '../api/documents';
import { getRiskStyling } from '../utils/highlighter';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const DocumentAnalysis = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [viewMode, setViewMode] = useState('summary');
  const [pdfDoc, setPdfDoc] = useState(null);
  const canvasRef = useRef(null);
  const textLayerRef = useRef(null);

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

  const renderPDFWithHighlights = async () => {
    if (!pdfUrl || !analysis) return;

    try {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      setPdfDoc(pdf);
      
      // Render first page
      const page = await pdf.getPage(1);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      const viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      // Render PDF page
      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;
      
      // Get text content for highlighting
      const textContent = await page.getTextContent();
      
      // Create text layer with highlights
      createHighlightedTextLayer(textContent, viewport);
      
    } catch (error) {
      console.error('Error rendering PDF:', error);
    }
  };

  const createHighlightedTextLayer = (textContent, viewport) => {
    const textLayer = textLayerRef.current;
    textLayer.innerHTML = ''; // Clear previous content
    
    textContent.items.forEach((textItem) => {
      const textDiv = document.createElement('div');
      textDiv.textContent = textItem.str;
      
      // Position the text
      const transform = pdfjsLib.Util.transform(
        viewport.transform,
        textItem.transform
      );
      
      textDiv.style.position = 'absolute';
      textDiv.style.left = transform[4] + 'px';
      textDiv.style.top = (viewport.height - transform[5]) + 'px';
      textDiv.style.fontSize = Math.abs(transform[0]) + 'px';
      textDiv.style.fontFamily = textItem.fontName || 'sans-serif';
      textDiv.style.color = 'transparent'; // Make text transparent
      textDiv.style.pointerEvents = 'none';
      
      // Check if this text contains risk keywords
      const isRisky = analysis.analyzedText.some(sentence => 
        sentence.highlightColor === 'red' && 
        sentence.keywords.some(keyword => 
          textItem.str.toLowerCase().includes(keyword.toLowerCase())
        )
      );
      
      if (isRisky) {
        // Add red highlight for risky text
        textDiv.style.backgroundColor = 'rgba(244, 67, 54, 0.4)';
        textDiv.style.border = '2px solid #f44336';
        textDiv.style.borderRadius = '3px';
        textDiv.style.cursor = 'help';
        textDiv.title = '⚠️ Risk detected in this text';
        
        // Make risky text visible
        textDiv.style.color = '#d32f2f';
        textDiv.style.fontWeight = 'bold';
        textDiv.style.pointerEvents = 'auto';
        
        // Add hover effect
        textDiv.onmouseenter = () => {
          textDiv.style.backgroundColor = 'rgba(244, 67, 54, 0.6)';
          textDiv.style.transform = 'scale(1.05)';
        };
        textDiv.onmouseleave = () => {
          textDiv.style.backgroundColor = 'rgba(244, 67, 54, 0.4)';
          textDiv.style.transform = 'scale(1)';
        };
      }
      
      textLayer.appendChild(textDiv);
    });
  };

  useEffect(() => {
    if (viewMode === 'pdf' && pdfUrl && analysis) {
      renderPDFWithHighlights();
    }
  }, [viewMode, pdfUrl, analysis]);

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
              📄 PDF with Highlights
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
                      <li>View PDF with highlights for visual review</li>
                      <li>Consult with a qualified attorney</li>
                      <li>Prepare negotiation points for contract revision</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* PDF WITH ACTUAL TEXT HIGHLIGHTING */
            <div className="card">
              <h3 className="gradient-text" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                📄 PDF with AI Risk Highlighting
              </h3>
              <p style={{ color: '#a0a0a0', marginBottom: '1.5rem', textAlign: 'center' }}>
                🔴 Red highlights show risky clauses directly on the PDF • Hover for details
              </p>
              
              <div style={{ 
                position: 'relative',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                overflow: 'hidden',
                maxHeight: '800px',
                overflowY: 'auto'
              }}>
                {/* PDF Canvas */}
                <canvas 
                  ref={canvasRef}
                  style={{ 
                    display: 'block',
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                />
                
                {/* Text Layer with Highlights */}
                <div 
                  ref={textLayerRef}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: 'none'
                  }}
                />
                
                {/* Risk Summary Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: 'rgba(244, 67, 54, 0.95)',
                  color: 'white',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  zIndex: 10,
                  boxShadow: '0 4px 15px rgba(244, 67, 54, 0.4)'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>🚨</div>
                    <div>{analysis.riskSummary.totalRiskSentences} Risk Areas</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                      Highlighted in Red
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div style={{ 
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                  <span style={{ color: '#f44336' }}>🔴 Risky Clauses ({analysis.riskSummary.totalRiskSentences} found)</span>
                  <span style={{ color: '#4caf50' }}>🟢 Safe Content</span>
                  <span style={{ color: '#667eea' }}>💡 Hover red text for explanations</span>
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
