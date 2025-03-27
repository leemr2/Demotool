import React, { useState } from 'react';
import { useDemoContext } from '../../context/DemoContext';

const WelcomeSetup = () => {
  const { setCurrentStep, setSelectedPersona } = useDemoContext();
  const [selectedPersona, setLocalSelectedPersona] = useState(null);
  const [goalInput, setGoalInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { 
      role: 'assistant', 
      content: "Hello! I'm here to help you find the perfect knowledge base for your AI application. What specific use case or industry are you focusing on?" 
    }
  ]);

  const handleGetStarted = () => {
    setCurrentStep(2);
  };

  const personas = [
    {
      id: 'healthcare',
      title: 'Healthcare AI',
      icon: '👨‍⚕️',
      description: 'For medical applications, patient care, and clinical decision support',
      examples: ['Patient engagement systems', 'Clinical decision support', 'Medical documentation assistance']
    },
    {
      id: 'legal',
      title: 'Legal AI',
      icon: '⚖️',
      description: 'For legal research, contract analysis, and compliance',
      examples: ['Contract analysis', 'Legal research tools', 'Compliance verification']
    },
    {
      id: 'education',
      title: 'Educational AI',
      icon: '👩‍🏫',
      description: 'For learning applications, tutoring, and educational content',
      examples: ['Intelligent tutoring systems', 'Educational content generation', 'Student assessment tools']
    },
    {
      id: 'finance',
      title: 'Financial AI',
      icon: '💼',
      description: 'For financial services, investment analysis, and advisory',
      examples: ['Investment advisory tools', 'Financial planning applications', 'Regulatory compliance systems']
    },
    {
      id: 'custom',
      title: 'Custom Application',
      icon: '🔍',
      description: 'For specialized applications and unique AI needs',
      examples: ['Industry-specific tools', 'Specialized workflow automation', 'Custom user experiences']
    }
  ];

  const handlePersonaSelect = (persona) => {
    setLocalSelectedPersona(persona);
    // Store the selected persona in the context
    setSelectedPersona(persona);
    
    // Add a message to the chat when a persona is selected
    setChatMessages([
      ...chatMessages,
      { 
        role: 'assistant', 
        content: `Great choice! For ${persona.title} applications, what specific functionality are you looking to enhance? For example: ${persona.examples.join(', ')}.` 
      }
    ]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!goalInput.trim()) return;
    
    // Add user message
    const updatedMessages = [
      ...chatMessages,
      { role: 'user', content: goalInput }
    ];
    
    setChatMessages(updatedMessages);
    
    // Simulate AI response based on input
    setTimeout(() => {
      const aiResponse = generateAIResponse(goalInput, selectedPersona);
      setChatMessages([
        ...updatedMessages,
        { role: 'assistant', content: aiResponse }
      ]);
    }, 500);
    
    setGoalInput('');
  };

  // Simple function to generate AI responses based on input and persona
  const generateAIResponse = (input, persona) => {
    if (!persona) return "Please select an AI application type first to help me better understand your needs.";
    
    const lowerInput = input.toLowerCase();
    let response = "";
    
    if (lowerInput.includes('knowledge') || lowerInput.includes('data')) {
      response = `For your ${persona.title} application, these knowledge base types are most relevant:\n\n`;
      
      if (persona.id === 'healthcare') {
        response += "• Clinical guidelines knowledge bases\n• Medical terminology databases\n• Treatment protocol collections\n• Healthcare compliance frameworks\n• Patient education resources";
      } else if (persona.id === 'legal') {
        response += "• Legal precedent collections\n• Regulatory frameworks\n• Contract template libraries\n• Jurisdictional law databases\n• Compliance requirement knowledge bases";
      } else if (persona.id === 'education') {
        response += "• Curriculum-aligned content libraries\n• Educational assessment frameworks\n• Subject matter expert knowledge bases\n• Learning progression models\n• Educational standards databases";
      } else if (persona.id === 'finance') {
        response += "• Financial regulations knowledge bases\n• Investment strategy collections\n• Risk assessment frameworks\n• Market analysis models\n• Financial planning templates";
      } else {
        response += "• Industry-specific terminologies\n• Workflow process knowledge bases\n• Domain expert knowledge collections\n• Best practices libraries\n• Specialized data models";
      }
    } else if (lowerInput.includes('benefit') || lowerInput.includes('improve') || lowerInput.includes('enhance')) {
      response = `By integrating a specialized knowledge base with your ${persona.title} application, you can expect:\n\n`;
      response += "• More accurate and domain-specific AI responses\n";
      response += "• Reduced AI hallucinations and factual errors\n";
      response += "• Compliance with industry standards and regulations\n";
      response += "• Enhanced user trust in AI-generated content\n";
      response += "• Specialized capabilities that general AI models lack";
    } else {
      response = `Thank you for sharing your needs for "${input}". For your ${persona.title} application, I recommend exploring knowledge bases that provide:\n\n`;
      response += "1. Domain-specific terminology and concepts\n";
      response += "2. Trusted, authoritative content from your industry\n";
      response += "3. Structured information that aligns with your specific use case\n\n";
      response += "In the next step, you'll be able to browse our marketplace for knowledge bases that match these requirements.";
    }
    
    return response;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Let us help you find the knowledge base that will take your AI to the next level
        </h2>
        <p className="text-lg text-gray-600">
          Enhance your AI with specialized knowledge for better, more reliable results
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content - 2/3 width on large screens */}
        <div className="lg:col-span-2 space-y-8">
          {/* Step 1: Persona Selection */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">1</span>
              Select Your AI Application Type
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
              {personas.map((persona) => (
                <button
                  key={persona.id}
                  onClick={() => handlePersonaSelect(persona)}
                  className={`flex flex-col items-center p-4 rounded-lg border transition-all ${
                    selectedPersona?.id === persona.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                >
                  <div className="text-3xl mb-2">{persona.icon}</div>
                  <div className="font-medium text-gray-900">{persona.title}</div>
                  <div className="text-sm text-gray-500 text-center mt-1">{persona.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Goal Setting with Chat Interface */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">2</span>
              What do you need your AI application to accomplish?
            </h3>
            
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
                    value={goalInput}
                    onChange={(e) => setGoalInput(e.target.value)}
                    placeholder="Describe what you need your AI application to accomplish..."
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
                    disabled={!selectedPersona}
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                    disabled={!goalInput.trim() || !selectedPersona}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </form>
                {!selectedPersona && (
                  <p className="text-sm text-gray-500 mt-2">Please select an AI application type first</p>
                )}
              </div>
            </div>
          </div>

          {/* Continue button */}
          <div className="text-center">
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              disabled={!selectedPersona || chatMessages.length < 3}
            >
              Browse Knowledge Base Marketplace
            </button>
            {(!selectedPersona || chatMessages.length < 3) && (
              <p className="text-sm text-gray-500 mt-2">Please complete the steps above to continue</p>
            )}
          </div>
        </div>

        {/* Explanatory sidebar - 1/3 width on large screens */}
        <div className="lg:col-span-1">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 sticky top-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">How Knowledge Bases Enhance Your AI</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-blue-700">Application Type</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Selecting your AI application type helps us identify the most relevant knowledge bases that contain domain-specific information aligned with your needs.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-blue-700">Specific Requirements</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Sharing your specific needs helps us recommend knowledge bases that address your exact use case and integration requirements.
                </p>
              </div>
              
              <div className="bg-white p-3 rounded border border-blue-200">
                <h4 className="font-medium text-blue-700">Benefits of Specialized Knowledge:</h4>
                <ul className="text-sm text-gray-600 mt-1 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Reduces AI hallucinations and improves accuracy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Ensures compliance with domain standards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Provides proper attribution and citation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Enables specialized capabilities beyond general AI</span>
                  </li>
                </ul>
              </div>
              
              {selectedPersona && (
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <h4 className="font-medium text-green-700">Application Selected:</h4>
                  <div className="flex items-center mt-1">
                    <span className="text-2xl mr-2">{selectedPersona.icon}</span>
                    <span className="font-medium">{selectedPersona.title}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    We'll help you find knowledge bases specialized for {selectedPersona.title.toLowerCase()} applications.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSetup; 