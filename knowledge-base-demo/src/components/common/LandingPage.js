import React, { useState } from 'react';
import { useDemoContext } from '../../context/DemoContext';

const LandingPage = () => {
  const { setUserType } = useDemoContext();
  const [activeTab, setActiveTab] = useState('domainExpert');

  // User type definitions
  const userTypes = [
    {
      id: 'domainExpert',
      title: "I'm a Domain Expert",
      shortTitle: 'Domain Expert',
      icon: '👨‍⚕️',
      heading: 'Enhance Your Practice with AI',
      copy: 'Turn your expertise and documentation into an AI assistant that truly understands your field',
      cta: 'Build Your Practice AI',
      features: [
        'No coding required - just upload your documents',
        'AI that follows your specific protocols and guidelines',
        'Save time on routine questions and information retrieval',
        'Maintain proper attribution to authoritative sources'
      ],
      workflow: [
        'Upload your documents and guidelines',
        'Our system organizes and connects your knowledge',
        'Review for completeness and accuracy',
        'Deploy to your website, systems, or tools'
      ],
      testimonial: {
        quote: "I've reduced patient follow-up questions by 70% while maintaining the exact standards of care I require.",
        author: "Dr. Sarah Chen, Specialist",
        role: "Medical Practice"
      }
    },
    {
      id: 'knowledgeBuilder',
      title: "I'm a Knowledge Builder",
      shortTitle: 'Knowledge Builder',
      icon: '🏗️',
      heading: 'Create, Share & Monetize Knowledge Bases',
      copy: 'Build specialized AI knowledge bases and share or sell them in our marketplace',
      cta: 'Start Building',
      features: [
        'Create valuable knowledge bases for specific industries',
        'Powerful tools for cleaning, structuring, and optimizing data',
        'Built-in attribution and licensing management',
        'Set your own pricing and access models'
      ],
      workflow: [
        'Access advanced knowledge structuring tools',
        'Build, enhance, and test knowledge bases',
        'Set pricing, licensing, and access controls',
        'Publish to marketplace and track performance'
      ],
      testimonial: {
        quote: "I've built three specialized legal knowledge bases that generate consistent monthly income with minimal maintenance.",
        author: "Miguel Rodríguez",
        role: "Legal Tech Consultant"
      }
    },
    {
      id: 'aiEnhancer',
      title: 'I Need Better AI',
      shortTitle: 'AI Enhancer',
      icon: '🤖',
      heading: 'Find Ready-Made Expert AI',
      copy: 'Browse our marketplace for pre-built knowledge bases in your industry',
      cta: 'Explore Marketplace',
      features: [
        'Browse verified knowledge bases by industry',
        'One-click deployment to your existing systems',
        'Pay only for what you need - subscription or one-time options',
        'Continuously updated with latest information'
      ],
      workflow: [
        'Browse marketplace by industry and specialty',
        'Compare ratings, coverage, and pricing',
        'Purchase access to the knowledge base',
        'Deploy instantly to your systems'
      ],
      testimonial: {
        quote: "We found a specialized knowledge base for our industry compliance needs and deployed it in hours, not months.",
        author: "Jennifer Park",
        role: "Operations Director"
      }
    },
  ];

  const activeUser = userTypes.find(type => type.id === activeTab);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Make AI an Expert in Your Field
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Transform specialized knowledge into accurate, reliable AI without technical complexity
            </p>
            <div className="mt-8">
              <button
                onClick={() => setUserType(activeTab)}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Start Building Your Expert AI
              </button>
            </div>
          </div>

          {/* AI Comparison Visualization */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-lg font-semibold mb-3 text-gray-700">Generic AI</div>
              <div className="bg-gray-50 p-4 rounded min-h-[160px] flex items-center text-gray-500 italic">
                "I think the typical procedure might involve something like that, but I can't be certain..."
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-200">
              <div className="text-lg font-semibold mb-3 text-blue-700">How It Works</div>
              <div className="bg-blue-50 p-4 rounded min-h-[160px] flex flex-col justify-center">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">1</div>
                  <div className="ml-3">Upload domain knowledge</div>
                </div>
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">2</div>
                  <div className="ml-3">Our system organizes & connects</div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">3</div>
                  <div className="ml-3">AI delivers expert-level answers</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
              <div className="text-lg font-semibold mb-3 text-green-700">Expert AI</div>
              <div className="bg-green-50 p-4 rounded min-h-[160px] flex items-center text-gray-800">
                "According to [Source], the standard procedure requires A, B, and C steps in this sequence..."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Type Selector Tabs */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Who are you building AI for?
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            {userTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={`px-5 py-3 rounded-full text-sm md:text-base font-medium transition-colors duration-200 ${
                  activeTab === type.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.title}
              </button>
            ))}
          </div>
          
          {/* User Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userTypes.map((type) => (
              <div 
                key={type.id}
                className={`border rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${
                  activeTab === type.id 
                    ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50 transform translate-y-[-8px]' 
                    : 'border-gray-200 hover:shadow-md'
                }`}
              >
                <div className="p-6">
                  <div className="text-4xl mb-4">{type.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{type.heading}</h3>
                  <p className="text-gray-600 mb-6">{type.copy}</p>
                  <button
                    onClick={() => setUserType(type.id)}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
                      activeTab === type.id 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-gray-500 hover:bg-gray-600'
                    }`}
                  >
                    {type.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Specialized Knowledge Makes AI Better
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Generic AI Limitations</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❌</span>
                  <span>Trained on general internet data with varying quality</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❌</span>
                  <span>Lacks specialized terminology and domain context</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❌</span>
                  <span>Cannot cite authoritative sources properly</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❌</span>
                  <span>Hallucinates answers when uncertain</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert AI Advantages</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Built on your specific domain knowledge and expertise</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Understands industry-specific terminology and context</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Properly attributes information to authoritative sources</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Admits limitations and avoids making up answers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* User-Specific Detail Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {activeUser.heading}
            </h2>
            <p className="text-xl text-gray-600">
              {activeUser.id === 'domainExpert' && (
                "Your expertise is too valuable to be locked in documents or limited by consultation hours. Make your knowledge work for you around the clock with AI that truly understands your field and practice."
              )}
              {activeUser.id === 'knowledgeBuilder' && (
                "The market for specialized AI is exploding, but most organizations lack the technical skills to build it themselves. That's your opportunity."
              )}
              {activeUser.id === 'aiEnhancer' && (
                "Finding AI that actually understands your industry shouldn't require a technical degree or months of development."
              )}
            </p>
          </div>
          
          {/* Features */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold text-center mb-8">Key Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeUser.features.map((feature, index) => (
                <div key={index} className="bg-gray-50 p-5 rounded-lg flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-700">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* How It Works */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold text-center mb-8">How It Works</h3>
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Connection Line */}
                <div className="absolute left-9 top-0 bottom-0 w-1 bg-blue-200 z-0"></div>
                
                {/* Steps */}
                {activeUser.workflow.map((step, index) => (
                  <div key={index} className="relative z-10 flex items-start mb-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="ml-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                      <p className="text-gray-700">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Testimonial */}
          <div className="max-w-2xl mx-auto bg-blue-50 rounded-xl p-8 border border-blue-100">
            <div className="text-lg text-gray-700 italic mb-4">"{activeUser.testimonial.quote}"</div>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold">
                {activeUser.testimonial.author.charAt(0)}
              </div>
              <div className="ml-4">
                <div className="font-medium text-gray-900">{activeUser.testimonial.author}</div>
                <div className="text-sm text-gray-500">{activeUser.testimonial.role}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unified Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Core Features For Everyone
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Attribution System</h3>
              <p className="text-gray-600 mb-4">
                All responses are properly sourced and cited, maintaining the integrity of information and building trust with users.
              </p>
              <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700">
                "According to [Clinical Guidelines 2023, p.45], the recommended procedure is..."
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Deployment</h3>
              <p className="text-gray-600 mb-4">
                One-click deployment to websites, messaging platforms, internal tools, or our hosted solution.
              </p>
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-gray-50 p-2 rounded text-center text-xs">Website</div>
                <div className="bg-gray-50 p-2 rounded text-center text-xs">Slack</div>
                <div className="bg-gray-50 p-2 rounded text-center text-xs">Teams</div>
                <div className="bg-gray-50 p-2 rounded text-center text-xs">API</div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Assurance</h3>
              <p className="text-gray-600 mb-4">
                Built-in testing and verification tools ensure your AI provides accurate, reliable information.
              </p>
              <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <div className="text-right text-xs text-gray-500 mt-1">92% accuracy score</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to transform AI with your expertise?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {activeUser.id === 'domainExpert' && "Bring your expertise to AI and transform your practice"}
            {activeUser.id === 'knowledgeBuilder' && "Start building valuable knowledge bases today"}
            {activeUser.id === 'aiEnhancer' && "Find the expert AI your business needs now"}
          </p>
          <button
            onClick={() => setUserType(activeTab)}
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {activeUser.cta}
          </button>
          <p className="mt-4 text-sm text-gray-500">
            No credit card required • Free to get started
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 