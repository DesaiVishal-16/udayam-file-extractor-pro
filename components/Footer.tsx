
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
            <img src="/logo.png" alt="Udayam AI Labs" className="w-8 h-8 object-contain" />
            <span className="text-white font-bold text-xl">Udayam AI Labs</span>
          </div>
          <p className="text-sm font-medium">Created by <span className="text-indigo-400">Udayam AI Labs</span></p>
          <p className="text-xs mt-1 opacity-70">Founding Lead: Mr. Udayraj Patare</p>
        </div>

        <div className="flex flex-col items-center">
          <a 
            href="https://udayam.co.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-full border border-white/10 transition-all group"
          >
            Visit Website <span className="font-bold text-indigo-400 group-hover:underline">udayam.co.in</span>
          </a>
          <p className="text-[10px] mt-4 uppercase tracking-[0.2em] opacity-40 font-bold">Empowering Document Intelligence</p>
        </div>

        <div className="text-sm text-center md:text-right">
          <p className="mb-2">Made with ❤️ by <a href="https://udayam.co.in" target="_blank" className="text-white hover:text-indigo-400 font-bold">Udayam AI Labs</a></p>
          <p className="opacity-50 italic">Professional Grade AI Tool</p>
          <p className="mt-2">© {new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};
