// src/utils/mockDataGenerator.js

/**
 * Mock data generator utility for the Knowledge Base Creation Tool Demo
 * 
 * This utility provides functions to generate realistic mock data for
 * different aspects of the demo, including knowledge bases, user profiles,
 * files, processing results, and AI responses.
 */

/**
 * Generate mock data based on user type and selected scenario
 * @param {string} userType - 'domainExpert', 'knowledgeBuilder', or 'aiEnhancer'
 * @param {string} scenario - 'medical', 'legal', 'financial', or 'default'
 * @returns {Object} Mock data object with various data sets
 */
export const generateMockData = (userType, scenario = 'default') => {
  return {
    userProfile: generateUserProfile(userType, scenario),
    knowledgeMap: generateKnowledgeMap(userType, scenario),
    qualityMetrics: generateQualityMetrics(userType),
    mockFiles: generateMockFiles(scenario),
    marketplaceListings: generateMarketplaceListings(scenario),
    deploymentOptions: generateDeploymentOptions(userType),
  };
};

/**
 * Generate a mock user profile
 * @param {string} userType - User type
 * @param {string} scenario - Selected scenario
 * @returns {Object} User profile object
 */
export const generateUserProfile = (userType, scenario) => {
  const profiles = {
    domainExpert: {
      medical: {
        title: 'Healthcare Provider',
        organization: 'City Medical Center',
        specialty: 'Internal Medicine',
        team: 'Primary Care Team',
        experience: '15 years',
      },
      legal: {
        title: 'Legal Professional',
        organization: 'Johnson & Partners Law Firm',
        specialty: 'Corporate Law',
        team: 'Contract Division',
        experience: '8 years',
      },
      financial: {
        title: 'Financial Advisor',
        organization: 'Wealth Strategies Group',
        specialty: 'Retirement Planning',
        team: 'Client Advisory Team',
        experience: '12 years',
      },
      default: {
        title: 'Domain Expert',
        organization: 'Example Organization',
        specialty: 'General Practice',
        team: 'Core Team',
        experience: '10 years',
      },
    },
    knowledgeBuilder: {
      medical: {
        title: 'Healthcare Knowledge Engineer',
        organization: 'MedTech Solutions',
        specialty: 'Clinical Knowledge Systems',
        team: 'Knowledge Engineering',
        experience: '6 years',
      },
      legal: {
        title: 'Legal Knowledge Architect',
        organization: 'LegalAI Innovations',
        specialty: 'Legal Knowledge Modeling',
        team: 'Knowledge Development',
        experience: '5 years',
      },
      financial: {
        title: 'Financial Knowledge Developer',
        organization: 'FinKnow Technologies',
        specialty: 'Investment Knowledge Systems',
        team: 'Knowledge Architecture',
        experience: '7 years',
      },
      default: {
        title: 'Knowledge Builder',
        organization: 'Knowledge Solutions Inc.',
        specialty: 'Knowledge Engineering',
        team: 'Development Team',
        experience: '5 years',
      },
    },
    aiEnhancer: {
      medical: {
        title: 'Healthcare Administrator',
        organization: 'Regional Health System',
        department: 'Patient Services',
        useCase: 'Patient Support',
        aiExperience: 'Beginner',
      },
      legal: {
        title: 'Legal Operations Manager',
        organization: 'Corporate Legal Department',
        department: 'Operations',
        useCase: 'Contract Analysis',
        aiExperience: 'Intermediate',
      },
      financial: {
        title: 'Financial Services Director',
        organization: 'Investment Management Firm',
        department: 'Client Services',
        useCase: 'Client Advisory',
        aiExperience: 'Advanced',
      },
      default: {
        title: 'Department Manager',
        organization: 'Enterprise Corporation',
        department: 'Operations',
        useCase: 'Process Automation',
        aiExperience: 'Intermediate',
      },
    },
  };
  
  return profiles[userType][scenario] || profiles[userType].default;
};

/**
 * Generate mock knowledge map data
 * @param {string} userType - User type
 * @param {string} scenario - Selected scenario
 * @returns {Object} Knowledge map object
 */
