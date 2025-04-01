import React, { useState } from 'react';
import UploadForm from './UploadForm';
import './App.css';

function App() {
  const [convertedFile, setConvertedFile] = useState(null);

  const handleConversionSuccess = (fileData) => {
    setConvertedFile(fileData);
  };

  const downloadFile = () => {
    if (convertedFile) {
      const link = document.createElement('a');
      link.href = convertedFile.url;
      link.setAttribute('download', convertedFile.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleRetry = () => {
    setConvertedFile(null);
  };

  return (
    <div className="app-container">
      <div className="converter-container">
        <div className="header">
          <h1>PDF to Word Converter</h1>
          <p>Convert your PDF documents to editable Word files in seconds</p>
        </div>
        
        {!convertedFile ? (
          <UploadForm onConversionSuccess={handleConversionSuccess} />
        ) : (
          <div className="success-container">
            <svg xmlns="http://www.w3.org/2000/svg" className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            
            <h2>Conversion Complete!</h2>
            <p>Your PDF has been successfully converted to Word format</p>
            
            <div className="file-info">
              <svg xmlns="http://www.w3.org/2000/svg" className="file-icon word-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span className="file-name">{convertedFile.name}</span>
            </div>
            
            <div className="action-buttons">
              <button 
                className="download-button"
                onClick={downloadFile}
              >
                Download Word Document
              </button>
              
              <button 
                className="retry-button"
                onClick={handleRetry}
              >
                Convert Another File
              </button>
            </div>
          </div>
        )}
      </div>
      
      <footer className="footer">
        <p>© 2025 PDF to Word Converter. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;