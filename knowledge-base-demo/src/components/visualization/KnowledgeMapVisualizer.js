import React, { useEffect, useState, Suspense } from 'react';
import { aiService } from '../../services/api';
import { useDemoContext } from '../../context/DemoContext';
import { ErrorBoundary } from 'react-error-boundary';

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary, onSwitchToSimpleView }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="text-red-600 font-bold mb-2">Error rendering graph visualization</div>
      <div className="text-sm text-gray-600 mb-4">{error.message}</div>
      <div className="flex space-x-4">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={resetErrorBoundary}
        >
          Try Again
        </button>
        <button 
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={onSwitchToSimpleView}
        >
          Switch to Simple View
        </button>
      </div>
    </div>
  );
};

// Use dynamic import for ForceGraph2D to handle potential loading issues
const ForceGraph2D = React.lazy(() => {
  return import('react-force-graph-2d')
    .catch(err => {
      console.error('Failed to load ForceGraph2D:', err);
      // Return a placeholder component when the import fails
      return { default: () => <div>Graph visualization failed to load</div> };
    });
});

// Fallback simple graph component that doesn't rely on the force-graph library
const SimpleGraphFallback = ({ nodes, links }) => {
  // Helper function to get node label by ID
  const getNodeLabel = (nodeId) => {
    const node = nodes.find(n => n.id === nodeId);
    return node ? (node.label || node.id) : nodeId;
  };

  // Helper function to handle both string IDs and object references
  const getNodeId = (nodeRef) => {
    if (typeof nodeRef === 'string') return nodeRef;
    if (typeof nodeRef === 'object' && nodeRef !== null) return nodeRef.id;
    return 'unknown';
  };

  return (
    <div className="w-full h-[600px] bg-white p-4 overflow-auto">
      <h3 className="text-lg font-semibold mb-4">Knowledge Map (Simple View)</h3>
      <div className="mb-6">
        <h4 className="font-medium mb-2">Nodes:</h4>
        <ul className="list-disc pl-5">
          {nodes.map(node => (
            <li key={node.id} className="mb-1">
              {node.label || node.id} ({node.type || 'unknown type'})
              {node.clarityScore && <span className="ml-2">- Clarity: {node.clarityScore}%</span>}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-medium mb-2">Connections:</h4>
        <ul className="list-disc pl-5">
          {links.map((link, index) => {
            const sourceId = getNodeId(link.source);
            const targetId = getNodeId(link.target);
            return (
              <li key={index} className="mb-1">
                {getNodeLabel(sourceId)} → {getNodeLabel(targetId)} ({link.type || 'connection'})
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

// Topic Detail Panel Component
const TopicDetailPanel = ({ selectedNode, onClose }) => {
  if (!selectedNode) return null;
  
  return (
    <div className="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-lg p-4 z-10">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">{selectedNode.label}</h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
      
      <div className="mb-4">
        <h4 className="font-medium text-sm text-gray-600 mb-1">Clarity Score</h4>
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                selectedNode.clarityScore >= 80 ? 'bg-green-500' : 
                selectedNode.clarityScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`} 
              style={{ width: `${selectedNode.clarityScore}%` }}
            ></div>
          </div>
          <span className="ml-2 text-sm font-medium">{selectedNode.clarityScore}%</span>
        </div>
      </div>
      
      {selectedNode.knowledgeGaps && selectedNode.knowledgeGaps.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-sm text-gray-600 mb-1">Knowledge Gaps</h4>
          <ul className="list-disc pl-5 text-sm">
            {selectedNode.knowledgeGaps.map((gap, index) => (
              <li key={index} className="text-red-600">{gap}</li>
            ))}
          </ul>
        </div>
      )}
      
      {selectedNode.suggestedQuestions && selectedNode.suggestedQuestions.length > 0 && (
        <div>
          <h4 className="font-medium text-sm text-gray-600 mb-1">Suggested Questions</h4>
          <ul className="text-sm space-y-2">
            {selectedNode.suggestedQuestions.map((question, index) => (
              <li key={index} className="p-2 bg-blue-50 rounded-md">{question}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Legend Component
const MapLegend = () => {
  return (
    <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-md z-10">
      <h4 className="font-medium text-sm mb-2">Legend</h4>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          <span>Main Topic</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span>Well Understood</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <span>Partial Understanding</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <span>Knowledge Gap</span>
        </div>
      </div>
    </div>
  );
};

const KnowledgeMapVisualizer = () => {
  const { state } = useDemoContext();
  const [graphData, setGraphData] = useState({
    nodes: [],
    links: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [useSimpleView, setUseSimpleView] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  // Generate mock data based on persona type
  const generatePersonaBasedData = (userType, selectedPersona) => {
    let mockData = {
      nodes: [],
      links: []
    };

    // If a persona is selected, use that for domain-specific content
    if (selectedPersona) {
      const personaId = selectedPersona.id;
      
      if (personaId === 'legal') {
        // Legal domain knowledge map
        mockData = {
          nodes: [
            { 
              id: '1', 
              label: 'Contract Law', 
              type: 'topic',
              clarityScore: 88,
              knowledgeGaps: [],
              suggestedQuestions: [
                'What are the essential elements of a valid contract?',
                'How do force majeure clauses protect parties?'
              ]
            },
            { 
              id: '2', 
              label: 'Contract Formation', 
              type: 'subtopic',
              clarityScore: 92,
              knowledgeGaps: [],
              suggestedQuestions: [
                'What constitutes a valid offer and acceptance?',
                'How are electronic contracts formed and validated?'
              ]
            },
            { 
              id: '3', 
              label: 'Contract Interpretation', 
              type: 'subtopic',
              clarityScore: 78,
              knowledgeGaps: ['Ambiguity resolution standards'],
              suggestedQuestions: [
                'How do courts interpret ambiguous contract terms?',
                'What is the parol evidence rule and when does it apply?'
              ]
            },
            { 
              id: '4', 
              label: 'Breach Remedies', 
              type: 'subtopic',
              clarityScore: 65,
              knowledgeGaps: ['Liquidated damages calculation', 'Specific performance criteria'],
              suggestedQuestions: [
                'What remedies are available for material breach of contract?',
                'When is specific performance an appropriate remedy?'
              ]
            },
            { 
              id: '5', 
              label: 'Legal Precedents', 
              type: 'topic',
              clarityScore: 72,
              knowledgeGaps: ['Recent Supreme Court rulings'],
              suggestedQuestions: [
                'What are the landmark cases in contract law?',
                'How has the statute of frauds been interpreted in recent cases?'
              ]
            }
          ],
          links: [
            { source: '1', target: '2', type: 'includes' },
            { source: '1', target: '3', type: 'includes' },
            { source: '1', target: '4', type: 'includes' },
            { source: '1', target: '5', type: 'references' }
          ]
        };
      } else if (personaId === 'healthcare') {
        // Healthcare domain knowledge map
        mockData = {
          nodes: [
            { 
              id: '1', 
              label: 'Patient Assessment', 
              type: 'topic',
              clarityScore: 85,
              knowledgeGaps: [],
              suggestedQuestions: [
                'What are the key components of a comprehensive patient assessment?',
                'How do you prioritize assessment findings?'
              ]
            },
            { 
              id: '2', 
              label: 'Vital Signs', 
              type: 'subtopic',
              clarityScore: 92,
              knowledgeGaps: [],
              suggestedQuestions: [
                'What are the normal ranges for vital signs in different age groups?',
                'How do you interpret abnormal vital sign patterns?'
              ]
            },
            { 
              id: '3', 
              label: 'Medical History', 
              type: 'subtopic',
              clarityScore: 78,
              knowledgeGaps: ['Family history documentation incomplete'],
              suggestedQuestions: [
                'What elements of family history are most relevant to cardiac assessment?',
                'How do you document medication allergies and adverse reactions?'
              ]
            },
            { 
              id: '4', 
              label: 'Diagnostic Tests', 
              type: 'subtopic',
              clarityScore: 65,
              knowledgeGaps: ['New imaging protocols', 'Lab result interpretation guidelines'],
              suggestedQuestions: [
                'What are the indications for ordering specific diagnostic tests?',
                'How do you interpret complex lab result patterns?'
              ]
            },
            { 
              id: '5', 
              label: 'Treatment Planning', 
              type: 'topic',
              clarityScore: 72,
              knowledgeGaps: ['Integration with electronic health records'],
              suggestedQuestions: [
                'How do you develop personalized treatment plans?',
                'What factors influence treatment selection?'
              ]
            }
          ],
          links: [
            { source: '1', target: '2', type: 'includes' },
            { source: '1', target: '3', type: 'includes' },
            { source: '1', target: '4', type: 'includes' },
            { source: '1', target: '5', type: 'leads to' }
          ]
        };
      } else if (personaId === 'education') {
        // Education domain knowledge map
        mockData = {
          nodes: [
            { 
              id: '1', 
              label: 'Curriculum Development', 
              type: 'topic',
              clarityScore: 87,
              knowledgeGaps: [],
              suggestedQuestions: [
                'What are the key components of an effective curriculum?',
                'How do you align curriculum with learning standards?'
              ]
            },
            { 
              id: '2', 
              label: 'Learning Objectives', 
              type: 'subtopic',
              clarityScore: 90,
              knowledgeGaps: [],
              suggestedQuestions: [
                'How do you write effective learning objectives?',
                'What is Bloom\'s taxonomy and how is it applied?'
              ]
            },
            { 
              id: '3', 
              label: 'Assessment Methods', 
              type: 'subtopic',
              clarityScore: 75,
              knowledgeGaps: ['Authentic assessment techniques'],
              suggestedQuestions: [
                'What are the differences between formative and summative assessment?',
                'How do you design rubrics for complex assignments?'
              ]
            },
            { 
              id: '4', 
              label: 'Differentiated Instruction', 
              type: 'subtopic',
              clarityScore: 68,
              knowledgeGaps: ['Advanced differentiation strategies', 'Technology integration'],
              suggestedQuestions: [
                'How do you modify instruction for diverse learning needs?',
                'What strategies work best for mixed-ability classrooms?'
              ]
            },
            { 
              id: '5', 
              label: 'Educational Research', 
              type: 'topic',
              clarityScore: 79,
              knowledgeGaps: ['Recent studies on online learning'],
              suggestedQuestions: [
                'What does research say about effective teaching methods?',
                'How can teachers apply educational research in the classroom?'
              ]
            }
          ],
          links: [
            { source: '1', target: '2', type: 'includes' },
            { source: '1', target: '3', type: 'includes' },
            { source: '1', target: '4', type: 'requires' },
            { source: '5', target: '1', type: 'informs' }
          ]
        };
      } else if (personaId === 'finance') {
        // Finance domain knowledge map
        mockData = {
          nodes: [
            { 
              id: '1', 
              label: 'Investment Analysis', 
              type: 'topic',
              clarityScore: 86,
              knowledgeGaps: [],
              suggestedQuestions: [
                'What are the key metrics for evaluating investment opportunities?',
                'How do you assess risk in a diversified portfolio?'
              ]
            },
            { 
              id: '2', 
              label: 'Asset Allocation', 
              type: 'subtopic',
              clarityScore: 91,
              knowledgeGaps: [],
              suggestedQuestions: [
                'What factors determine optimal asset allocation?',
                'How should asset allocation change with market conditions?'
              ]
            },
            { 
              id: '3', 
              label: 'Risk Management', 
              type: 'subtopic',
              clarityScore: 77,
              knowledgeGaps: ['Tail risk hedging strategies'],
              suggestedQuestions: [
                'What techniques are used to mitigate investment risk?',
                'How do you quantify and manage portfolio volatility?'
              ]
            },
            { 
              id: '4', 
              label: 'Regulatory Compliance', 
              type: 'subtopic',
              clarityScore: 64,
              knowledgeGaps: ['Recent regulatory changes', 'Cross-border compliance'],
              suggestedQuestions: [
                'What are the key regulatory requirements for financial advisors?',
                'How do you ensure compliance with fiduciary standards?'
              ]
            },
            { 
              id: '5', 
              label: 'Financial Planning', 
              type: 'topic',
              clarityScore: 83,
              knowledgeGaps: ['Tax optimization strategies'],
              suggestedQuestions: [
                'What are the components of a comprehensive financial plan?',
                'How do you adjust financial plans during economic downturns?'
              ]
            }
          ],
          links: [
            { source: '1', target: '2', type: 'includes' },
            { source: '1', target: '3', type: 'requires' },
            { source: '4', target: '1', type: 'constrains' },
            { source: '5', target: '1', type: 'incorporates' }
          ]
        };
      } else {
        // Custom domain or fallback
        mockData = {
          nodes: [
            { 
              id: '1', 
              label: 'Main Topic', 
              type: 'topic',
              clarityScore: 80,
              knowledgeGaps: [],
              suggestedQuestions: ['What is the scope of this topic?']
            },
            { 
              id: '2', 
              label: 'Subtopic 1', 
              type: 'subtopic',
              clarityScore: 65,
              knowledgeGaps: ['Missing key definitions'],
              suggestedQuestions: ['How does this relate to the main topic?']
            },
            { 
              id: '3', 
              label: 'Subtopic 2', 
              type: 'subtopic',
              clarityScore: 90,
              knowledgeGaps: [],
              suggestedQuestions: ['What are practical applications of this concept?']
            }
          ],
          links: [
            { source: '1', target: '2', type: 'contains' },
            { source: '1', target: '3', type: 'contains' }
          ]
        };
      }
      
      return mockData;
    }

    // If no persona is selected, fall back to user type based content
    if (userType === 'domainExpert') {
      // Generic domain expert knowledge map
      mockData = {
        nodes: [
          { 
            id: '1', 
            label: 'Domain Knowledge', 
            type: 'topic',
            clarityScore: 85,
            knowledgeGaps: [],
            suggestedQuestions: [
              'What are the core concepts in your field?',
              'How do you organize domain knowledge?'
            ]
          },
          { 
            id: '2', 
            label: 'Best Practices', 
            type: 'subtopic',
            clarityScore: 92,
            knowledgeGaps: [],
            suggestedQuestions: [
              'What are the established best practices in your field?',
              'How do best practices evolve over time?'
            ]
          },
          { 
            id: '3', 
            label: 'Common Challenges', 
            type: 'subtopic',
            clarityScore: 78,
            knowledgeGaps: ['Emerging issues'],
            suggestedQuestions: [
              'What are the most common challenges in your practice?',
              'How do you address complex cases?'
            ]
          },
          { 
            id: '4', 
            label: 'Resources', 
            type: 'subtopic',
            clarityScore: 65,
            knowledgeGaps: ['New reference materials', 'Digital resources'],
            suggestedQuestions: [
              'What resources do you rely on most frequently?',
              'How do you stay updated in your field?'
            ]
          },
          { 
            id: '5', 
            label: 'Implementation', 
            type: 'topic',
            clarityScore: 72,
            knowledgeGaps: ['Integration with existing systems'],
            suggestedQuestions: [
              'How do you implement knowledge in practice?',
              'What factors affect successful implementation?'
            ]
          }
        ],
        links: [
          { source: '1', target: '2', type: 'includes' },
          { source: '1', target: '3', type: 'includes' },
          { source: '1', target: '4', type: 'includes' },
          { source: '1', target: '5', type: 'leads to' }
        ]
      };
    } else if (userType === 'knowledgeBuilder') {
      // Technical knowledge map for knowledge builders
      mockData = {
        nodes: [
          { 
            id: '1', 
            label: 'Knowledge Extraction', 
            type: 'topic',
            clarityScore: 88,
            knowledgeGaps: [],
            suggestedQuestions: [
              'What NLP techniques are most effective for text extraction?',
              'How do you validate extracted knowledge?'
            ]
          },
          { 
            id: '2', 
            label: 'Entity Recognition', 
            type: 'subtopic',
            clarityScore: 91,
            knowledgeGaps: [],
            suggestedQuestions: [
              'How do you handle domain-specific terminology?',
              'What are the best practices for training custom NER models?'
            ]
          },
          { 
            id: '3', 
            label: 'Relationship Mapping', 
            type: 'subtopic',
            clarityScore: 76,
            knowledgeGaps: ['Complex relationship types'],
            suggestedQuestions: [
              'How do you identify causal relationships in text?',
              'What techniques improve relationship extraction accuracy?'
            ]
          },
          { 
            id: '4', 
            label: 'Knowledge Graph Construction', 
            type: 'topic',
            clarityScore: 82,
            knowledgeGaps: [],
            suggestedQuestions: [
              'What graph database is best for knowledge representation?',
              'How do you optimize query performance on large knowledge graphs?'
            ]
          },
          { 
            id: '5', 
            label: 'Ontology Integration', 
            type: 'subtopic',
            clarityScore: 58,
            knowledgeGaps: ['Standard ontology mapping', 'Ontology versioning'],
            suggestedQuestions: [
              'How do you align custom ontologies with standard terminologies?',
              'What are best practices for ontology maintenance?'
            ]
          }
        ],
        links: [
          { source: '1', target: '2', type: 'includes' },
          { source: '1', target: '3', type: 'includes' },
          { source: '2', target: '4', type: 'feeds into' },
          { source: '3', target: '4', type: 'feeds into' },
          { source: '4', target: '5', type: 'uses' }
        ]
      };
    } else if (userType === 'aiEnhancer') {
      // AI-focused knowledge map for AI enhancers
      mockData = {
        nodes: [
          { 
            id: '1', 
            label: 'Model Training', 
            type: 'topic',
            clarityScore: 90,
            knowledgeGaps: [],
            suggestedQuestions: [
              'What training approaches work best for domain-specific language models?',
              'How do you balance model size and performance?'
            ]
          },
          { 
            id: '2', 
            label: 'Data Preparation', 
            type: 'subtopic',
            clarityScore: 85,
            knowledgeGaps: ['Data augmentation techniques'],
            suggestedQuestions: [
              'What preprocessing steps improve model performance?',
              'How do you handle imbalanced training data?'
            ]
          },
          { 
            id: '3', 
            label: 'Fine-tuning', 
            type: 'subtopic',
            clarityScore: 78,
            knowledgeGaps: ['Parameter-efficient tuning methods'],
            suggestedQuestions: [
              'What hyperparameters have the most impact on fine-tuning results?',
              'How do you prevent catastrophic forgetting during fine-tuning?'
            ]
          },
          { 
            id: '4', 
            label: 'Evaluation Metrics', 
            type: 'topic',
            clarityScore: 67,
            knowledgeGaps: ['Domain-specific benchmarks', 'Fairness metrics'],
            suggestedQuestions: [
              'What metrics best capture model performance?',
              'How do you evaluate factual accuracy in generated responses?'
            ]
          },
          { 
            id: '5', 
            label: 'Deployment Strategies', 
            type: 'topic',
            clarityScore: 72,
            knowledgeGaps: ['Edge deployment options'],
            suggestedQuestions: [
              'What are the trade-offs between cloud and on-premise deployment?',
              'How do you implement effective monitoring for AI systems?'
            ]
          }
        ],
        links: [
          { source: '1', target: '2', type: 'requires' },
          { source: '1', target: '3', type: 'includes' },
          { source: '1', target: '4', type: 'measured by' },
          { source: '4', target: '5', type: 'informs' }
        ]
      };
    } else {
      // Default knowledge map if no user type is selected
      mockData = {
        nodes: [
          { 
            id: '1', 
            label: 'Main Topic', 
            type: 'topic',
            clarityScore: 80,
            knowledgeGaps: [],
            suggestedQuestions: ['What is the scope of this topic?']
          },
          { 
            id: '2', 
            label: 'Subtopic 1', 
            type: 'subtopic',
            clarityScore: 65,
            knowledgeGaps: ['Missing key definitions'],
            suggestedQuestions: ['How does this relate to the main topic?']
          },
          { 
            id: '3', 
            label: 'Subtopic 2', 
            type: 'subtopic',
            clarityScore: 90,
            knowledgeGaps: [],
            suggestedQuestions: ['What are practical applications of this concept?']
          }
        ],
        links: [
          { source: '1', target: '2', type: 'contains' },
          { source: '1', target: '3', type: 'contains' }
        ]
      };
    }

    return mockData;
  };

  useEffect(() => {
    const loadKnowledgeMap = async () => {
      try {
        setLoading(true);
        console.log('Fetching knowledge map data...');
        
        // Use the selected persona from context if available
        const mockData = generatePersonaBasedData(state.userType, state.selectedPersona);
        
        // Process the data to ensure all properties are correctly formatted
        const processedData = {
          nodes: mockData.nodes.map(node => ({
            ...node,
            id: String(node.id), // Ensure ID is a string
            label: node.label || `Node ${node.id}`,
          })),
          links: mockData.links.map(link => ({
            ...link,
            source: String(link.source), // Ensure source is a string
            target: String(link.target), // Ensure target is a string
          })),
        };
        
        setGraphData(processedData);
      } catch (error) {
        console.error('Error loading knowledge map:', error);
        setError(`Error loading knowledge map: ${error.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    loadKnowledgeMap();
  }, [state.userType, state.selectedPersona]);

  // Function to reload the knowledge map data
  const reloadKnowledgeMap = () => {
    setError(null);
    setLoading(true);
    const mockData = generatePersonaBasedData(state.userType, state.selectedPersona);
    
    // Process the data to ensure all properties are correctly formatted
    const processedData = {
      nodes: mockData.nodes.map(node => ({
        ...node,
        id: String(node.id), // Ensure ID is a string
        label: node.label || `Node ${node.id}`,
      })),
      links: mockData.links.map(link => ({
        ...link,
        source: String(link.source), // Ensure source is a string
        target: String(link.target), // Ensure target is a string
      })),
    };
    
    setGraphData(processedData);
    setLoading(false);
  };

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  const getNodeColor = (node) => {
    if (!node.clarityScore) return '#4F46E5'; // Default color
    
    if (node.clarityScore >= 80) return '#10B981'; // Green for high clarity
    if (node.clarityScore >= 60) return '#FBBF24'; // Yellow for medium clarity
    return '#EF4444'; // Red for low clarity
  };

  const getNodeSize = (node) => {
    return node.type === 'topic' ? 8 : 6;
  };

  if (loading) {
    return (
      <div className="w-full h-[600px] bg-white rounded-lg shadow-lg flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading knowledge map...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[600px] bg-white rounded-lg shadow-lg p-8">
        <div className="text-red-600 font-bold">Error loading knowledge map</div>
        <div className="mt-4">{error}</div>
        <div className="mt-4">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (graphData.nodes.length === 0) {
    return (
      <div className="w-full h-[600px] bg-white rounded-lg shadow-lg flex items-center justify-center">
        <div className="text-xl text-gray-600">No knowledge map data available</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Knowledge Map Visualization</h2>
        <p className="text-gray-600">
          This map shows topics covered, clarity indicators, and knowledge gaps.
          Click on any node to see details and suggested questions.
        </p>
      </div>
      
      <div className="mb-4 flex justify-end">
        <button 
          className={`px-4 py-2 rounded ${useSimpleView ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
          onClick={() => setUseSimpleView(false)}
          disabled={!useSimpleView}
        >
          Interactive View
        </button>
        <button 
          className={`ml-2 px-4 py-2 rounded ${!useSimpleView ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
          onClick={() => setUseSimpleView(true)}
          disabled={useSimpleView}
        >
          Simple View
        </button>
      </div>
      
      <div className="w-full h-[600px] bg-white rounded-lg shadow-lg relative">
        {useSimpleView ? (
          <SimpleGraphFallback nodes={graphData.nodes} links={graphData.links} />
        ) : (
          <>
            <Suspense fallback={<div className="h-full flex items-center justify-center">Loading graph visualization...</div>}>
              <ErrorBoundary
                FallbackComponent={({ error, resetErrorBoundary }) => (
                  <ErrorFallback 
                    error={error} 
                    resetErrorBoundary={resetErrorBoundary} 
                    onSwitchToSimpleView={() => setUseSimpleView(true)} 
                  />
                )}
                onReset={reloadKnowledgeMap}
              >
                <ForceGraph2D
                  graphData={graphData}
                  nodeLabel={node => `${node.label} (Clarity: ${node.clarityScore}%)`}
                  nodeRelSize={6}
                  nodeVal={getNodeSize}
                  nodeColor={getNodeColor}
                  linkDirectionalParticles={2}
                  linkDirectionalParticleSpeed={0.004}
                  backgroundColor="#ffffff"
                  linkColor={() => '#94A3B8'}
                  onNodeClick={handleNodeClick}
                />
              </ErrorBoundary>
            </Suspense>
            <MapLegend />
            {selectedNode && (
              <TopicDetailPanel 
                selectedNode={selectedNode} 
                onClose={() => setSelectedNode(null)} 
              />
            )}
          </>
        )}
      </div>
      
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Understanding Your Knowledge Map</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><span className="font-medium">Node Colors:</span> Green nodes indicate well-understood topics, yellow nodes show partial understanding, and red nodes highlight knowledge gaps.</li>
          <li><span className="font-medium">Node Size:</span> Larger nodes represent main topics, while smaller nodes are subtopics.</li>
          <li><span className="font-medium">Interactions:</span> Click on any node to see detailed information, clarity scores, and suggested questions to test understanding.</li>
        </ul>
      </div>
    </div>
  );
};

export default KnowledgeMapVisualizer; 