export const generateKnowledgeMap = (userType, scenario) => {
  // Base nodes for all scenarios
  const baseNodes = [
    { id: 'core', label: 'Core Concepts', type: 'category', size: 100 },
    { id: 'procedures', label: 'Procedures', type: 'category', size: 80 },
    { id: 'guidelines', label: 'Guidelines', type: 'category', size: 70 },
    { id: 'references', label: 'References', type: 'category', size: 60 },
  ];
  
  // Scenario-specific nodes
  let specificNodes = [];
  
  if (scenario === 'medical') {
    specificNodes = [
      { id: 'diagnoses', label: 'Diagnoses', type: 'document', size: 85 },
      { id: 'treatments', label: 'Treatment Protocols', type: 'document', size: 90 },
      { id: 'medications', label: 'Medications', type: 'document', size: 75 },
      { id: 'contraindications', label: 'Contraindications', type: 'document', size: 65 },
      { id: 'patient-education', label: 'Patient Education', type: 'document', size: 55 },
    ];
  } else if (scenario === 'legal') {
    specificNodes = [
      { id: 'statutes', label: 'Statutes', type: 'document', size: 85 },
      { id: 'case-law', label: 'Case Law', type: 'document', size: 90 },
      { id: 'precedents', label: 'Precedents', type: 'document', size: 75 },
      { id: 'contracts', label: 'Contract Templates', type: 'document', size: 65 },
      { id: 'client-advice', label: 'Client Advice', type: 'document', size: 55 },
    ];
  } else if (scenario === 'financial') {
    specificNodes = [
      { id: 'regulations', label: 'Regulations', type: 'document', size: 85 },
      { id: 'compliance', label: 'Compliance', type: 'document', size: 90 },
      { id: 'products', label: 'Financial Products', type: 'document', size: 75 },
      { id: 'risk-assessments', label: 'Risk Assessments', type: 'document', size: 65 },
      { id: 'client-profiles', label: 'Client Profiles', type: 'document', size: 55 },
    ];
  } else {
    // Default nodes if no scenario selected
    specificNodes = [
      { id: 'doc1', label: 'Document 1', type: 'document', size: 85 },
      { id: 'doc2', label: 'Document 2', type: 'document', size: 75 },
      { id: 'doc3', label: 'Document 3', type: 'document', size: 65 },
      { id: 'doc4', label: 'Document 4', type: 'document', size: 55 },
      { id: 'doc5', label: 'Document 5', type: 'document', size: 45 },
    ];
  }
  
  // Generate links between nodes
  const links = [];
  
  // Connect each base node to at least one specific node
  baseNodes.forEach((baseNode, index) => {
    // Connect to at least one specific node
    links.push({
      source: baseNode.id,
      target: specificNodes[index % specificNodes.length].id,
      strength: 0.8
    });
    
    // Connect to another random specific node
    const randomIndex = Math.floor(Math.random() * specificNodes.length);
    if (randomIndex !== index % specificNodes.length) {
      links.push({
        source: baseNode.id,
        target: specificNodes[randomIndex].id,
        strength: 0.5
      });
    }
  });
  
  // Connect some specific nodes to each other
  for (let i = 0; i < specificNodes.length - 1; i++) {
    links.push({
      source: specificNodes[i].id,
      target: specificNodes[i + 1].id,
      strength: 0.3
    });
  }
  
  // Connect the first and last specific nodes to create a loop
  links.push({
    source: specificNodes[0].id,
    target: specificNodes[specificNodes.length - 1].id,
    strength: 0.2
  });
  
  // Apply user type-specific coverage values
  const coverage = {
    total: 100,
    covered: userType === 'knowledgeBuilder' ? 95 : userType === 'domainExpert' ? 85 : 75,
    gaps: [
      scenario === 'medical' ? 'Rare conditions' : scenario === 'legal' ? 'International law' : 'Alternative investments',
      scenario === 'medical' ? 'Experimental treatments' : scenario === 'legal' ? 'Recent court rulings' : 'Cryptocurrency regulations',
    ]
  };
  
  return {
    nodes: [...baseNodes, ...specificNodes],
    links,
    coverage
  };
};

/**
 * Generate quality metrics for the knowledge base
 * @param {string} userType - User type
 * @returns {Object} Quality metrics object
 */
export const generateQualityMetrics = (userType) => {
  // Base metrics adjusted by user type
  const qualityFactor = userType === 'knowledgeBuilder' ? 1.1 : 
                        userType === 'domainExpert' ? 1.0 : 0.9;
  
  return {
    completeness: Math.min(100, Math.round(85 * qualityFactor)),
    accuracy: Math.min(100, Math.round(92 * qualityFactor)),
    relevance: Math.min(100, Math.round(88 * qualityFactor)),
    clarity: Math.min(100, Math.round(90 * qualityFactor)),
    overall: Math.min(100, Math.round(89 * qualityFactor)),
    technicalDetails: {
      embeddingDimensions: 768,
      chunkSize: 512,
      chunkOverlap: 128,
      retrievalAlgorithm: 'Hybrid BM25 + Cosine Similarity',
      retrievalTopK: 5,
      reranking: userType === 'knowledgeBuilder',
    }
  };
};

/**
 * Generate mock files based on the selected scenario
 * @param {string} scenario - Selected scenario
 * @returns {Array} Array of mock file objects
 */
