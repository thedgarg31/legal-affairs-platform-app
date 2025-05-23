import React from 'react';

// Function to highlight risk keywords in text
export const highlightRiskText = (text, keywords, highlightColor = 'red') => {
  if (!keywords || keywords.length === 0) {
    return <span>{text}</span>;
  }
  
  // Create regex pattern for all keywords
  const pattern = keywords.map(keyword => 
    keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape special regex characters
  ).join('|');
  
  const regex = new RegExp(`(${pattern})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <span>
      {parts.map((part, index) => {
        const isKeyword = keywords.some(keyword => 
          part.toLowerCase() === keyword.toLowerCase()
        );
        
        if (isKeyword) {
          return (
            <mark 
              key={index}
              style={{
                backgroundColor: highlightColor === 'red' ? '#ffebee' : '#e8f5e8',
                color: highlightColor === 'red' ? '#d32f2f' : '#2e7d32',
                padding: '2px 4px',
                borderRadius: '3px',
                fontWeight: 'bold',
                border: `1px solid ${highlightColor === 'red' ? '#f44336' : '#4caf50'}`
              }}
              title={`Risk keyword: ${part}`}
            >
              {part}
            </mark>
          );
        }
        
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};

// Function to get risk level styling
export const getRiskStyling = (riskLevel) => {
  switch (riskLevel) {
    case 'CRITICAL':
      return {
        backgroundColor: '#ffebee',
        borderLeft: '4px solid #f44336',
        color: '#d32f2f'
      };
    case 'HIGH':
      return {
        backgroundColor: '#fff3e0',
        borderLeft: '4px solid #ff9800',
        color: '#f57c00'
      };
    case 'MEDIUM':
      return {
        backgroundColor: '#fff8e1',
        borderLeft: '4px solid #ffc107',
        color: '#f9a825'
      };
    case 'LOW':
      return {
        backgroundColor: '#e8f5e8',
        borderLeft: '4px solid #4caf50',
        color: '#2e7d32'
      };
    default:
      return {
        backgroundColor: 'transparent',
        borderLeft: 'none',
        color: '#ffffff'
      };
  }
};
