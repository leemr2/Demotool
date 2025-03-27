// Remove unused imports
// import pdfParse from 'pdf-parse';
// import mammoth from 'mammoth';

export const processFile = async (file) => {
  const fileType = file.type;
  // Default to 10MB if not defined
  const maxSize = parseInt(process.env.REACT_APP_MAX_FILE_SIZE || '10485760');
  
  // Check file size
  if (file.size > maxSize) {
    throw new Error(`File size exceeds ${maxSize / 1024 / 1024}MB limit`);
  }

  // Default allowed types if not defined
  const allowedTypes = (process.env.REACT_APP_ALLOWED_FILE_TYPES || '.pdf,.doc,.docx,.txt,.md').split(',');
  if (!allowedTypes.some(type => file.name.toLowerCase().endsWith(type))) {
    throw new Error('File type not supported');
  }

  try {
    let content = '';
    let metadata = {
      title: file.name,
      type: fileType,
      size: file.size,
      lastModified: new Date(file.lastModified).toISOString(),
    };

    // For demo purposes, we'll simulate processing instead of actually processing
    // This avoids issues with browser compatibility for pdf-parse and mammoth
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate different processing based on file type
        if (fileType === 'application/pdf') {
          metadata = {
            ...metadata,
            pageCount: Math.floor(Math.random() * 20) + 1,
            author: 'Sample Author',
          };
          content = 'This is simulated PDF content for demonstration purposes.';
        } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                  fileType === 'application/msword') {
          metadata = {
            ...metadata,
            author: 'Sample Author',
          };
          content = 'This is simulated Word document content for demonstration purposes.';
        } else if (fileType === 'text/plain' || fileType === 'text/markdown') {
          content = 'This is simulated text content for demonstration purposes.';
        }

        resolve({
          content,
          metadata,
          status: 'success',
        });
      }, 1000); // Simulate processing delay
    });
  } catch (error) {
    console.error('File processing error:', error);
    throw new Error('Failed to process file');
  }
};

export const extractKeywords = (text) => {
  // Simple keyword extraction (can be enhanced with NLP libraries)
  const words = text.toLowerCase().split(/\s+/);
  const stopWords = new Set(['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i']);
  
  const wordFreq = {};
  words.forEach(word => {
    if (!stopWords.has(word) && word.length > 3) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });

  return Object.entries(wordFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word);
};

export const generateKnowledgeMap = (content) => {
  const keywords = extractKeywords(content);
  
  // Generate a simple knowledge map structure
  const nodes = keywords.map((keyword, index) => ({
    id: `node-${index}`,
    label: keyword,
    type: 'keyword',
    size: 1,
  }));

  const links = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (Math.random() > 0.5) { // Random connections for demo
        links.push({
          source: nodes[i].id,
          target: nodes[j].id,
          type: 'related',
          strength: Math.random(),
        });
      }
    }
  }

  return {
    nodes,
    links,
  };
}; 