export const generateMockFiles = (scenario) => {
  // Common file types
  const commonFiles = [
    {
      id: 'file-common-1',
      name: 'Organization Overview.pdf',
      size: 1245000,
      type: 'application/pdf',
      extension: 'pdf',
      uploadDate: new Date(),
      status: 'processed',
      progress: 100,
    },
    {
      id: 'file-common-2',
      name: 'General Guidelines.docx',
      size: 892000,
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      extension: 'docx',
      uploadDate: new Date(),
      status: 'processed',
      progress: 100,
    }
  ];
  
  // Scenario-specific files
  let scenarioFiles = [];
  
  if (scenario === 'medical') {
    scenarioFiles = [
      {
        id: 'file-med-1',
        name: 'Clinical Protocols 2023.pdf',
        size: 3245000,
        type: 'application/pdf',
        extension: 'pdf',
        uploadDate: new Date(),
        status: 'processed',
        progress: 100,
      },
      {
        id: 'file-med-2',
        name: 'Medication Formulary.xlsx',
        size: 1567000,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        extension: 'xlsx',
        uploadDate: new Date(),
        status: 'processed',
        progress: 100,
      },
      {
        id: 'file-med-3',
        name: 'Patient Education Materials.docx',
        size: 2189000,
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        extension: 'docx',
        uploadDate: new Date(),
        status: 'processed',
        progress: 100,
      },
      {
        id: 'file-med-4',
        name: 'Diagnosis Guidelines.pdf',
        size: 4532000,
        type: 'application/pdf',
        extension: 'pdf',
        uploadDate: new Date(),
        status: 'processed',
        progress: 100,
      },
    ];
  } else if (scenario === 'legal') {
    scenarioFiles = [
      {
        id: 'file-legal-1',
        name: 'Contract Templates 2023.docx',
        size: 2845000,
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        extension: 'docx',
        uploadDate: new Date(),
        status: 'processed',
        progress: 100,
      },
      {
        id: 'file-legal-2',
        name: 'Case Law References.pdf',
        size: 5621000,
        type: 'application/pdf',
        extension: 'pdf',
        uploadDate: new Date(),
        status: 'processed',
        progress: 100,
      },
      {
        id: 'file-legal-3',
        name: 'Client Advisory Guidelines.docx',
        size: 1876000,
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        extension: 'docx',
        uploadDate: new Date(),
        status: 'processed',
        progress: 100,
      },
      {
        id: 'file-legal-4',
        name: 'Regulatory Updates Q3 2023.pdf',
        size: 3214000,
        type: 'application/pdf',
        extension: 'pdf',
        uploadDate: new Date(),
        status: 'processed',
        progress: 100,
      },
    ];
  } else if (scenario === 'financial') {
    scenarioFiles = [
      {
        id: 'file-fin-1',
        name: 'Investment Strategies 2023.pdf',
        size: 2765000,
        type: 'application/pdf',
        extension: 'pdf',
        uploadDate: new Date(),
        status: 'processed',
        progress: 100,
      },
      {
        id: 'file-fin-2',
        name: 'Product Specifications.xlsx',
        size: 1987000,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        extension: 'xlsx',
        uploadDate: new Date(),
        status: 'processed',
        progress: 100,
      },
      {
        id: 'file-fin-3',
        name: 'Client Advisory Guidelines.docx',
        size: 2345000,
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        extension: 'docx',
        uploadDate: new Date(),
        status: 'processed',
        progress: 100,
      },
      {
        id: 'file-fin-4',
        name: 'Risk Assessment Framework.pdf',
        size: 3157000,
        type: 'application/pdf',
        extension: 'pdf',
        uploadDate: new Date(),
        status: 'processed',
        progress: 100,
      },
    ];
  } else {
    // Default files
    scenarioFiles = [
      {
        id: 'file-default-1',
        name: 'Document 1.pdf',
        size: 2500000,
        type: 'application/pdf',
        extension: 'pdf',
        uploadDate: new Date(),
        status: 'processed',
        progress: 100,
      },
      {
        id: 'file-default-2',
        name: 'Document 2.docx',
        size: 1800000,
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        extension: 'docx',
        uploadDate: new Date(),
        status: 'processed',
        progress: 100,
      },
      {
        id: 'file-default-3',
        name: 'Document 3.xlsx',
        size: 1500000,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        extension: 'xlsx',
        uploadDate: new Date(),
        status: 'processed',
        progress: 100,
      },
    ];
  }
  
  return [...commonFiles, ...scenarioFiles];
};

/**
 * Generate mock marketplace listings based on scenario
 * @param {string} scenario - Selected scenario
 * @returns {Array} Array of marketplace listing objects
 */
