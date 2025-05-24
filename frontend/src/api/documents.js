import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const analyzeDocument = async (file) => {
  const formData = new FormData();
  formData.append('pdf', file);
  
  const response = await axios.post(`${API_BASE}/documents/analyze`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    timeout: 30000 // 30 second timeout for large files
  });
  
  return response.data;
};
