
import React from 'react';

interface ProcessingStatusProps {
  progress: number;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ progress }) => {
  return (
    <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-xl text-center">
      <div className="relative w-24 h-24 mx-auto mb-8">
        <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
        <div 
          className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center text-indigo-600 font-bold">
          {Math.round(progress)}%
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Processing your document...</h3>
      <p className="text-slate-500 mb-8 max-w-sm mx-auto">
        Udayam AI is currently analyzing tables, detecting boundaries, and preserving your formatting.
      </p>
      
      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-6">
        <div 
          className="bg-indigo-600 h-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="flex flex-col gap-3 text-sm text-slate-400 font-medium">
        <div className="flex items-center justify-center gap-2">
          <span className={progress >= 20 ? 'text-indigo-600' : ''}>Analyzing Document Structure</span>
          {progress >= 20 && <span>✅</span>}
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className={progress >= 50 ? 'text-indigo-600' : ''}>OCR & Table Detection</span>
          {progress >= 50 && <span>✅</span>}
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className={progress >= 80 ? 'text-indigo-600' : ''}>Formatting Preservation</span>
          {progress >= 80 && <span>✅</span>}
        </div>
      </div>
    </div>
  );
};