export const generateMarketplaceListings = (scenario) => {
  // Base marketplace listings available in all scenarios
  const baseListings = [
    {
      id: 'general-business',
      title: 'General Business Operations',
      publisher: 'Business Experts Inc.',
      rating: 4.2,
      reviews: 156,
      price: {
        monthly: 199,
        annual: 1990,
        oneTime: 4990
      },
      coverage: 85,
      lastUpdated: '2 weeks ago',
      category: 'Business',
      description: 'Comprehensive knowledge base covering general business operations, HR policies, and standard operating procedures.',
      featured: false,
    },
    {
      id: 'customer-service',
      title: 'Customer Service Excellence',
      publisher: 'Service First Academy',
      rating: 4.8,
      reviews: 423,
      price: {
        monthly: 149,
        annual: 1490,
        oneTime: 3990
      },
      coverage: 92,
      lastUpdated: '3 days ago',
      category: 'Customer Service',
      description: 'Complete customer service knowledge with scripts, troubleshooting guides, and satisfaction strategies.',
      featured: true,
    }
  ];
  
  // Scenario-specific marketplace listings
  let scenarioListings = [];
  
  if (scenario === 'medical') {
    scenarioListings = [
      {
        id: 'healthcare-admin',
        title: 'Healthcare Administration',
        publisher: 'MedAdmin Solutions',
        rating: 4.7,
        reviews: 289,
        price: {
          monthly: 299,
          annual: 2990,
          oneTime: 7990
        },
        coverage: 94,
        lastUpdated: '1 week ago',
        category: 'Healthcare',
        description: 'Comprehensive knowledge base for healthcare administration, including billing, coding, and compliance.',
        featured: true,
      },
      {
        id: 'patient-education',
        title: 'Patient Education Library',
        publisher: 'Health Literacy Partners',
        rating: 4.5,
        reviews: 178,
        price: {
          monthly: 249,
          annual: 2490,
          oneTime: 5990
        },
        coverage: 90,
        lastUpdated: '2 weeks ago',
        category: 'Healthcare',
        description: 'Extensive patient education materials covering common conditions, treatments, and preventive care.',
        featured: false,
      },
      {
        id: 'medical-protocols',
        title: 'Clinical Protocols & Guidelines',
        publisher: 'Evidence Medical Group',
        rating: 4.9,
        reviews: 342,
        price: {
          monthly: 349,
          annual: 3490,
          oneTime: 8990
        },
        coverage: 95,
        lastUpdated: '3 days ago',
        category: 'Healthcare',
        description: 'Up-to-date clinical protocols and guidelines based on the latest evidence and best practices.',
        featured: false,
      },
    ];
  } else if (scenario === 'legal') {
    scenarioListings = [
      {
        id: 'contract-law',
        title: 'Contract Law Essentials',
        publisher: 'LegalPro Publishers',
        rating: 4.6,
        reviews: 215,
        price: {
          monthly: 329,
          annual: 3290,
          oneTime: 7990
        },
        coverage: 92,
        lastUpdated: '5 days ago',
        category: 'Legal',
        description: 'Comprehensive contract law knowledge base including templates, clauses, and negotiation strategies.',
        featured: true,
      },
      {
        id: 'compliance-framework',
        title: 'Regulatory Compliance Framework',
        publisher: 'Compliance Standards Group',
        rating: 4.8,
        reviews: 198,
        price: {
          monthly: 279,
          annual: 2790,
          oneTime: 6990
        },
        coverage: 96,
        lastUpdated: '1 week ago',
        category: 'Legal',
        description: 'Complete regulatory compliance knowledge covering multiple industries and jurisdictions.',
        featured: false,
      },
      {
        id: 'litigation-support',
        title: 'Litigation Support System',
        publisher: 'Trial Technologies',
        rating: 4.4,
        reviews: 167,
        price: {
          monthly: 399,
          annual: 3990,
          oneTime: 9990
        },
        coverage: 88,
        lastUpdated: '2 weeks ago',
        category: 'Legal',
        description: 'Litigation knowledge base with case preparation strategies, document management, and court procedures.',
        featured: false,
      },
    ];
  } else if (scenario === 'financial') {
    scenarioListings = [
      {
        id: 'investment-advisory',
        title: 'Investment Advisory Framework',
        publisher: 'Wealth Strategy Partners',
        rating: 4.7,
        reviews: 231,
        price: {
          monthly: 349,
          annual: 3490,
          oneTime: 8490
        },
        coverage: 93,
        lastUpdated: '4 days ago',
        category: 'Finance',
        description: 'Comprehensive investment knowledge covering asset allocation, portfolio strategies, and market analysis.',
        featured: true,
      },
      {
        id: 'tax-planning',
        title: 'Tax Planning Strategies',
        publisher: 'Tax Intelligence Group',
        rating: 4.9,
        reviews: 276,
        price: {
          monthly: 299,
          annual: 2990,
          oneTime: 7490
        },
        coverage: 94,
        lastUpdated: '1 week ago',
        category: 'Finance',
        description: 'Extensive tax planning knowledge base with strategies, deductions, and compliance guidelines.',
        featured: false,
      },
      {
        id: 'retirement-planning',
        title: 'Retirement Planning System',
        publisher: 'Future Financial Solutions',
        rating: 4.6,
        reviews: 189,
        price: {
          monthly: 249,
          annual: 2490,
          oneTime: 5990
        },
        coverage: 91,
        lastUpdated: '10 days ago',
        category: 'Finance',
        description: 'Complete retirement planning knowledge with income strategies, estate planning, and long-term care considerations.',
        featured: false,
      },
    ];
  } else {
    // Default knowledge bases if no specific scenario
    scenarioListings = [
      {
        id: 'industry-kb-1',
        title: 'Industry Knowledge Base 1',
        publisher: 'Expert Publishers',
        rating: 4.5,
        reviews: 200,
        price: {
          monthly: 299,
          annual: 2990,
          oneTime: 6990
        },
        coverage: 90,
        lastUpdated: '1 week ago',
        category: 'Industry',
        description: 'Comprehensive industry knowledge covering key processes and best practices.',
        featured: true,
      },
      {
        id: 'industry-kb-2',
        title: 'Industry Knowledge Base 2',
        publisher: 'Specialist Group',
        rating: 4.3,
        reviews: 175,
        price: {
          monthly: 249,
          annual: 2490,
          oneTime: 5990
        },
        coverage: 85,
        lastUpdated: '2 weeks ago',
        category: 'Industry',
        description: 'Specialized knowledge for industry-specific applications and scenarios.',
        featured: false,
      },
    ];
  }
  
  return [...baseListings, ...scenarioListings];
};

