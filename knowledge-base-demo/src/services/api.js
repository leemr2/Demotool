import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3005',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock response function to simulate API calls
const mockResponse = (data, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, delay);
  });
};

// File Processing Service
export const fileService = {
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // For demo purposes, return mock data instead of making actual API calls
      return await mockResponse({
        fileId: `mock-${Date.now()}`,
        status: 'processing',
        message: 'File uploaded successfully',
      });
      
      // Uncomment for real API calls
      // const response = await api.post('/api/process-file', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      // return response.data;
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
  },

  processDocument: async (fileId) => {
    try {
      // For demo purposes, return mock data
      return await mockResponse({
        status: 'completed',
        result: {
          text: 'Processed document content...',
          metadata: {
            title: 'Sample Document',
            author: 'John Doe',
            date: new Date().toISOString(),
          },
        },
      });
      
      // Uncomment for real API calls
      // const response = await api.post(`/api/process-document/${fileId}`);
      // return response.data;
    } catch (error) {
      console.error('Document processing error:', error);
      throw error;
    }
  },
};

// Knowledge Base Service
export const knowledgeBaseService = {
  createKnowledgeBase: async (data) => {
    try {
      // For demo purposes, return mock data
      return await mockResponse({
        id: `kb-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
      });
      
      // Uncomment for real API calls
      // const response = await api.post('/api/knowledge-bases', data);
      // return response.data;
    } catch (error) {
      console.error('Knowledge base creation error:', error);
      throw error;
    }
  },

  getKnowledgeBase: async (id) => {
    try {
      // For demo purposes, return mock data
      return await mockResponse({
        id,
        title: 'Sample Knowledge Base',
        description: 'This is a sample knowledge base for demonstration',
        createdAt: new Date().toISOString(),
      });
      
      // Uncomment for real API calls
      // const response = await api.get(`/api/knowledge-bases/${id}`);
      // return response.data;
    } catch (error) {
      console.error('Knowledge base fetch error:', error);
      throw error;
    }
  },

  updateKnowledgeBase: async (id, data) => {
    try {
      // For demo purposes, return mock data
      return await mockResponse({
        id,
        ...data,
        updatedAt: new Date().toISOString(),
      });
      
      // Uncomment for real API calls
      // const response = await api.put(`/api/knowledge-bases/${id}`, data);
      // return response.data;
    } catch (error) {
      console.error('Knowledge base update error:', error);
      throw error;
    }
  },
};

// AI Service
export const aiService = {
  analyzeDocument: async (documentId) => {
    try {
      return await mockResponse({
        analysis: {
          topics: ['Topic 1', 'Topic 2', 'Topic 3'],
          sentiment: 'positive',
          confidence: 0.85,
        },
      });
    } catch (error) {
      console.error('AI analysis error:', error);
      throw error;
    }
  },

  compareResponses: async (query) => {
    try {
      // Mock data for AI response comparison
      return await mockResponse({
        query,
        timestamp: new Date().toISOString(),
        knowledgeBaseResponse: {
          response: "Based on the knowledge base, the patient's symptoms of persistent cough, fever, and chest pain are consistent with community-acquired pneumonia. The recommended first-line treatment is amoxicillin 500mg three times daily for 5-7 days, with follow-up in 48-72 hours to assess response. If the patient has a penicillin allergy, doxycycline or a macrolide antibiotic would be appropriate alternatives.",
          sources: [
            { title: "Clinical Guidelines for Respiratory Infections", page: 42 },
            { title: "Antibiotic Therapy in Primary Care", page: 78 }
          ],
          confidence: 0.92,
          processingTime: "1.2 seconds"
        },
        genericResponse: {
          response: "It sounds like the patient might have a respiratory infection. Common treatments include antibiotics if it's bacterial, rest, fluids, and over-the-counter medications for symptom relief. The patient should consult with their healthcare provider for a proper diagnosis and treatment plan.",
          confidence: 0.68,
          processingTime: "0.8 seconds"
        }
      }, 1500); // Simulate a longer delay for AI processing
    } catch (error) {
      console.error('AI comparison error:', error);
      throw error;
    }
  },

  generateKnowledgeMap: async (documentId) => {
    try {
      return await mockResponse({
        nodes: [
          { id: '1', label: 'Main Topic', type: 'topic' },
          { id: '2', label: 'Subtopic 1', type: 'subtopic' },
          { id: '3', label: 'Subtopic 2', type: 'subtopic' },
        ],
        links: [
          { source: '1', target: '2', type: 'contains' },
          { source: '1', target: '3', type: 'contains' },
        ],
      });
    } catch (error) {
      console.error('Knowledge map generation error:', error);
      throw error;
    }
  },
};

// Marketplace Service
export const marketplaceService = {
  getAvailableKnowledgeBases: async () => {
    try {
      return await mockResponse([
        {
          id: '1',
          title: 'Medical Procedures Guide',
          description: 'Comprehensive guide for common medical procedures and best practices for healthcare professionals',
          summary: 'Essential reference for medical practitioners containing step-by-step guides for procedures',
          price: 299.99,
          rating: 4.8,
        },
        {
          id: '2',
          title: 'Legal Documentation Templates',
          description: 'Standard legal document templates and guidelines for legal professionals',
          summary: 'Complete collection of legal templates for contracts, agreements, and legal filings',
          price: 199.99,
          rating: 4.6,
        },
        {
          id: '3',
          title: 'Clinical Guidelines Database',
          description: 'Evidence-based clinical guidelines for medical diagnosis and treatment protocols',
          summary: 'Regularly updated medical guidelines from leading healthcare institutions',
          price: 349.99,
          rating: 4.9,
        },
        {
          id: '4',
          title: 'Financial Regulations KB',
          description: 'Comprehensive knowledge base of financial regulations and compliance requirements',
          summary: 'Stay compliant with all financial regulations with this regularly updated knowledge base',
          price: 249.99,
          rating: 4.7,
        },
        {
          id: '5',
          title: 'Educational Curriculum Framework',
          description: 'Structured educational curricula for various subjects and grade levels',
          summary: 'Research-backed curriculum frameworks aligned with educational standards',
          price: 179.99,
          rating: 4.5,
        },
        {
          id: '6',
          title: 'Medical Knowledge Graph',
          description: 'Interconnected medical knowledge graph connecting conditions, treatments, and medications',
          summary: 'Advanced knowledge graph for complex medical reasoning and decision support',
          price: 399.99,
          rating: 4.9,
        },
        {
          id: '7',
          title: 'Legal Precedent Database',
          description: 'Comprehensive database of legal precedents across multiple jurisdictions',
          summary: 'Searchable repository of legal cases and precedents with detailed analysis',
          price: 349.99,
          rating: 4.8,
        },
        {
          id: '8',
          title: 'Product Engineering Standards',
          description: 'Industry standards and specifications for product engineering and manufacturing',
          summary: 'Technical specifications and quality standards for engineering applications',
          price: 229.99,
          rating: 4.4,
        }
      ]);
    } catch (error) {
      console.error('Marketplace fetch error:', error);
      // Return empty array instead of throwing the error to prevent UI error state
      return [];
    }
  },

  purchaseKnowledgeBase: async (id, purchaseData) => {
    try {
      return await mockResponse({
        status: 'success',
        transactionId: `trans-${Date.now()}`,
        message: 'Purchase completed successfully',
      });
    } catch (error) {
      console.error('Purchase error:', error);
      throw error;
    }
  },
};

export default api; 