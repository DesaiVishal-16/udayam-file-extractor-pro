
import React from 'react';
import { ExtractionResult, TableData } from '../types';

interface ResultsPreviewProps {
  result: ExtractionResult;
  onDownload: () => void;
  onReset: () => void;
}

export const ResultsPreview: React.FC<ResultsPreviewProps> = ({ result, onDownload, onReset }) => {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Extraction Complete</h2>
          <p className="text-slate-500">{result.tables.length} tables found in your document.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={onReset}
            className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors"
          >
            Clear
          </button>
          <button 
            onClick={onDownload}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Excel (.xlsx)
          </button>
        </div>
      </div>

      <div className="space-y-12">
        {result.tables.map((table, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">{table.tableName || `Table ${idx + 1}`}</h3>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded font-bold uppercase">
                {table.rows.length} Rows
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    {table.headers.map((h, i) => (
                      <th key={i} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 min-w-[150px]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {table.rows.map((row, rowIdx) => (
                    <tr key={rowIdx} className="hover:bg-indigo-50/30 transition-colors">
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
      
      {result.summary && (
        <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
          <h4 className="font-bold text-indigo-900 mb-2">AI Summary</h4>
          <p className="text-indigo-800 text-sm leading-relaxed">{result.summary}</p>
        </div>
      )}
    </div>
  );
};
