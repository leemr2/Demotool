import React, { useCallback, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { fileService } from '../../services/api';
import { processFile } from '../../utils/fileProcessing';
import { useDemoContext } from '../../context/DemoContext';

// New InfoTooltip component for explanatory pop-outs
const InfoTooltip = ({ content }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className="relative inline-block">
      <button
        className="text-blue-500 hover:text-blue-700 focus:outline-none"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </button>
      {isVisible && (
        <div className="absolute z-10 w-64 p-3 text-sm bg-white border border-gray-200 rounded-lg shadow-lg -mt-1 left-6 text-gray-700">
          {content}
        </div>
      )}
    </div>
  );
};

// New AttributionForm component
const AttributionForm = ({ file, onSubmit, onCancel }) => {
  const [attribution, setAttribution] = useState({
    title: file.name.split('.').slice(0, -1).join('.'),
    author: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    setAttribution({
      ...attribution,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...file, attribution });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          Document Details 
          <InfoTooltip content="Adding details helps organize your content and improves AI's understanding of the document context." />
        </h3>
        <div className="text-sm text-gray-500">{file.type} • {(file.size / 1024 / 1024).toFixed(2)} MB</div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Document Title</label>
            <input
              type="text"
              name="title"
              value={attribution.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Author/Source</label>
            <input
              type="text"
              name="author"
              value={attribution.author}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={attribution.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={attribution.category}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a category</option>
                <option value="reference">Reference Material</option>
                <option value="guideline">Guidelines/Protocols</option>
                <option value="research">Research</option>
                <option value="policy">Policy Document</option>
                <option value="casestudy">Case Study</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={attribution.date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save and Process
          </button>
        </div>
      </form>
    </div>
  );
};

// New ProcessingVisualizer component
const ProcessingVisualizer = ({ file, currentStep, progress }) => {
  const steps = [
    { id: 'analyzing', label: 'Analyzing document structure', description: 'Identifying sections, headings, and content organization' },
    { id: 'extracting', label: 'Extracting knowledge', description: 'Converting document information into valuable insights' },
    { id: 'organizing', label: 'Organizing knowledge', description: 'Categorizing content and identifying key concepts' },
    { id: 'indexing', label: 'Creating connections', description: 'Linking concepts and making content retrievable by AI' },
    { id: 'complete', label: 'Knowledge extraction complete', description: 'Document ready for use in knowledge base' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">{file.attribution?.title || file.name}</h3>
        <div className="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
          {Math.round(progress)}% Complete
        </div>
      </div>
      
      {/* Sleek progress bar */}
      <div className="w-full h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%`, 
                   boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
                   transform: progress > 0 ? 'translateZ(0)' : 'none' }}
        />
      </div>
      
      <div className="space-y-5">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isComplete = progress >= ((index + 1) / steps.length) * 100;
          
          return (
            <div key={step.id} className="relative">
              <div className="flex items-start">
                <div className={`flex-shrink-0 h-5 w-5 rounded-full mt-1 flex items-center justify-center
                  ${isComplete ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-200'}`}>
                  {isComplete && !isActive && (
                    <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {isActive && (
                    <span className="flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                  )}
                </div>
                <div className="ml-4">
                  <h4 className={`text-sm font-medium ${
                    isActive ? 'text-blue-600' : isComplete ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </h4>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`ml-2.5 mt-1 mb-1 w-0.5 h-6 transition-colors duration-500 ${
                  isComplete ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FileUploader = () => {
  const { setCurrentStep } = useDemoContext();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [processingFile, setProcessingFile] = useState(null);
  const [processingStep, setProcessingStep] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [allFilesProcessed, setAllFilesProcessed] = useState(false);

  // Document types we support
  const acceptedFileTypes = {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/vnd.ms-powerpoint': ['.ppt'],
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
    'text/plain': ['.txt'],
    'text/markdown': ['.md'],
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    setError(null);
    
    // Recognize and organize documents
    const newFiles = acceptedFiles.map(file => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      type: getDocumentType(file),
      status: 'pending'
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Select the first file for attribution if we don't have a selected file
    if (!selectedFile && newFiles.length > 0) {
      setSelectedFile(newFiles[0]);
    }
  }, [selectedFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
  });

  const getDocumentType = (file) => {
    if (file.type.includes('pdf')) return 'PDF Document';
    if (file.type.includes('word')) return 'Word Document';
    if (file.type.includes('presentation')) return 'Presentation';
    if (file.type.includes('text/plain')) return 'Text Document';
    if (file.type.includes('markdown')) return 'Markdown Document';
    return 'Document';
  };

  const handleAttributionSubmit = async (attributedFile) => {
    setSelectedFile(null);
    setProcessingFile(attributedFile);
    
    try {
      // Update status of the file
      setUploadedFiles(prev => 
        prev.map(f => f.id === attributedFile.id ? { ...attributedFile, status: 'processing' } : f)
      );
      
      // Simulate processing with visual steps
      await simulateProcessing(attributedFile);
      
      // Update file status to complete
      setUploadedFiles(prev => {
        const updatedFiles = prev.map(f => 
          f.id === attributedFile.id ? { ...f, status: 'complete' } : f
        );
        
        // Check if all files are processed
        const allComplete = updatedFiles.every(f => f.status === 'complete');
        if (allComplete) {
          setAllFilesProcessed(true);
          // Show success message
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 5000);
        }
        
        return updatedFiles;
      });
      
      setProcessingFile(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      // Check if there are pending files to process
      const nextPendingFile = uploadedFiles.find(f => f.status === 'pending');
      if (nextPendingFile) {
        setSelectedFile(nextPendingFile);
      }
    } catch (err) {
      setError(err.message);
      
      // Update file status to error
      setUploadedFiles(prev => 
        prev.map(f => f.id === attributedFile.id ? { ...f, status: 'error' } : f
        )
      );
      
      setProcessingFile(null);
    }
  };

  const simulateProcessing = async (file) => {
    const processingSteps = ['analyzing', 'extracting', 'organizing', 'indexing', 'complete'];
    
    for (let i = 0; i < processingSteps.length; i++) {
      setProcessingStep(processingSteps[i]);
      
      // Each step takes between 1-3 seconds randomly
      const stepDuration = 1000 + Math.random() * 2000;
      const startProgress = (i / processingSteps.length) * 100;
      const endProgress = ((i + 1) / processingSteps.length) * 100;
      
      await animateProgress(startProgress, endProgress, stepDuration);
      
      // Simulate API upload during extraction step
      if (processingSteps[i] === 'extracting') {
        const processedFile = await processFile(file.file);
        await fileService.uploadFile(file.file);
        console.log('File processed:', processedFile);
      }
    }
    
    return true;
  };

  const animateProgress = (start, end, duration) => {
    return new Promise(resolve => {
      const startTime = Date.now();
      
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = start + (Math.min(elapsed / duration, 1) * (end - start));
        
        setProgress(progress);
        
        if (elapsed < duration) {
          requestAnimationFrame(updateProgress);
        } else {
          setProgress(end);
          resolve();
        }
      };
      
      updateProgress();
    });
  };

  const handleAttributionCancel = () => {
    setSelectedFile(null);
  };

  const handleRemoveFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    
    if (selectedFile && selectedFile.id === fileId) {
      setSelectedFile(null);
    }
    
    if (processingFile && processingFile.id === fileId) {
      setProcessingFile(null);
    }
  };

  const handleProcessAll = async () => {
    const pendingFiles = uploadedFiles.filter(f => f.status === 'pending');
    
    if (pendingFiles.length === 0) return;
    
    // Automatically create attribution for pending files
    for (const file of pendingFiles) {
      const attributedFile = {
        ...file,
        attribution: {
          title: file.name.split('.').slice(0, -1).join('.'),
          author: '',
          description: `Auto-processed ${file.type}`,
          category: '',
          date: new Date().toISOString().split('T')[0],
        }
      };
      
      await handleAttributionSubmit(attributedFile);
    }
    
    // Set all files as processed
    setAllFilesProcessed(true);
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  // Function to navigate to the knowledge map visualizer
  const navigateToKnowledgeMap = () => {
    setCurrentStep(3);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Your Documents</h2>
        
        <div className="mb-6">
          <p className="text-gray-600">
            Upload your documents to create a knowledge base. We'll extract the knowledge and organize it for you.
          </p>
        </div>
        
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}`}
        >
          <input {...getInputProps()} />
          <div className="text-gray-600">
            {isDragActive ? (
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mt-2 text-lg font-medium">Drop your files here...</p>
              </div>
            ) : (
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mt-2 text-lg font-medium">Drag and drop files here, or click to browse</p>
                <p className="mt-1 text-sm text-gray-500">Support for PDF, Word, PowerPoint documents</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            PDF
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Word (.doc, .docx)
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            PowerPoint (.ppt, .pptx)
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Text (.txt, .md)
          </span>
        </div>
        
        {/* Success message */}
        {showSuccess && !processingFile && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
            Knowledge extraction complete! Document is now part of your knowledge base.
          </div>
        )}
        
        {/* Error message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
            {error}
          </div>
        )}
      </div>
      
      {/* File attribution modal */}
      {selectedFile && (
        <AttributionForm 
          file={selectedFile} 
          onSubmit={handleAttributionSubmit} 
          onCancel={handleAttributionCancel} 
        />
      )}
      
      {/* Processing visualization */}
      {processingFile && (
        <ProcessingVisualizer 
          file={processingFile}
          currentStep={processingStep}
          progress={progress}
        />
      )}
      
      {/* Uploaded files list */}
      {uploadedFiles.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Your Documents</h3>
            
            <div className="flex space-x-3">
              {uploadedFiles.some(f => f.status === 'pending') && (
                <button
                  onClick={handleProcessAll}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  Extract Knowledge
                </button>
              )}
              
              {allFilesProcessed && (
                <button
                  onClick={navigateToKnowledgeMap}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 flex items-center"
                >
                  <span>View Knowledge Map</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {uploadedFiles.map(file => (
              <div key={file.id} className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {file.status === 'complete' ? (
                      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : file.status === 'error' ? (
                      <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    ) : file.status === 'processing' ? (
                      <svg className="h-5 w-5 text-blue-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                  </div>
                  
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {file.attribution?.title || file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {file.type} • {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  {file.status === 'pending' && (
                    <button
                      onClick={() => setSelectedFile(file)}
                      className="text-sm text-blue-600 hover:text-blue-800 mr-3"
                    >
                      Add Details
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleRemoveFile(file.id)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Add a floating action button for navigating to knowledge map when files are processed */}
      {allFilesProcessed && (
        <div className="fixed bottom-8 right-8">
          <button
            onClick={navigateToKnowledgeMap}
            className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center"
            title="View Knowledge Map"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </button>
        </div>
      )}
      
      {/* Success notification */}
      {showSuccess && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center shadow-md">
          <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Documents processed successfully! You can now view your knowledge map.</span>
        </div>
      )}
    </div>
  );
};

export default FileUploader; 