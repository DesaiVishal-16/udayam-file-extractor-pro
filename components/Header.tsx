
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Udayam AI Labs" className="w-10 h-10 object-contain" />
          <span className="text-lg font-bold text-slate-700">Udayam AI Labs</span>
        </div>

        <h1 className="text-xl font-bold tracking-tight text-indigo-600 absolute left-1/2 transform -translate-x-1/2">Table Extractor Pro</h1>

        <nav className="hidden md:flex items-center gap-8">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">Powered By</p>
            <a href="https://udayam.co.in" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors">
              Udayam AI Labs
            </a>
          </div>
          <a href="https://udayam.co.in" target="_blank" rel="noopener noreferrer" className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
            Visit Website
          </a>
        </nav>
      </div>
    </header>
  );
};