/**
 * Generate deployment options based on user type
 * @param {string} userType - User type
 * @returns {Array} Array of deployment option objects
 */
export const generateDeploymentOptions = (userType) => {
  // Common deployment options for all user types
  const commonOptions = [
    {
      id: 'website',
      title: 'Website Integration',
      description: 'Add your AI assistant to your website as a chat widget',
      icon: 'globe',
      complexity: 'Low',
      setupTime: '15 minutes',
    },
    {
      id: 'email',
      title: 'Email Integration',
      description: 'Connect your AI assistant to your email system',
      icon: 'mail',
      complexity: 'Medium',
      setupTime: '30 minutes',
    }
  ];
  
  // User type-specific deployment options
  let specificOptions = [];
  
  if (userType === 'domainExpert') {
    specificOptions = [
      {
        id: 'voice',
        title: 'Voice Assistant',
        description: 'Enable voice interaction with your AI assistant',
        icon: 'microphone',
        complexity: 'Medium',
        setupTime: '1 hour',
      },
      {
        id: 'team',
        title: 'Team Access',
        description: 'Share your AI assistant with your team members',
        icon: 'users',
        complexity: 'Low',
        setupTime: '10 minutes',
      },
    ];
  } else if (userType === 'knowledgeBuilder') {
    specificOptions = [
      {
        id: 'api',
        title: 'API Access',
        description: 'Access your knowledge base via API for custom integrations',
        icon: 'code',
        complexity: 'High',
        setupTime: '1-2 hours',
      },
      {
        id: 'marketplace',
        title: 'Marketplace Publishing',
        description: 'Publish your knowledge base to the marketplace',
        icon: 'shopping-bag',
        complexity: 'Medium',
        setupTime: '45 minutes',
      },
      {
        id: 'custom',
        title: 'Custom Application',
        description: 'Build a custom application using your knowledge base',
        icon: 'layout',
        complexity: 'High',
        setupTime: '2-3 hours',
      },
    ];
  } else if (userType === 'aiEnhancer') {
    specificOptions = [
      {
        id: 'crm',
        title: 'CRM Integration',
        description: 'Connect your AI assistant to your CRM system',
        icon: 'database',
        complexity: 'Medium',
        setupTime: '1 hour',
      },
      {
        id: 'helpdesk',
        title: 'Help Desk Integration',
        description: 'Integrate with your help desk or support system',
        icon: 'help-circle',
        complexity: 'Medium',
        setupTime: '45 minutes',
      },
      {
        id: 'slack',
        title: 'Slack Integration',
        description: 'Add your AI assistant to your Slack workspace',
        icon: 'message-square',
        complexity: 'Low',
        setupTime: '20 minutes',
      },
    ];
  }
  
  return [...commonOptions, ...specificOptions];
};

/**
 * Generate AI responses for testing
 * @param {string} query - User query
 * @param {boolean} hasKnowledgeBase - Whether using a knowledge base
 * @param {string} userType - User type
 * @param {string} scenario - Selected scenario
 * @returns {Object} AI response object
 */
