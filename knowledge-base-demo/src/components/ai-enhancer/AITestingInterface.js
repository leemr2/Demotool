import React, { useState } from 'react';
import { aiService } from '../../services/api';

const AITestingInterface = () => {
  const [userQuery, setUserQuery] = useState('');
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ratings, setRatings] = useState({
    knowledgeBase: 0,
    generic: 0
  });

  const runTest = async () => {
    if (!userQuery.trim()) {
      setError('Please enter a question or prompt');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Call the API service to get comparison results
      const response = await aiService.compareResponses(userQuery);
      setTestResults(response.data);
      
      // Reset ratings for new query
      setRatings({
        knowledgeBase: 0,
        generic: 0
      });
    } catch (err) {
      setError('Failed to run AI analysis');
      console.error('AI analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRating = (type, value) => {
    setRatings(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const exportResults = () => {
    if (!testResults) return;
    
    const exportData = {
      query: testResults.query,
      timestamp: testResults.timestamp,
      knowledgeBaseResponse: testResults.knowledgeBaseResponse,
      genericResponse: testResults.genericResponse,
      ratings
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `ai-comparison-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          AI Analysis Testing
        </h2>
        
        <div className="mb-6">
          <label htmlFor="userQuery" className="block text-sm font-medium text-gray-700 mb-1">
            Enter a question or prompt to test
          </label>
          <div className="flex">
            <input
              id="userQuery"
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="e.g., What is the recommended treatment for a patient with persistent cough, fever, and chest pain?"
              className="flex-1 block w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
            />
            <button
              onClick={runTest}
              disabled={loading}
              className={`px-4 py-3 rounded-r-md text-white font-medium
                ${loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {loading ? 'Running...' : 'Run AI Analysis'}
            </button>
          </div>
          {error && (
            <div className="mt-2 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-700">Analyzing responses...</span>
          </div>
        )}

        {testResults && !loading && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Analysis Results
              </h3>
              <button
                onClick={exportResults}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
              >
                Export Results
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Knowledge Base Enhanced Response */}
              <div className="border rounded-lg p-4 bg-blue-50">
                <h4 className="font-medium text-blue-800 mb-2">Knowledge Base Enhanced Response</h4>
                <div className="bg-white rounded p-3 mb-3 min-h-[200px] text-gray-800">
                  {testResults.knowledgeBaseResponse.response}
                </div>
                
                <div className="mb-3">
                  <h5 className="text-sm font-medium text-gray-700 mb-1">Sources</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {testResults.knowledgeBaseResponse.sources.map((source, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                        {source.title} (p. {source.page})
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between text-xs text-gray-600 mb-3">
                  <span>Confidence: {(testResults.knowledgeBaseResponse.confidence * 100).toFixed(0)}%</span>
                  <span>Processing time: {testResults.knowledgeBaseResponse.processingTime}</span>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">Rate this response</h5>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating('knowledgeBase', star)}
                        className={`w-8 h-8 ${
                          ratings.knowledgeBase >= star ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Generic AI Response */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium text-gray-800 mb-2">Generic AI Response</h4>
                <div className="bg-white rounded p-3 mb-3 min-h-[200px] text-gray-800">
                  {testResults.genericResponse.response}
                </div>
                
                <div className="flex justify-between text-xs text-gray-600 mb-3">
                  <span>Confidence: {(testResults.genericResponse.confidence * 100).toFixed(0)}%</span>
                  <span>Processing time: {testResults.genericResponse.processingTime}</span>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">Rate this response</h5>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating('generic', star)}
                        className={`w-8 h-8 ${
                          ratings.generic >= star ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Comparison Summary */}
            {(ratings.knowledgeBase > 0 || ratings.generic > 0) && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Comparison Summary</h4>
                <div className="flex items-center">
                  <div className="flex-1">
                    <div className="text-sm font-medium">Knowledge Base Enhanced</div>
                    <div className="flex text-yellow-400">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <span key={idx}>{idx < ratings.knowledgeBase ? '★' : '☆'}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Generic AI</div>
                    <div className="flex text-yellow-400">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <span key={idx}>{idx < ratings.generic ? '★' : '☆'}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AITestingInterface; 