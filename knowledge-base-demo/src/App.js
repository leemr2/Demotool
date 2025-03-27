import React from 'react';
import { DemoProvider, useDemoContext } from './context/DemoContext';
import LandingPage from './components/common/LandingPage';
import StepNavigator from './components/common/StepNavigator';
import FileUploader from './components/domain-expert/FileUploader';
import KnowledgeMapVisualizer from './components/visualization/KnowledgeMapVisualizer';
import AITestingInterface from './components/ai-enhancer/AITestingInterface';
import DeploymentOptions from './components/ai-enhancer/DeploymentOptions';
import MarketplaceBrowser from './components/ai-enhancer/MarketplaceBrowser';
import KnowledgeBaseEvaluation from './components/ai-enhancer/KnowledgeBaseEvaluation';
import ProjectSetup from './components/knowledge-builder/ProjectSetup';
import AdvancedProcessing from './components/knowledge-builder/AdvancedProcessing';
import KnowledgeEngineering from './components/knowledge-builder/KnowledgeEngineering';
import MarketplacePublishing from './components/knowledge-builder/MarketplacePublishing';
import DomainExpertWelcomeSetup from './components/domain-expert/WelcomeSetup';
import AIEnhancerWelcomeSetup from './components/ai-enhancer/WelcomeSetup';
import DeploymentWizard from './components/domain-expert/DeploymentWizard';

// Main Demo Application
const DemoApp = () => {
  const { state } = useDemoContext();
  
  // If user type is not selected, show the landing page
  if (!state.userType) {
    return <LandingPage />;
  }
  
  // Render appropriate content based on user type and current step
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Knowledge Base Creation Tool
            </h1>
            <div className="text-sm text-gray-500">
              {state.userType === 'domainExpert' && 'Domain Expert Flow'}
              {state.userType === 'knowledgeBuilder' && 'Knowledge Builder Flow'}
              {state.userType === 'aiEnhancer' && 'AI Enhancer Flow'}
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <StepNavigator />
        
        <div className="mt-6">
          {/* Domain Expert Flow */}
          {state.userType === 'domainExpert' && (
            <>
              {state.currentStep === 1 && <DomainExpertWelcomeSetup />}
              {state.currentStep === 2 && <FileUploader />}
              {state.currentStep === 3 && <KnowledgeMapVisualizer />}
              {state.currentStep === 4 && <AITestingInterface />}
              {state.currentStep === 5 && <DeploymentWizard />}
            </>
          )}
          
          {/* Knowledge Builder Flow */}
          {state.userType === 'knowledgeBuilder' && (
            <>
              {state.currentStep === 1 && <ProjectSetup />}
              {state.currentStep === 2 && <AdvancedProcessing />}
              {state.currentStep === 3 && <KnowledgeEngineering />}
              {state.currentStep === 4 && <AITestingInterface />}
              {state.currentStep === 5 && <MarketplacePublishing />}
            </>
          )}
          
          {/* AI Enhancer Flow */}
          {state.userType === 'aiEnhancer' && (
            <>
              {state.currentStep === 1 && <AIEnhancerWelcomeSetup />}
              {state.currentStep === 2 && <MarketplaceBrowser />}
              {state.currentStep === 3 && <KnowledgeBaseEvaluation />}
              {state.currentStep === 4 && <DeploymentOptions />}
              {state.currentStep === 5 && <DeploymentWizard />}
            </>
          )}
        </div>
      </main>
      
      <footer className="bg-white mt-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Knowledge Base Creation Tool Demo
            </div>
            <button 
              className="text-sm text-blue-500 hover:text-blue-600"
              onClick={() => window.location.reload()}
            >
              Restart Demo
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Wrapper component with context provider
const App = () => {
  return (
    <DemoProvider>
      <DemoApp />
    </DemoProvider>
  );
};

export default App;