export const generateAIResponse = (query, hasKnowledgeBase, userType, scenario) => {
  // Generic AI response (without knowledge base)
  const genericResponse = {
    text: getGenericResponse(query, scenario),
    sources: [],
    confidence: Math.random() * 0.3 + 0.5, // 50-80% confidence
    hasHallucination: Math.random() > 0.3, // 70% chance of hallucination
    processingTime: `${(Math.random() * 0.8 + 0.3).toFixed(2)}s`,
  };
  
  // Enhanced AI response (with knowledge base)
  const enhancedResponse = {
    text: getEnhancedResponse(query, scenario, userType),
    sources: getSources(scenario),
    confidence: Math.random() * 0.15 + 0.85, // 85-100% confidence
    hasHallucination: Math.random() > 0.9, // 10% chance of hallucination
    processingTime: `${(Math.random() * 0.3 + 0.1).toFixed(2)}s`,
  };
  
  return hasKnowledgeBase ? enhancedResponse : genericResponse;
};

// Helper functions for generating responses
const getGenericResponse = (query, scenario) => {
  // Medical scenario generic responses
  if (scenario === 'medical') {
    if (query.toLowerCase().includes('treatment')) {
      return "There are several treatment approaches that might be appropriate depending on the specific condition. Generally, treatments can include medication, physical therapy, or surgical interventions. You should consult with a healthcare professional for personalized advice.";
    } else if (query.toLowerCase().includes('diagnosis')) {
      return "Diagnosis typically involves a physical examination, patient history, and possibly laboratory tests or imaging. The specific approach depends on the suspected condition. A healthcare professional would need to evaluate the specific symptoms.";
    } else if (query.toLowerCase().includes('medication')) {
      return "Various medications may be prescribed depending on the condition. These could include pain relievers, anti-inflammatory drugs, or specialized medications. Dosage and selection would depend on individual factors and should be determined by a healthcare provider.";
    }
  } 
  // Legal scenario generic responses
  else if (scenario === 'legal') {
    if (query.toLowerCase().includes('contract')) {
      return "Contracts typically need to have an offer, acceptance, consideration, and the intention to create legal relations. Specific requirements can vary by jurisdiction. It would be advisable to consult with a legal professional for your specific situation.";
    } else if (query.toLowerCase().includes('liability')) {
      return "Liability can be established through various legal principles such as negligence, strict liability, or contractual obligations. The specific application depends on the circumstances and jurisdiction. Legal advice should be sought for specific situations.";
    } else if (query.toLowerCase().includes('compliance')) {
      return "Compliance requirements vary widely depending on the industry, location, and specific regulations. Generally, organizations need to follow applicable laws, maintain records, and may need to report to regulatory bodies. A detailed analysis would require specific information.";
    }
  }
  // Financial scenario generic responses
  else if (scenario === 'financial') {
    if (query.toLowerCase().includes('investment')) {
      return "Investment strategies should be based on factors such as risk tolerance, time horizon, and financial goals. Common investments include stocks, bonds, mutual funds, and real estate. I recommend consulting with a financial advisor for personalized advice.";
    } else if (query.toLowerCase().includes('tax')) {
      return "Tax obligations depend on numerous factors including income type, jurisdiction, and applicable deductions. Tax laws change frequently and vary by location. A tax professional would need to review your specific situation to provide accurate guidance.";
    } else if (query.toLowerCase().includes('retirement')) {
      return "Retirement planning typically involves saving through vehicles like 401(k)s, IRAs, or pension plans. The appropriate strategy depends on factors like age, income, and retirement goals. A financial planner could provide personalized recommendations.";
    }
  }
  
  // Default generic response
  return "I can provide a general answer based on my training, but I don't have access to specialized knowledge about this specific topic. My information might not be complete or up-to-date. For accurate and detailed information, I recommend consulting with a specialist or relevant authoritative sources.";
};

