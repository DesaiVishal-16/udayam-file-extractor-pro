
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { UploadZone } from './components/UploadZone';
import { ProcessingStatus } from './components/ProcessingStatus';
import { ResultsPreview } from './components/ResultsPreview';
import { Footer } from './components/Footer';
import { AppStatus, ExtractionResult } from './types';
import { extractTablesFromDocument } from './services/geminiService';
import { generateExcel } from './utils/excel';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleFileUpload = useCallback(async (file: File) => {
    try {
      setStatus(AppStatus.PROCESSING);
      setProgress(10);
      setError(null);

      // Simulate some progress steps
      const interval = setInterval(() => {
        setProgress(prev => (prev < 90 ? prev + Math.random() * 5 : prev));
      }, 500);

      const extractionData = await extractTablesFromDocument(file);
      
      clearInterval(interval);
      setProgress(100);
      setResult(extractionData);
      setStatus(AppStatus.COMPLETED);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during extraction. Please try again.');
      setStatus(AppStatus.ERROR);
    }
  }, []);

  const resetApp = () => {
    setStatus(AppStatus.IDLE);
    setResult(null);
    setError(null);
    setProgress(0);
  };

  const handleDownloadExcel = async () => {
    if (result) {
      await generateExcel(result.tables);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {status === AppStatus.IDLE && (
          <>
            <Hero />
            <div className="max-w-4xl mx-auto px-4 pb-20">
              <UploadZone onUpload={handleFileUpload} />
              <Features />
            </div>
          </>
        )}

        {(status === AppStatus.PROCESSING || status === AppStatus.UPLOADING) && (
          <div className="max-w-3xl mx-auto px-4 py-20">
            <ProcessingStatus progress={progress} />
          </div>
        )}

        {status === AppStatus.COMPLETED && result && (
          <div className="max-w-6xl mx-auto px-4 py-10">
            <ResultsPreview 
              result={result} 
              onDownload={handleDownloadExcel} 
              onReset={resetApp} 
            />
          </div>
        )}

        {status === AppStatus.ERROR && (
          <div className="max-w-xl mx-auto px-4 py-20 text-center">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Extraction Failed</h2>
              <p className="text-slate-600 mb-6">{error}</p>
              <button 
                onClick={resetApp}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
