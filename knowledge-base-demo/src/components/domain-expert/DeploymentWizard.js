import React, { useState } from 'react';
import { useDemoContext } from '../../context/DemoContext';

const DeploymentWizard = () => {
  const { setCurrentStep } = useDemoContext();
  const [currentWizardStep, setCurrentWizardStep] = useState(1);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [settings, setSettings] = useState({
    name: 'My Knowledge Base',
    appearance: 'light',
    authentication: false,
    apiKey: 'kb_demo_12345678',
  });
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);

  const integrationOptions = [
    { id: 'chat', name: 'Chat Widget', icon: '💬' },
    { id: 'email', name: 'Email Integration', icon: '📧' },
    { id: 'voice', name: 'Voice Assistant', icon: '🎤' },
    { id: 'api', name: 'REST API', icon: '🔌' },
    { id: 'crm', name: 'CRM Integration', icon: '📊' },
  ];

  const handleNextStep = () => {
    setCurrentWizardStep(currentWizardStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentWizardStep(currentWizardStep - 1);
  };

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    // Simulate deployment process
    setTimeout(() => {
      setIsDeploying(false);
      setIsDeployed(true);
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentWizardStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Select Integration Type</h3>
            <p className="text-gray-600">Choose how you want to deploy your knowledge base:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {integrationOptions.map((option) => (
                <div 
                  key={option.id}
                  onClick={() => setSelectedIntegration(option.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedIntegration === option.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{option.icon}</span>
                    <span className="font-medium">{option.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Configure Settings</h3>
            <p className="text-gray-600">Customize how your knowledge base will appear and function:</p>
            
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-gray-700 mb-1">Knowledge Base Name</label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => handleSettingChange('name', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Appearance</label>
                <select
                  value={settings.appearance}
                  onChange={(e) => handleSettingChange('appearance', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="light">Light Theme</option>
                  <option value="dark">Dark Theme</option>
                  <option value="custom">Custom Theme</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="authentication"
                  checked={settings.authentication}
                  onChange={(e) => handleSettingChange('authentication', e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="authentication">Require Authentication</label>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Test Integration</h3>
            <p className="text-gray-600">Test your knowledge base integration before deploying:</p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="font-medium">{settings.name} Demo</div>
                <button className="text-sm text-blue-600">Reset</button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <p className="text-gray-700 mb-2">Sample query:</p>
                <div className="bg-blue-50 p-3 rounded-lg text-sm">
                  "What are the key features of the knowledge base tool?"
                </div>
                
                <p className="text-gray-700 mt-4 mb-2">Response:</p>
                <div className="bg-green-50 p-3 rounded-lg text-sm">
                  "The Knowledge Base Creation Tool offers multi-user perspectives, interactive knowledge visualization, AI testing interface, marketplace simulation, publishing workflow, and various deployment options."
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-green-600 text-sm">✓ Integration test successful!</p>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Deploy Knowledge Base</h3>
            <p className="text-gray-600">Get the code and instructions to deploy your knowledge base:</p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
              <div className="mb-4">
                <div className="font-medium mb-2">API Key</div>
                <div className="flex">
                  <input
                    type="text"
                    value={settings.apiKey}
                    readOnly
                    className="flex-1 p-2 border border-gray-300 rounded-l"
                  />
                  <button className="bg-gray-200 px-3 rounded-r border border-gray-300 border-l-0">
                    Copy
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="font-medium mb-2">Integration Code</div>
                <div className="bg-gray-800 text-green-400 p-3 rounded text-sm font-mono overflow-x-auto">
                  {selectedIntegration === 'chat' && `<script src="https://kb-demo.com/widget/${settings.apiKey}"></script>
<kb-chat theme="${settings.appearance}" name="${settings.name}"></kb-chat>`}
                  
                  {selectedIntegration === 'api' && `// Using fetch API
fetch('https://api.kb-demo.com/query', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${settings.apiKey}',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ query: 'Your question here' })
})`}
                  
                  {selectedIntegration === 'email' && `// Email Integration Configuration
Domain: your-domain.com
Email: kb-support@your-domain.com
API Key: ${settings.apiKey}
Webhook URL: https://api.kb-demo.com/webhook/email`}
                  
                  {selectedIntegration === 'voice' && `// Voice Assistant Integration
import KnowledgeBaseVoice from '@kb-demo/voice';

const voiceAssistant = new KnowledgeBaseVoice({
  apiKey: '${settings.apiKey}',
  name: '${settings.name}',
  theme: '${settings.appearance}'
});

voiceAssistant.initialize();`}
                  
                  {selectedIntegration === 'crm' && `// CRM Integration Details
CRM Provider: Generic CRM
API Endpoint: https://api.kb-demo.com/crm
API Key: ${settings.apiKey}
Webhook URL: https://api.kb-demo.com/webhook/crm
Integration ID: kb_crm_${Math.random().toString(36).substring(2, 10)}`}
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
                <p className="font-medium text-blue-800">Documentation</p>
                <p className="text-blue-600">
                  For detailed integration instructions, please refer to our 
                  <a href="#" className="underline ml-1">Knowledge Base Deployment Guide</a>.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Deployment Successful!</h3>
            
            {isDeploying ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Deploying your knowledge base...</p>
              </div>
            ) : isDeployed ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-green-600 text-2xl">✓</span>
                </div>
                <h4 className="text-xl font-medium text-gray-800 mt-4">Deployment Complete!</h4>
                <p className="text-gray-600 mt-2">
                  Your knowledge base has been successfully deployed and is now live.
                </p>
                <div className="mt-6 flex space-x-4 justify-center">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Start Over
                  </button>
                  <button
                    className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-600 mb-6">
                  Ready to make your knowledge base available in the selected environment?
                </p>
                <button
                  onClick={handleDeploy}
                  className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Deploy Now
                </button>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Deployment Wizard
        </h2>
        
        <p className="text-gray-600 mb-6">
          Deploy your knowledge base to make it accessible to your users. Follow the
          steps below to configure and deploy your solution.
        </p>
        
        {/* Progress Steps */}
        <div className="flex mb-8 justify-between relative">
          {['Integration', 'Settings', 'Test', 'Code', 'Deploy'].map((step, index) => (
            <div key={index} className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                currentWizardStep > index + 1 
                  ? 'bg-green-500 text-white' 
                  : currentWizardStep === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
              }`}>
                {currentWizardStep > index + 1 ? '✓' : index + 1}
              </div>
              <div className="text-xs mt-1">{step}</div>
            </div>
          ))}
          
          {/* Connector lines */}
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
          <div 
            className="absolute top-4 left-0 h-1 bg-blue-500 -z-10 transition-all duration-300"
            style={{ width: `${(currentWizardStep - 1) * 25}%` }}
          ></div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        {currentWizardStep !== 5 && (
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <button
              onClick={currentWizardStep === 1 ? () => setCurrentStep(1) : handlePrevStep}
              className="py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {currentWizardStep === 1 ? 'Cancel' : 'Previous'}
            </button>
            
            <button
              onClick={handleNextStep}
              disabled={currentWizardStep === 1 && !selectedIntegration}
              className={`py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
                currentWizardStep === 1 && !selectedIntegration ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeploymentWizard; 