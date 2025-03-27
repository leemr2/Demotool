import React, { useState, useEffect, useRef } from 'react';
import { useDemoContext } from '../../context/DemoContext';
import { knowledgeBaseService, aiService } from '../../services/api';
import { ErrorBoundary } from 'react-error-boundary';
import ForceGraph2D from 'react-force-graph-2d';

const KnowledgeEngineering = () => {
  const { state, setKnowledgeBase } = useDemoContext();
  const [activeTab, setActiveTab] = useState('structure');
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [selectedNode, setSelectedNode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [qualityScores, setQualityScores] = useState({
    completeness: 87,
    consistency: 92,
    sourceReliability: 85,
    sections: {
      'Medical Terminology': 96,
      'Legal Procedures': 62,
      'Data Privacy': 78,
      'AI Hallucinations': 84,
      'Monetization': 89
    }
  });
  const [gapAnalysis, setGapAnalysis] = useState({
    overallCoverage: 76,
    gapAreas: [
      { id: 'gap1', topic: 'Regulatory Compliance', severity: 'high', recommendation: 'Add more documentation about industry-specific regulatory requirements' },
      { id: 'gap2', topic: 'Practical Examples', severity: 'medium', recommendation: 'This section needs more practical examples to illustrate concepts' },
      { id: 'gap3', topic: 'Technical Integration', severity: 'low', recommendation: 'Include more details about API integration patterns' }
    ]
  });
  
  const graphRef = useRef();

  // Load visualization data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Generate mock graph data for demonstration
        const mockData = {
          nodes: [
            { id: 'root', label: 'Knowledge Base', group: 'root' },
            { id: 'privacy', label: 'Data Privacy', group: 'main' },
            { id: 'hipaa', label: 'HIPAA Compliance', group: 'sub' },
            { id: 'anon', label: 'Anonymization', group: 'sub' },
            { id: 'access', label: 'Access Controls', group: 'sub' },
            { id: 'ai', label: 'AI Hallucinations', group: 'main' },
            { id: 'mitigation', label: 'Mitigation Strategies', group: 'sub' },
            { id: 'detection', label: 'Detection Methods', group: 'sub' },
            { id: 'money', label: 'Monetization', group: 'main' },
            { id: 'models', label: 'Pricing Models', group: 'sub' },
            { id: 'channels', label: 'Distribution Channels', group: 'sub' }
          ],
          links: [
            { source: 'root', target: 'privacy', type: 'contains' },
            { source: 'root', target: 'ai', type: 'contains' },
            { source: 'root', target: 'money', type: 'contains' },
            { source: 'privacy', target: 'hipaa', type: 'contains' },
            { source: 'privacy', target: 'anon', type: 'contains' },
            { source: 'privacy', target: 'access', type: 'contains' },
            { source: 'ai', target: 'mitigation', type: 'contains' },
            { source: 'ai', target: 'detection', type: 'contains' },
            { source: 'money', target: 'models', type: 'contains' },
            { source: 'money', target: 'channels', type: 'contains' },
            { source: 'hipaa', target: 'anon', type: 'related' },
            { source: 'detection', target: 'mitigation', type: 'depends_on' }
          ]
        };

        setGraphData(mockData);
      } catch (err) {
        setError('Failed to load knowledge structure data');
        console.error('Knowledge structure error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  const getNodeColor = (node) => {
    const colorMap = {
      'root': '#FF6B6B',
      'main': '#4ECDC4',
      'sub': '#45B7D1'
    };
    return colorMap[node.group] || '#999';
  };

  const getNodeSize = (node) => {
    const sizeMap = {
      'root': 15,
      'main': 12,
      'sub': 8
    };
    return sizeMap[node.group] || 6;
  };

  const getLinkColor = (link) => {
    const colorMap = {
      'contains': '#ccc',
      'related': '#F9C80E',
      'depends_on': '#EA3788'
    };
    return colorMap[link.type] || '#999';
  };

  const renderStructureVisualization = () => {
    return (
      <div className="h-[500px] border rounded-lg shadow-inner bg-gray-50 relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center text-red-500">
            {error}
          </div>
        ) : (
          <ErrorBoundary
            FallbackComponent={({ error }) => (
              <div className="p-4 text-red-500">{error.message}</div>
            )}
          >
            <ForceGraph2D
              ref={graphRef}
              graphData={graphData}
              nodeLabel={node => node.label}
              nodeColor={getNodeColor}
              nodeVal={getNodeSize}
              linkColor={getLinkColor}
              linkDirectionalArrowLength={3.5}
              linkDirectionalArrowRelPos={1}
              linkCurvature={0.25}
              onNodeClick={handleNodeClick}
              cooldownTicks={100}
              linkWidth={1}
            />
          </ErrorBoundary>
        )}
        {selectedNode && (
          <div className="absolute top-2 right-2 bg-white p-3 rounded-lg shadow-md border w-64">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">{selectedNode.label}</h3>
              <button 
                onClick={() => setSelectedNode(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Type: {selectedNode.group === 'root' ? 'Root Node' : 
                    selectedNode.group === 'main' ? 'Main Topic' : 'Subtopic'}
            </p>
            <div className="flex space-x-2">
              <button className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">
                Edit Node
              </button>
              <button className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600">
                Add Child
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderRelationshipMapping = () => {
    return (
      <div className="space-y-6">
        <div className="h-[400px] border rounded-lg shadow-inner bg-gray-50 relative">
          <ErrorBoundary
            FallbackComponent={({ error }) => (
              <div className="p-4 text-red-500">{error.message}</div>
            )}
          >
            <ForceGraph2D
              graphData={graphData}
              nodeLabel={node => node.label}
              nodeColor={getNodeColor}
              nodeVal={getNodeSize}
              linkColor={getLinkColor}
              linkDirectionalArrowLength={3.5}
              linkDirectionalArrowRelPos={1}
              linkCurvature={0.25}
              onNodeClick={handleNodeClick}
              cooldownTicks={100}
              linkWidth={1}
            />
          </ErrorBoundary>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-bold text-lg mb-3">Relationship Types</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-300 mr-2"></div>
              <span className="text-sm">Contains - Parent/child hierarchical relationship</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-yellow-400 mr-2"></div>
              <span className="text-sm">Related - Connected but non-hierarchical</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-pink-500 mr-2"></div>
              <span className="text-sm">Depends On - One topic requires another</span>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Add New Relationship
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderQualityScoring = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="font-bold text-lg mb-4">Overall Quality Scores</h3>
          
          <div className="grid grid-cols-3 gap-4">
            {/* Completeness Score */}
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{qualityScores.completeness}%</div>
              <div className="text-sm text-gray-500">Completeness</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${qualityScores.completeness}%` }}
                ></div>
              </div>
            </div>
            
            {/* Consistency Score */}
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{qualityScores.consistency}%</div>
              <div className="text-sm text-gray-500">Consistency</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${qualityScores.consistency}%` }}
                ></div>
              </div>
            </div>
            
            {/* Source Reliability */}
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{qualityScores.sourceReliability}%</div>
              <div className="text-sm text-gray-500">Source Reliability</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-purple-600 h-2.5 rounded-full" 
                  style={{ width: `${qualityScores.sourceReliability}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <h4 className="font-semibold text-md mt-6 mb-3">Section Quality Scores</h4>
          <div className="space-y-3">
            {Object.entries(qualityScores.sections).map(([section, score]) => (
              <div key={section} className="flex items-center">
                <div className="w-40 text-sm">{section}</div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${score > 90 ? 'bg-green-600' : score > 75 ? 'bg-blue-600' : score > 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-right text-sm ml-2">{score}%</div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Run Quality Analysis
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderGapAnalysis = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Coverage Analysis</h3>
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600 mr-2">{gapAnalysis.overallCoverage}%</div>
              <div className="text-sm text-gray-500">Overall Coverage</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
            <div 
              className="bg-blue-600 h-4 rounded-full" 
              style={{ width: `${gapAnalysis.overallCoverage}%` }}
            ></div>
          </div>
          
          <h4 className="font-semibold text-md mb-4">Identified Knowledge Gaps</h4>
          
          <div className="space-y-4">
            {gapAnalysis.gapAreas.map(gap => (
              <div key={gap.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-semibold">{gap.topic}</h5>
                  <span className={`px-2 py-1 rounded text-xs ${
                    gap.severity === 'high' ? 'bg-red-100 text-red-800' : 
                    gap.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {gap.severity.charAt(0).toUpperCase() + gap.severity.slice(1)} Priority
                  </span>
                </div>
                <p className="text-sm text-gray-600">{gap.recommendation}</p>
                <div className="mt-3">
                  <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                    Address Gap
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Run New Gap Analysis
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'structure':
        return renderStructureVisualization();
      case 'relationships':
        return renderRelationshipMapping();
      case 'quality':
        return renderQualityScoring();
      case 'gaps':
        return renderGapAnalysis();
      default:
        return renderStructureVisualization();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Knowledge Engineering
          </h2>
          <div>
            <button
              onClick={() => {}} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Export Knowledge Base
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'structure'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('structure')}
              >
                Structure Visualization
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'relationships'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('relationships')}
              >
                Relationship Mapping
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'quality'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('quality')}
              >
                Quality Scoring
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'gaps'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('gaps')}
              >
                Gap Analysis
              </button>
            </nav>
          </div>
        </div>

        <div className="mt-6">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeEngineering; 