const getEnhancedResponse = (query, scenario, userType) => {
  // More detailed responses for knowledge builders
  const detailLevel = userType === 'knowledgeBuilder' ? 'high' : 'medium';
  
  // Medical scenario enhanced responses
  if (scenario === 'medical') {
    if (query.toLowerCase().includes('treatment')) {
      if (detailLevel === 'high') {
        return "Based on our practice guidelines, first-line treatment for this condition typically begins with a stepped approach: (1) Lifestyle modifications including dietary changes and exercise regimen as outlined in the Johnson Protocol (2019); (2) If symptoms persist after 4-6 weeks, pharmacological intervention with either Class A or Class B medications based on patient profile and comorbidities; (3) For patients with moderate to severe presentations, combination therapy following the Smith-Rodriguez Algorithm is recommended. Our practice specifically follows the modified Williams Criteria for treatment escalation, with monitoring at 2, 6, and 12-week intervals.";
      } else {
        return "According to our practice guidelines, treatment should follow a stepped approach starting with lifestyle modifications for 4-6 weeks, followed by medication if needed. We use the Johnson Protocol for initial treatment and the Smith-Rodriguez Algorithm for more severe cases. Our practice has specific criteria for when to escalate treatment, with regular monitoring at weeks 2, 6, and 12.";
      }
    } else if (query.toLowerCase().includes('diagnosis')) {
      if (detailLevel === 'high') {
        return "Our diagnostic protocol follows the Anderson-Becker Classification System with the following critical pathways: (1) Initial assessment using the standardized 12-point screening tool developed by our practice; (2) Laboratory workup including the comprehensive panel specified in our Clinical Diagnostics Handbook, with particular attention to biomarkers C and D which our research has found to have 93% sensitivity for this condition; (3) Advanced imaging using modified Thompson Protocol when indicated by elevated biomarkers or clinical presentation scoring >7 on our assessment scale.";
      } else {
        return "Our practice uses the Anderson-Becker Classification System for diagnosis. This includes our standardized 12-point screening tool, followed by our specific laboratory panel that emphasizes biomarkers C and D (which our research shows have 93% sensitivity). We use modified Thompson Protocol for imaging when indicated by lab results or high scores on our assessment scale.";
      }
    } else if (query.toLowerCase().includes('medication')) {
      if (detailLevel === 'high') {
        return "Our practice's medication protocol is based on the Chen-Watkins Formulary (2021) with practice-specific modifications as documented in our Pharmacological Management Guide. First-line agents are selected based on our proprietary risk stratification algorithm, with specific dosing schedules that differ from standard guidelines by implementing a gradual titration protocol. Our practice data shows this modified approach reduces adverse effects by 34% while maintaining efficacy. Medication selection flowcharts are provided on pages 15-28 of our clinical handbook, with special considerations for patients with comorbidities detailed in Appendix C.";
      } else {
        return "Our practice follows a modified version of the Chen-Watkins Formulary for medication management. We use our own risk stratification system to select medications, with a gradual titration protocol that our data shows reduces side effects by 34%. Our clinical handbook includes detailed flowcharts for medication selection, including special guidelines for patients with other health conditions.";
      }
    }
  } 
  // Legal scenario enhanced responses
  else if (scenario === 'legal') {
    if (query.toLowerCase().includes('contract')) {
      if (detailLevel === 'high') {
        return "Our firm's contract development follows the Martinson-Keller Framework with jurisdiction-specific adaptations as documented in our Contract Development Handbook (2023 Edition). We implement a three-tiered review protocol with particular emphasis on the enforceability elements identified in Robertson v. Allied Systems (2019). Our template library includes 17 variations of standard agreements with clause-specific annotations reflecting recent precedential shifts in the Johnson Circuit. Note that for multi-jurisdictional applications, we apply the heightened scrutiny protocol detailed in section 3.8 of our practice manual.";
      } else {
        return "Our firm follows the Martinson-Keller Framework for contracts, with specific adjustments for our jurisdiction. We use a three-tier review process that focuses on enforceability elements from the Robertson v. Allied Systems case. We maintain templates with annotations about recent legal precedents, and have special protocols for contracts that cross multiple jurisdictions.";
      }
    } else if (query.toLowerCase().includes('liability')) {
      if (detailLevel === 'high') {
        return "Our liability assessment methodology incorporates the Davis-Thornton Risk Matrix as modified by our senior partners to reflect recent appellate decisions in this jurisdiction. We apply a six-factor analysis rather than the standard four-factor test, adding considerations for technological intermediaries and delegated authority scenarios based on the landmark Westfield ruling. Our case management system automatically flags high-risk liability scenarios according to parameters set in our Practice Risk Algorithm, with specialized workflows for novel fact patterns that don't align with established precedent.";
      } else {
        return "Our firm uses a modified Davis-Thornton Risk Matrix for liability assessment that's been updated to reflect recent court decisions. We've expanded the standard four-factor test to a six-factor analysis that includes considerations for technology and delegated authority issues, based on the Westfield ruling. Our system automatically identifies high-risk scenarios using our custom risk algorithm.";
      }
    } else if (query.toLowerCase().includes('compliance')) {
      if (detailLevel === 'high') {
        return "Our compliance framework is built on the Henderson-Sullivan Methodology with sector-specific overlays as detailed in our Regulatory Compliance Manual. We implement an 18-point checklist derived from the consolidated requirements of SB-172, AB-490, and the revised Title IV regulations (§422.105-128). Our documentation protocol exceeds statutory requirements by implementing the evidentiary preservation standards recommended in the Blackwell Opinion, with additional safeguards for digital communications as outlined in our Data Governance Policy (ref: sections 7.3-7.9). Quarterly compliance reviews follow the audit trail specified in Appendix D of our practice manual.";
      } else {
        return "Our firm follows the Henderson-Sullivan Methodology for compliance, customized for specific industries. We use an 18-point checklist based on SB-172, AB-490, and Title IV regulations. Our documentation standards exceed legal requirements by following the Blackwell Opinion standards, with special protocols for digital communications. We conduct quarterly compliance reviews using our established audit process.";
      }
    }
  }
  // Financial scenario enhanced responses
  else if (scenario === 'financial') {
    if (query.toLowerCase().includes('investment')) {
      if (detailLevel === 'high') {
        return "Our firm's investment philosophy is codified in the Robertson-Chen Capital Allocation Framework, which modifies traditional Modern Portfolio Theory with behavioral finance overlays. Client portfolios are constructed using our proprietary sector rotation model that has demonstrated alpha of 2.3% annually over the benchmark when back-tested across three market cycles. Our asset allocation parameters follow the adaptive thresholds documented in our Investment Policy Statement template, with risk management protocols that implement dynamic volatility-based rebalancing rather than calendar-based approaches. For qualified investors, alternative allocations follow the guidelines in section 4.7 of our Investment Committee Handbook.";
      } else {
        return "Our firm uses the Robertson-Chen Capital Allocation Framework, which combines Modern Portfolio Theory with behavioral finance. We use a proprietary sector rotation model that has shown a 2.3% annual advantage over benchmarks in back-testing. Our asset allocation follows adaptive thresholds with dynamic rebalancing based on market volatility rather than calendar dates. We have specific guidelines for alternative investments for qualified investors.";
      }
    } else if (query.toLowerCase().includes('tax')) {
      if (detailLevel === 'high') {
        return "Our tax planning methodology follows the Williamson-Patel Tax Efficiency Framework with practice-specific modifications to address the 2022 regulatory changes. We implement a three-tiered tax mitigation approach as detailed in our client planning manual: (1) Strategic income timing using our proprietary tax bracket management algorithm; (2) Asset location optimization following the modified Peterson Model; and (3) Tax-loss harvesting protocols that exceed industry standards by implementing continuous monitoring rather than quarterly reviews. Our documentation standards follow the enhanced substantiation guidelines recommended in the Anderson Tax Court ruling, with particular emphasis on contemporaneous recording of planning intent.";
      } else {
        return "Our practice follows the Williamson-Patel Tax Efficiency Framework, updated for the 2022 tax changes. We use a three-tier approach that includes strategic income timing, optimized asset location, and continuous tax-loss harvesting (rather than periodic reviews). Our documentation follows the standards from the Anderson Tax Court ruling, with special attention to recording the planning purpose at the time decisions are made.";
      }
    } else if (query.toLowerCase().includes('retirement')) {
      if (detailLevel === 'high') {
        return "Our retirement planning framework implements the Thompson-Garcia Longevity Model with Monte Carlo simulations customized to reflect our firm's capital market assumptions. Client retirement needs are assessed using our comprehensive 32-point questionnaire which goes beyond financial factors to incorporate lifestyle and purpose elements based on positive psychology research. Our withdrawal strategy implementation follows the Dynamic Spending Adjustment Protocol detailed in our practice manual, which modifies the traditional 4% rule based on market valuations and funded ratio calculations. For clients with complex situations, we apply the multi-phase retirement framework documented in Chapter 8 of our planning handbook.";
      } else {
        return "Our practice uses the Thompson-Garcia Longevity Model with customized Monte Carlo simulations for retirement planning. We assess needs using a 32-point questionnaire that includes both financial factors and lifestyle considerations. Our withdrawal approach follows a Dynamic Spending Adjustment Protocol instead of the traditional 4% rule, adjusting based on market conditions and your funded ratio. We have specialized frameworks for complex retirement situations.";
      }
    }
  }
  
  // Default enhanced response
  return "Based on our specialized knowledge base, I can provide you with detailed and accurate information specific to our practice's approach. Our documentation includes specific protocols, guidelines, and methods that we've developed and refined over time. This allows me to give you precise information rather than general advice, incorporating our unique expertise and established procedures.";
};

