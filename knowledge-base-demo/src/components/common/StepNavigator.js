import React from 'react';
import { useDemoContext } from '../../context/DemoContext';

const StepNavigator = () => {
  const { state, setCurrentStep } = useDemoContext();
  const { currentStep, userType } = state;

  const getSteps = () => {
    switch (userType) {
      case 'domainExpert':
        return [
          { number: 1, title: 'Welcome' },
          { number: 2, title: 'Upload Files' },
          { number: 3, title: 'Knowledge Map' },
          { number: 4, title: 'AI Testing' },
          { number: 5, title: 'Integration' },
        ];
      case 'knowledgeBuilder':
        return [
          { number: 1, title: 'Project Setup' },
          { number: 2, title: 'Processing' },
          { number: 3, title: 'Engineering' },
          { number: 4, title: 'Testing' },
          { number: 5, title: 'Publishing' },
        ];
      case 'aiEnhancer':
        return [
          { number: 1, title: 'Welcome' },
          { number: 2, title: 'Browse' },
          { number: 3, title: 'Evaluate' },
          { number: 4, title: 'Purchase' },
          { number: 5, title: 'Deploy' },
        ];
      default:
        return [];
    }
  };

  const steps = getSteps();

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <button
              onClick={() => setCurrentStep(step.number)}
              className={`flex flex-col items-center ${
                currentStep >= step.number
                  ? 'text-blue-600'
                  : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= step.number
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {step.number}
              </div>
              <span className="text-sm font-medium">{step.title}</span>
            </button>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  currentStep > step.number
                    ? 'bg-blue-600'
                    : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepNavigator; 