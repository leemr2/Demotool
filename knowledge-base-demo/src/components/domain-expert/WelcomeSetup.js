import React, { useState } from 'react';
import { useDemoContext } from '../../context/DemoContext';

const WelcomeSetup = ({ isAIEnhancer = false }) => {
  const { setCurrentStep, setSelectedPersona } = useDemoContext();
  const [selectedPersona, setLocalSelectedPersona] = useState(null);
  const [goalInput, setGoalInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { 
      role: 'assistant', 
      content: "Hello! I'm here to help you design your knowledge base. What specific tasks or questions would you like your AI to help with?" 
    }
  ]);

  const handleGetStarted = () => {
    setCurrentStep(2);
  };

  const personas = [
    {
      id: 'healthcare',
      title: 'Healthcare Provider',
      icon: '👨‍⚕️',
      description: 'For medical professionals, clinicians, and healthcare specialists',
      examples: ['Patient consultation support', 'Treatment protocol guidance', 'Medical research assistance']
    },
    {
      id: 'legal',
      title: 'Attorney',
      icon: '⚖️',
      description: 'For lawyers, paralegals, and legal consultants',
      examples: ['Case research assistance', 'Document review support', 'Legal precedent analysis']
    },
    {
      id: 'education',
      title: 'Educator',
      icon: '👩‍🏫',
      description: 'For teachers, professors, and educational institutions',
      examples: ['Student question answering', 'Curriculum development', 'Research guidance']
    },
    {
      id: 'finance',
      title: 'Financial Advisor',
      icon: '💼',
      description: 'For financial professionals and consultants',
      examples: ['Investment analysis support', 'Financial planning assistance', 'Regulatory compliance guidance']
    },
    {
      id: 'custom',
      title: 'Custom Domain',
      icon: '🔍',
      description: 'For specialized fields and unique knowledge domains',
      examples: ['Define your own use cases', 'Specialized knowledge management', 'Custom workflows']
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
        content: `Great choice! As a ${persona.title}, what specific tasks or questions would you like your AI to help with? For example: ${persona.examples.join(', ')}.` 
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
    if (!persona) return "Please select a persona first to help me better understand your needs.";
    
    const lowerInput = input.toLowerCase();
    let response = "";
    
    if (lowerInput.includes('document') || lowerInput.includes('upload')) {
      response = `For your ${persona.title} knowledge base, I recommend uploading the following document types:\n\n`;
      
      if (persona.id === 'healthcare') {
        response += "• Clinical guidelines and protocols\n• Medical reference materials\n• Treatment documentation\n• De-identified case studies\n• Institutional policies";
      } else if (persona.id === 'legal') {
        response += "• Case precedents\n• Legal statutes and regulations\n• Practice guides\n• Contract templates\n• Legal research documents";
      } else if (persona.id === 'education') {
        response += "• Curriculum materials\n• Lesson plans\n• Academic research\n• Assessment guidelines\n• Educational standards";
      } else if (persona.id === 'finance') {
        response += "• Financial regulations\n• Investment guidelines\n• Market analysis documents\n• Financial planning templates\n• Risk assessment frameworks";
      } else {
        response += "• Core reference materials\n• Process documentation\n• Best practices guides\n• Case studies\n• Domain-specific research";
      }
    } else if (lowerInput.includes('help') || lowerInput.includes('assist') || lowerInput.includes('support')) {
      response = `Based on your role as a ${persona.title}, your AI could assist with:\n\n`;
      response += persona.examples.map(ex => `• ${ex}`).join('\n');
      response += "\n\nIn the next step, you'll be able to upload relevant documents to build this knowledge base.";
    } else {
      response = `Thank you for sharing your goals. For your ${persona.title} knowledge base focused on "${input}", I recommend:\n\n`;
      response += "1. Gathering authoritative documents in your field\n";
      response += "2. Including any specialized terminology and context\n";
      response += "3. Adding commonly asked questions and their answers\n\n";
      response += "This will help create an AI that can accurately respond to queries in your specific domain.";
    }
    
    return response;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Knowledge Base Creation
        </h2>
        <p className="text-lg text-gray-600">
          Let's build an AI assistant that speaks your professional language
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content - 2/3 width on large screens */}
        <div className="lg:col-span-2 space-y-8">
          {/* Step 1: Persona Selection */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">1</span>
              Select Your Professional Domain
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
              What do you want your AI to help with?
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
                    placeholder="Describe what you want your AI to help with..."
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
                  <p className="text-sm text-gray-500 mt-2">Please select a professional domain first</p>
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
              Continue to Document Upload
            </button>
            {(!selectedPersona || chatMessages.length < 3) && (
              <p className="text-sm text-gray-500 mt-2">Please complete the steps above to continue</p>
            )}
          </div>
        </div>

        {/* Explanatory sidebar - 1/3 width on large screens */}
        <div className="lg:col-span-1">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 sticky top-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">How This Helps Your Knowledge Base</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-blue-700">Professional Domain</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Selecting your professional domain helps us pre-configure your knowledge base with the right structure, terminology, and content expectations for your field.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-blue-700">Goal Setting</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Describing your goals helps us identify the types of documents you should upload and how to organize your knowledge for maximum effectiveness.
                </p>
              </div>
              
              <div className="bg-white p-3 rounded border border-blue-200">
                <h4 className="font-medium text-blue-700">Behind the Scenes:</h4>
                <ul className="text-sm text-gray-600 mt-1 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>We create domain-specific extraction patterns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Configure specialized knowledge indexing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Set up proper attribute handling and citation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Prepare domain-specific quality verification</span>
                  </li>
                </ul>
              </div>
              
              {selectedPersona && (
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <h4 className="font-medium text-green-700">Domain Selected:</h4>
                  <div className="flex items-center mt-1">
                    <span className="text-2xl mr-2">{selectedPersona.icon}</span>
                    <span className="font-medium">{selectedPersona.title}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    We're optimizing your knowledge base for {selectedPersona.title.toLowerCase()} workflows and terminology.
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