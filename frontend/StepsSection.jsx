// components/Home/StepsSection.jsx
import React from 'react';
import './StepsSection.css'; // Optional: if you want component-specific CSS

export default function StepsSection() {
  return (
    <section className="lt-steps-section">
      <div className="lt-steps">
        {[1, 2, 3].map((step) => {
          const stepContent = [
            {
              title: 'Choose Your Legal Form',
              text: 'Browse 160+ legal contracts & documents.',
            },
            {
              title: 'Answer Simple Questions',
              text: 'Our contract creator customizes your form.',
            },
            {
              title: 'Download & Sign',
              text: 'Download, print, or e-sign your legal document.',
            },
          ][step - 1];

          return (
            <div key={step} className="lt-step card fade-in-up">
              <span className="lt-step-num gradient-text">{step}</span>
              <h3>{stepContent.title}</h3>
              <p>{stepContent.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
