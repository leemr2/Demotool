import React, { useState, useEffect } from 'react';
import { marketplaceService } from '../../services/api';
import { useDemoContext } from '../../context/DemoContext';

const MarketplaceBrowser = () => {
  const [knowledgeBases, setKnowledgeBases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('browse');
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: "I can help you find the perfect knowledge base for your needs. What specific features or content are you looking for?" }
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState(null);
  
  const { selectedPersona, setCurrentStep } = useDemoContext();

  useEffect(() => {
    loadKnowledgeBases();
  }, []);

  const loadKnowledgeBases = async () => {
    try {
      // In a real app, this would filter based on the selected persona
      const response = await marketplaceService.getAvailableKnowledgeBases();
      
      // Check if response has data property and it's an array
      const data = response && response.data ? response.data : [];
      
      if (Array.isArray(data) && data.length > 0) {
        // Adding mock data fields for the demo
        const enhancedData = data.map(kb => ({
          ...kb,
          llmReliabilityScore: (Math.random() * 2 + 8).toFixed(1), // Random score between 8.0-10.0
          publisher: getRandomPublisher(),
          publisherType: getRandomPublisherType()
        }));
        
        setKnowledgeBases(enhancedData);
      } else {
        // If no data or empty array, create demo data directly
        const demoData = [
          {
            id: '1',
            title: 'Medical Procedures Guide',
            description: 'Comprehensive guide for common medical procedures and best practices',
            summary: 'Essential reference for medical practitioners',
            price: 299.99,
            rating: 4.8,
            llmReliabilityScore: '9.2',
            publisher: 'Healthcare AI Consortium',
            publisherType: 'Organization'
          },
          {
            id: '2',
            title: 'Legal Documentation Templates',
            description: 'Standard legal document templates and guidelines for professionals',
            summary: 'Complete collection of legal templates and filings',
            price: 199.99,
            rating: 4.6,
            llmReliabilityScore: '8.9',
            publisher: 'Legal AI Alliance',
            publisherType: 'Institution'
          },
          {
            id: '3',
            title: 'Clinical Guidelines Database',
            description: 'Evidence-based clinical guidelines for diagnosis and treatment',
            summary: 'Medical guidelines from leading institutions',
            price: 349.99,
            rating: 4.9,
            llmReliabilityScore: '9.7',
            publisher: 'MIT Media Lab',
            publisherType: 'Research Group'
          }
        ];
        setKnowledgeBases(demoData);
      }
    } catch (err) {
      console.error('Marketplace error:', err);
      setError('Failed to load knowledge bases');
      
      // Load fallback data even when there's an error
      const fallbackData = [
        {
          id: 'fallback-1',
          title: 'Medical Knowledge Database',
          description: 'Comprehensive medical reference for healthcare AI applications',
          summary: 'Complete medical knowledge base with symptoms, diagnoses, and treatments',
          price: 299.99,
          rating: 4.7,
          llmReliabilityScore: '9.3',
          publisher: 'OpenAI Research',
          publisherType: 'Organization'
        },
        {
          id: 'fallback-2',
          title: 'Legal Reference Library',
          description: 'Comprehensive legal knowledge base for AI legal assistants',
          summary: 'Legal precedents, statutes, and regulatory information',
          price: 249.99,
          rating: 4.5,
          llmReliabilityScore: '9.1',
          publisher: 'Stanford NLP Group',
          publisherType: 'Institution'
        }
      ];
      setKnowledgeBases(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const getRandomPublisher = () => {
    const publishers = [
      'OpenAI Research', 'Stanford NLP Group', 'MIT Media Lab', 
      'Google Research', 'Healthcare AI Consortium', 'Legal AI Alliance',
      'Financial Data Experts', 'Educational Content Partners', 'IBM Watson Team'
    ];
    return publishers[Math.floor(Math.random() * publishers.length)];
  };

  const getRandomPublisherType = () => {
    const types = ['Organization', 'Institution', 'Government', 'Individual Expert', 'Research Group'];
    return types[Math.floor(Math.random() * types.length)];
  };

  const filteredBases = knowledgeBases.filter(kb =>
    kb.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    kb.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    kb.publisher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!messageInput.trim()) return;
    
    // Add user message
    const updatedMessages = [
      ...chatMessages,
      { role: 'user', content: messageInput }
    ];
    
    setChatMessages(updatedMessages);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateChatResponse(messageInput);
      setChatMessages([
        ...updatedMessages,
        { role: 'assistant', content: aiResponse }
      ]);
    }, 500);
    
    setMessageInput('');
  };

  const generateChatResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    // Recommend knowledge bases based on input keywords
    if (lowerInput.includes('healthcare') || lowerInput.includes('medical') || lowerInput.includes('patient')) {
      return "Based on your interest in healthcare, I recommend the 'Medical Knowledge Graph' or 'Clinical Guidelines Database'. Both have high reliability scores and are published by respected medical institutions.";
    } else if (lowerInput.includes('legal') || lowerInput.includes('law') || lowerInput.includes('contract')) {
      return "For legal applications, the 'Legal Precedent Database' would be perfect. It has a 9.5 reliability score and is published by the Legal AI Alliance, a consortium of law firms.";
    } else if (lowerInput.includes('finance') || lowerInput.includes('banking') || lowerInput.includes('investment')) {
      return "I recommend the 'Financial Regulations KB' for your finance-related needs. It's published by the Financial Data Experts with a 9.8 reliability score and is updated daily.";
    } else if (lowerInput.includes('explain') || lowerInput.includes('what is') || lowerInput.includes('how')) {
      return "Knowledge bases are curated collections of information that help AI models provide more accurate, domain-specific responses. They reduce hallucinations and improve the reliability of AI outputs by grounding responses in verified data.";
    } else {
      return "Thanks for sharing your needs. Based on your input, I'd suggest exploring our marketplace using the Browse tab. You can filter by category or search for specific terms. Look for knowledge bases with high reliability scores (9.0+) for the best quality.";
    }
  };

  const handleViewDetails = (kb) => {
    setSelectedKnowledgeBase(kb);
  };

  const handlePurchase = (kb) => {
    console.log('Purchased KB:', kb.id);
    alert(`Thank you for purchasing ${kb.title}! This is a demo, so no actual purchase was made.`);
    // In a real app, this would handle the purchase flow
  };

  const handleBackToSetup = () => {
    setCurrentStep(1); // Go back to WelcomeSetup
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Knowledge Base Marketplace
          {selectedPersona && <span className="ml-2 text-blue-600">for {selectedPersona.title}</span>}
        </h2>
        <button
          onClick={handleBackToSetup}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Setup
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-3 px-6 font-medium ${activeTab === 'browse' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            onClick={() => setActiveTab('browse')}
          >
            Browse
          </button>
          <button
            className={`py-3 px-6 font-medium ${activeTab === 'chat' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            onClick={() => setActiveTab('chat')}
          >
            Chat Assistance
          </button>
        </div>

        {activeTab === 'browse' && (
          <div className="p-6">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search knowledge bases by title, description, or publisher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {loading && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading knowledge bases...</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {!loading && !error && filteredBases.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">No knowledge bases found matching your search.</p>
              </div>
            )}

            {!loading && !error && filteredBases.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBases.map((kb) => (
                  <div
                    key={kb.id}
                    className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {kb.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{kb.description}</p>
                    
                    <div className="bg-gray-50 rounded p-3 mb-4">
                      <div className="text-sm text-gray-500 mb-1">Summary</div>
                      <p className="text-gray-700">{kb.summary || kb.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-blue-50 rounded p-2">
                        <div className="text-xs text-blue-600 font-medium">Publisher</div>
                        <div className="text-gray-800">{kb.publisher}</div>
                        <div className="text-xs text-gray-500">{kb.publisherType}</div>
                      </div>
                      <div className="bg-green-50 rounded p-2">
                        <div className="text-xs text-green-600 font-medium">Reliability Score</div>
                        <div className="flex items-center">
                          <span className="text-gray-800 font-bold">{kb.llmReliabilityScore}/10</span>
                          <div className="ml-2 w-4 h-4 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-xs text-gray-500">Verified by AI experts</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-gray-600">{kb.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">(User Rating)</span>
                      </div>
                      <span className="text-lg font-semibold text-blue-600">
                        ${kb.price}
                      </span>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <button
                        className="flex-1 py-2 px-4 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        onClick={() => handleViewDetails(kb)}
                      >
                        View Details
                      </button>
                      <button
                        className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={() => handlePurchase(kb)}
                      >
                        Purchase
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="p-6">
            <div className="border rounded-lg overflow-hidden bg-gray-50">
              {/* Chat messages area */}
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <div className="whitespace-pre-line">{message.content}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Chat input area */}
              <div className="border-t border-gray-200 p-3 bg-white">
                <form onSubmit={handleSendMessage} className="flex">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Ask about knowledge bases, features, or recommendations..."
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                    disabled={!messageInput.trim()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedKnowledgeBase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{selectedKnowledgeBase.title}</h3>
                <button 
                  onClick={() => setSelectedKnowledgeBase(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-2">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-700">{selectedKnowledgeBase.description}</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">What you'll get</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Comprehensive domain knowledge for your AI application</li>
                      <li>Regularly updated content from authoritative sources</li>
                      <li>Easy integration with major AI platforms</li>
                      <li>Technical support for implementation</li>
                      <li>Access to future updates for 12 months</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-blue-600">${selectedKnowledgeBase.price}</div>
                    <div className="text-gray-500">One-time purchase</div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">User Rating</span>
                      <span className="font-medium text-gray-900">
                        <span className="text-yellow-400">★</span> {selectedKnowledgeBase.rating}/5
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">LLM Reliability</span>
                      <span className="font-medium text-gray-900">{selectedKnowledgeBase.llmReliabilityScore}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Publisher</span>
                      <span className="font-medium text-gray-900">{selectedKnowledgeBase.publisher}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Publisher Type</span>
                      <span className="font-medium text-gray-900">{selectedKnowledgeBase.publisherType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Updated</span>
                      <span className="font-medium text-gray-900">June 2023</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handlePurchase(selectedKnowledgeBase)}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Purchase Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplaceBrowser; 