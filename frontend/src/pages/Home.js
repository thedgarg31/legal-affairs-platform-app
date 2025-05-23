import React from 'react';

const Home = () => {
    return (
        <div>
            <section className="hero-section">
                <div className="hero-content fade-in-up">
                    <h1 className="hero-title">
                        AI-Powered Legal Document Analysis
                    </h1>
                    <p className="hero-subtitle">
                        Transform your legal workflow with cutting-edge artificial intelligence. 
                        Analyze contracts, identify risks, and get expert recommendations in seconds.
                    </p>
                    <div className="hero-actions">
                        <a href="/document-analysis" className="btn btn-primary">
                            <span className="ai-badge" style={{marginRight: '8px'}}>AI</span>
                            Analyze Document
                        </a>
                        <a href="/find-lawyer" className="btn btn-secondary">
                            Find Expert Lawyer
                        </a>
                    </div>
                </div>
            </section>

            <section style={{ padding: '4rem 2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                        gap: '2rem' 
                    }}>
                        <div className="card fade-in-up">
                            <h3 className="gradient-text" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                                Smart Risk Detection
                            </h3>
                            <p style={{ color: '#a0a0a0', lineHeight: '1.6' }}>
                                Our AI instantly identifies potential risks and problematic clauses in your legal documents.
                            </p>
                        </div>
                        
                        <div className="card fade-in-up">
                            <h3 className="gradient-text" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                                Visual Highlighting
                            </h3>
                            <p style={{ color: '#a0a0a0', lineHeight: '1.6' }}>
                                Get color-coded analysis with red flags for risks and green highlights for safe clauses.
                            </p>
                        </div>
                        
                        <div className="card fade-in-up">
                            <h3 className="gradient-text" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                                Expert Connections
                            </h3>
                            <p style={{ color: '#a0a0a0', lineHeight: '1.6' }}>
                                Connect with qualified lawyers who specialize in your specific legal needs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
