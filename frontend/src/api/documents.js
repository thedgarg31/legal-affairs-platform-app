import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const analyzeDocument = async (file) => {
  const formData = new FormData();
  formData.append('pdf', file);
  
  const response = await axios.post(`${API_BASE}/documents/analyze`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response.data;
};


export const getChatResponse = async (question, documentId) => {
  const response = await axios.post(`${API_BASE}/documents/chat`, {
    question,
    documentId
  });
  
  return response.data;
};
