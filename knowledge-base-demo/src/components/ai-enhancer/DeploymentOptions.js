import React, { useState } from 'react';
import { useDemoContext } from '../../context/DemoContext';

const DeploymentOptions = () => {
  const { setCurrentStep } = useDemoContext();
  const [deploymentStatus, setDeploymentStatus] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const deploymentOptions = [
    {
      id: 'cloud',
      title: 'Cloud Deployment',
      description: 'Deploy to our secure cloud infrastructure',
      features: [
        'Automatic scaling',
        'High availability',
        'Regular backups',
        '24/7 support',
      ],
      price: '$99/month',
    },
    {
      id: 'self-hosted',
      title: 'Self-Hosted',
      description: 'Deploy on your own infrastructure',
      features: [
        'Full control',
        'No monthly fees',
        'Custom integration',
        'Data sovereignty',
      ],
      price: 'One-time $999',
    },
    {
      id: 'hybrid',
      title: 'Hybrid Deployment',
      description: 'Combine cloud and self-hosted options',
      features: [
        'Flexible scaling',
        'Partial control',
        'Custom integration',
        'Balanced cost',
      ],
      price: '$49/month + setup fee',
    },
  ];

  const handleDeploy = async (option) => {
    setSelectedOption(option);
    setDeploymentStatus('deploying');

    // Simulate deployment process
    setTimeout(() => {
      setDeploymentStatus('success');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Choose Deployment Option
        </h2>
        <p className="text-gray-600">
          Select the deployment option that best suits your needs
        </p>
      </div>

      {deploymentStatus === 'success' ? (
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-green-500 text-4xl mb-4">✓</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Deployment Successful!
          </h3>
          <p className="text-gray-600 mb-6">
            Your knowledge base has been deployed using the{' '}
            <span className="font-medium">{selectedOption.title}</span> option.
          </p>
          <button
            onClick={() => setCurrentStep(1)}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Start Over
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deploymentOptions.map((option) => (
            <div
              key={option.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {option.title}
              </h3>
              <p className="text-gray-600 mb-4">{option.description}</p>
              <ul className="space-y-2 mb-6">
                {option.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="text-xl font-semibold text-blue-600 mb-4">
                {option.price}
              </div>
              <button
                onClick={() => handleDeploy(option)}
                disabled={deploymentStatus === 'deploying'}
                className={`w-full py-2 px-4 rounded-lg text-white font-medium
                  ${deploymentStatus === 'deploying'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                {deploymentStatus === 'deploying' ? 'Deploying...' : 'Select Option'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeploymentOptions; 