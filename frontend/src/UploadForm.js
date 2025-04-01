import React, { useState, useRef } from 'react';
import axios from 'axios';
import './UploadForm.css';

const UploadForm = ({ onConversionSuccess }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleChange = (file) => {
    if (file) {
      setFile(file);
      setFileName(file.name);
      setError("");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        handleChange(droppedFile);
      } else {
        setError("Only PDF files are allowed");
      }
    }
  };

  const validateFile = (file) => {
    if (!file) {
      setError("Please select a file");
      return false;
    }
    
    if (!file.name.endsWith('.pdf')) {
      setError("Only PDF files are allowed");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateFile(file)) return;
    
    setIsConverting(true);
    setError("");
    setUploadProgress(0);
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/convert/", formData, {
        responseType: 'blob',
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      
      const outputFileName = fileName.replace('.pdf', '.docx');
      const url = window.URL.createObjectURL(new Blob([response.data]));
      
      setIsConverting(false);
      onConversionSuccess({ url, name: outputFileName });
      
    } catch (error) {
      setIsConverting(false);
      if (error.response) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const errorData = JSON.parse(reader.result);
            setError(`Conversion failed: ${errorData.detail || 'Unknown error'}`);
          } catch (e) {
            setError("An error occurred during conversion");
          }
        };
        reader.readAsText(error.response.data);
      } else {
        setError("Network error or server is not responding");
      }
    }
  };

  return (
    <div 
      className="upload-container"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
      
      <div className="upload-text">
        <h3>Upload your PDF file</h3>
        <p>Drag & drop your file here or</p>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleChange(e.target.files[0])}
          style={{ display: 'none' }}
          accept=".pdf"
        />
        
        <button 
          className="browse-button"
          onClick={() => fileInputRef.current.click()}
        >
          Browse Files
        </button>
        
        <p className="file-types">Supported file type: PDF</p>
      </div>
      
      {fileName && (
        <div className="file-info">
          <svg xmlns="http://www.w3.org/2000/svg" className="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <path d="M9 15L15 15"></path>
            <path d="M9 11L11 11"></path>
          </svg>
          <span className="file-name">{fileName}</span>
          <button 
            className="remove-file" 
            onClick={() => {
              setFile(null);
              setFileName("");
            }}
          >
            &times;
          </button>
        </div>
      )}
      
      {error && <div className="error-message">{error}</div>}
      
      <button 
        className="convert-button" 
        onClick={handleSubmit}
        disabled={!file || isConverting}
      >
        {isConverting ? 'Converting...' : 'Convert to Word'}
      </button>
      
      {isConverting && (
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <span className="progress-text">{uploadProgress}%</span>
        </div>
      )}
    </div>
  );
};

export default UploadForm;