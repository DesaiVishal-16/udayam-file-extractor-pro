
import React from 'react';

export const Features: React.FC = () => {
  const features = [
    {
      title: 'Preserves Formatting',
      description: 'Maintains row and column structure from original documents with complex layouts.',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      ),
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Excel Export',
      description: 'Get clean .xlsx files ready for immediate use in Excel or Google Sheets.',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      title: 'Smart Detection',
      description: 'Automatically identifies table boundaries in PDFs and images using neural vision.',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      color: 'bg-amber-100 text-amber-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
      {features.map((f, i) => (
        <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center mb-6`}>
            {f.icon}
          </div>
          <h4 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h4>
          <p className="text-slate-600 text-sm leading-relaxed">{f.description}</p>
        </div>
      ))}
    </div>
  );
};
