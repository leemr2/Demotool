import { http, HttpResponse } from 'msw';

// Mock data
const mockKnowledgeBases = [
  {
    id: '1',
    title: 'Medical Procedures Guide',
    description: 'Comprehensive guide for common medical procedures',
    price: 299.99,
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Legal Documentation Templates',
    description: 'Standard legal document templates and guidelines',
    price: 199.99,
    rating: 4.6,
  },
];

const mockKnowledgeMap = {
  nodes: [
    { id: '1', label: 'Main Topic', type: 'topic' },
    { id: '2', label: 'Subtopic 1', type: 'subtopic' },
    { id: '3', label: 'Subtopic 2', type: 'subtopic' },
  ],
  links: [
    { source: '1', target: '2', type: 'contains' },
    { source: '1', target: '3', type: 'contains' },
  ],
};

// Mock handlers
export const handlers = [
  // File Processing
  http.post('/api/process-file', async () => {
    return HttpResponse.json({
      fileId: 'mock-file-id',
      status: 'processing',
      message: 'File uploaded successfully',
    });
  }),

  http.post('/api/process-document/:fileId', async () => {
    return HttpResponse.json({
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
  }),

  // Knowledge Base
  http.post('/api/knowledge-bases', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      id: 'new-kb-id',
      ...body,
      createdAt: new Date().toISOString(),
    }, { status: 201 });
  }),

  http.get('/api/knowledge-bases/:id', async ({ params }) => {
    const kb = mockKnowledgeBases.find(kb => kb.id === params.id);
    return HttpResponse.json(kb || { error: 'Knowledge base not found' });
  }),

  // AI Analysis
  http.post('/api/ai/analyze/:documentId', async () => {
    return HttpResponse.json({
      analysis: {
        topics: ['Topic 1', 'Topic 2', 'Topic 3'],
        sentiment: 'positive',
        confidence: 0.85,
      },
    });
  }),

  http.post('/api/ai/generate-map/:documentId', async () => {
    return HttpResponse.json(mockKnowledgeMap);
  }),

  // Marketplace
  http.get('/api/marketplace/knowledge-bases', async () => {
    return HttpResponse.json(mockKnowledgeBases);
  }),

  http.post('/api/marketplace/purchase/:id', async () => {
    return HttpResponse.json({
      status: 'success',
      transactionId: 'mock-transaction-id',
      message: 'Purchase completed successfully',
    });
  }),
]; 