import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { fileService } from '../../services/api';
import { processFile } from '../../utils/fileProcessing';

const AdvancedProcessing = () => {
  const [processingStatus, setProcessingStatus] = useState(null);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const onDrop = async (acceptedFiles) => {
    setError(null);
    setProcessingStatus('processing');

    try {
      const processedFiles = await Promise.all(
        acceptedFiles.map(async (file) => {
          const processedFile = await processFile(file);
          const response = await fileService.uploadFile(file);
          return {
            file,
            processed: processedFile,
            upload: response,
          };
        })
      );

      setResults(processedFiles);
      setProcessingStatus('success');
    } catch (err) {
      setError(err.message);
      setProcessingStatus('error');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
    },
    multiple: true,
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Advanced Document Processing
        </h2>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}`}
        >
          <input {...getInputProps()} />
          <div className="text-gray-600">
            {isDragActive ? (
              <p>Drop the files here...</p>
            ) : (
              <p>Drag and drop files here, or click to select files</p>
            )}
          </div>
        </div>

        {processingStatus === 'processing' && (
          <div className="mt-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Processing files...</p>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Processed Files
            </h3>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {result.file.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Size: {(result.file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <span className="text-green-500">✓</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Type: {result.processed.metadata.type}</p>
                    {result.processed.metadata.author && (
                      <p>Author: {result.processed.metadata.author}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedProcessing; 