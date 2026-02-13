
import React from 'react';
import { SECTORS } from '../constants';

const Sectors: React.FC = () => {
  return (
    <div className="py-8">
      <div className="flex items-center gap-4 mb-12">
        <button 
          onClick={() => window.location.hash = '#/dashboard'}
          className="bg-white border border-slate-200 p-2 rounded-xl text-slate-500 hover:text-slate-900 transition-all shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Choose Your Track</h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            Select an industry sector to see specialized engineering tracks.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SECTORS.map((sector) => (
          <a 
            key={sector.id} 
            href={`#/sector/${sector.id}`}
            className="group flex flex-col bg-white rounded-3xl border border-slate-200 p-8 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 ${sector.color}`}>
              {sector.icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">{sector.title}</h3>
            <p className="text-slate-600 mb-8 flex-1">{sector.description}</p>
            <div className="flex items-center text-blue-600 font-bold group-hover:gap-2 transition-all">
              Explore Projects
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Sectors;
