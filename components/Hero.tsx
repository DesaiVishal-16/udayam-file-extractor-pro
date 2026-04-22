
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="pt-16 pb-8 text-center px-4">
      <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
        Extract Tables from <span className="text-indigo-600">PDF & Images</span> to Excel Instantly
      </h2>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
        Stop manual data entry. Our specialized AI from <strong>Udayam AI Labs</strong> identifies multi-page table boundaries and preserves row/column formatting perfectly.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium border border-emerald-100">
          <span className="text-lg">✅</span> 99.8% Table Detection Accuracy
        </div>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-100">
          <span className="text-lg">⚡</span> Optimized Multi-page Logic
        </div>
        <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-medium border border-amber-100">
          <span className="text-lg">📊</span> 50,000+ Tables Extracted
        </div>
      </div>
    </section>
  );
};