const getSources = (scenario) => {
  if (scenario === 'medical') {
    return [
      { title: "Clinical Practice Guidelines (2023)", pages: "15-18", relevance: 0.92 },
      { title: "Treatment Protocol Handbook", pages: "42-47", relevance: 0.87 },
      { title: "Johnson et al. Outcome Study (2021)", pages: "103-105", relevance: 0.78 },
    ];
  } else if (scenario === 'legal') {
    return [
      { title: "Firm Practice Manual (2023)", pages: "24-29", relevance: 0.94 },
      { title: "Case Analysis: Robertson v. Allied Systems", pages: "Full document", relevance: 0.85 },
      { title: "Jurisdictional Requirements Guide", pages: "12-15", relevance: 0.81 },
    ];
  } else if (scenario === 'financial') {
    return [
      { title: "Investment Policy Guidelines (2023)", pages: "8-12", relevance: 0.91 },
      { title: "Portfolio Construction Framework", pages: "31-36", relevance: 0.88 },
      { title: "Market Analysis Quarterly Report", pages: "5-7", relevance: 0.76 },
    ];
  }
  
  return [
    { title: "Practice Guidelines (2023)", pages: "10-15", relevance: 0.9 },
    { title: "Internal Handbook", pages: "22-27", relevance: 0.85 },
    { title: "Research Summary", pages: "8-12", relevance: 0.75 },
  ];
};
