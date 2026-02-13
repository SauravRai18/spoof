
import React from 'react';
import { SECTORS } from '../constants';
import { authService } from '../services/firebase';

const Sectors: React.FC = () => {
  const handleSelectSector = (id: string, type: any) => {
    authService.setSector(type);
    window.location.hash = `#/sector/${id}`;
  };

  return (
    <div className="py-8">
      <div className="flex items-center gap-4 mb-16">
        <button 
          onClick={() => window.location.hash = '#/dashboard'}
          className="bg-white border border-slate-200 p-2 rounded-xl text-slate-500 hover:text-slate-900 transition-all shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Choose Your Track</h1>
          <p className="text-xl text-slate-600 max-w-2xl font-medium">
            Specialized engineering tracks tailored to industry standards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SECTORS.map((sector) => (
          <button 
            key={sector.id} 
            onClick={() => handleSelectSector(sector.id, sector.type)}
            className="group flex flex-col text-left bg-white rounded-[2.5rem] border border-slate-200 p-10 hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-2 transition-all duration-300"
          >
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-300 ${sector.color}`}>
              {sector.icon}
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">{sector.title}</h3>
            <p className="text-slate-600 mb-10 flex-1 leading-relaxed text-lg">{sector.description}</p>
            <div className="flex items-center text-blue-600 font-black text-sm uppercase tracking-widest group-hover:gap-2 transition-all">
              Explore Tracks
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sectors;
