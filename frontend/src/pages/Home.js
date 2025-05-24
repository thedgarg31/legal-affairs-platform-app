/*import React from 'react';

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
*/
import React from "react";
import "./Home.css"; // See CSS below

const experts = [
  {
    name: "Kavitha Natesan",
    expertise: "Cheque bounce cases, GST consulting",
    experience: "5 years",
    desc: "Offers practical solutions for legal and tax matters."
  },
  {
    name: "Srijita",
    expertise: "Accident claims, employment issues, consumer complaints",
    experience: "5 years",
    desc: "Provides timely and strategic legal support."
  },
  // ...add more experts
];

const Home = () => (
  <div className="lt-main">
    <header className="lt-hero">
      <h1>
        Create Legal Documents &amp; <span className="lt-accent">Talk to Lawyers</span> Online
      </h1>
      <p>
        Professional legal forms, contracts, and expert advice at your fingertips.<br />
        Save time, money, and stress—get started in minutes!
      </p>
      <div className="lt-cta-row">
        <a href="/document-analysis" className="lt-btn lt-btn-primary">Create Document</a>
        <a href="/find-lawyer" className="lt-btn lt-btn-secondary">Talk to a Lawyer</a>
      </div>
    </header>

    <section className="lt-section lt-how">
      <h2>How It Works</h2>
      <div className="lt-steps">
        <div className="lt-step">
          <span className="lt-step-num">1</span>
          <h3>Choose Your Legal Form</h3>
          <p>Browse 160+ legal contracts &amp; documents.</p>
        </div>
        <div className="lt-step">
          <span className="lt-step-num">2</span>
          <h3>Answer Simple Questions</h3>
          <p>Our contract creator customizes your form.</p>
        </div>
        <div className="lt-step">
          <span className="lt-step-num">3</span>
          <h3>Download &amp; Sign</h3>
          <p>Download, print, or e-sign your legal document.</p>
        </div>
      </div>
    </section>

    <section className="lt-section lt-experts">
      <h2>Our Legal Experts</h2>
      <div className="lt-expert-cards">
        {experts.map((expert, idx) => (
          <div className="lt-expert-card" key={idx}>
            <div className="lt-expert-avatar">{expert.name[0]}</div>
            <div>
              <h3>{expert.name}</h3>
              <p className="lt-expert-exp">{expert.experience} experience</p>
              <p className="lt-expert-desc">{expert.expertise}</p>
              <p className="lt-expert-desc2">{expert.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="lt-section lt-stats">
      <div className="lt-stat">
        <h3>+10</h3>
        <p>Years In Business</p>
      </div>
      <div className="lt-stat">
        <h3>+20M</h3>
        <p>Documents Created</p>
      </div>
      <div className="lt-stat">
        <h3>+2M</h3>
        <p>Registered Customers</p>
      </div>
    </section>

    <section className="lt-section lt-testimonials">
      <h2>What Our Users Say</h2>
      <blockquote>
        “Got the best legal advice for my startup. The team was knowledgeable and responsive. Highly recommended!”
        <footer>— Sai Abhishek</footer>
      </blockquote>
      {/* Add more testimonials as needed */}
    </section>

    <footer className="lt-footer">
      <p>© {new Date().getFullYear()} Legal AI Platform. All rights reserved.</p>
    </footer>
  </div>
);

export default Home;
