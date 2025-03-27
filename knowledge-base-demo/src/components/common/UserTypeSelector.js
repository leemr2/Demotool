import React from 'react';
import { useDemoContext } from '../../context/DemoContext';

const UserTypeSelector = () => {
  const { setUserType } = useDemoContext();

  const userTypes = [
    {
      id: 'domainExpert',
      title: 'Expert Numero Uno',
      description: 'Upload and manage your domain knowledge',
      icon: '👨‍⚕️',
    },
    {
      id: 'knowledgeBuilder',
      title: 'Knowledge Builder Extraordinaire',
      description: 'Create and structure knowledge bases',
      icon: '🏗️',
    },
    {
      id: 'aiEnhancer',
      title: 'AI Enhancer-Make me Better',
      description: 'Enhance knowledge bases with AI capabilities',
      icon: '🤖',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Knowledge Base Creation Tool
        </h1>
        <p className="text-lg text-center text-gray-600 mb-8">
          Select your role to get started with building expert AI
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setUserType(type.id)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100 hover:border-blue-200"
            >
              <div className="text-4xl mb-4">{type.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{type.title}</h3>
              <p className="text-gray-600">{type.description}</p>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <span className="inline-flex items-center text-sm font-medium text-blue-600">
                  Get Started
                  <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelector; 