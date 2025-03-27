import React, { useState } from 'react';
import { aiService } from '../../services/api';

const KnowledgeBaseEvaluation = () => {
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runEvaluation = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await aiService.analyzeDocument('mock-document-id');
      setEvaluationResults({
        ...response.analysis,
        metrics: {
          completeness: 0.85,
          accuracy: 0.92,
          relevance: 0.88,
          consistency: 0.90,
        },
      });
    } catch (err) {
      setError('Failed to evaluate knowledge base');
      console.error('Evaluation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Knowledge Base Evaluation
        </h2>
        
        <p className="text-gray-600 mb-6">
          Evaluate the quality and effectiveness of your knowledge base using
          advanced AI analysis.
        </p>

        <button
          onClick={runEvaluation}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium
            ${loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {loading ? 'Running Evaluation...' : 'Run Evaluation'}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {evaluationResults && (
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quality Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(evaluationResults.metrics).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-gray-50 p-4 rounded-lg"
                  >
                    <div className="text-sm font-medium text-gray-600 capitalize">
                      {key}
                    </div>
                    <div className="mt-2 flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${value * 100}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        {(value * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Content Analysis
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700">Topics</h4>
                  <ul className="mt-2 list-disc list-inside text-gray-600">
                    {evaluationResults.topics.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Sentiment</h4>
                  <p className="mt-2 text-gray-600">{evaluationResults.sentiment}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Confidence</h4>
                  <p className="mt-2 text-gray-600">
                    {(evaluationResults.confidence * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeBaseEvaluation; 