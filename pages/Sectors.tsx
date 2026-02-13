
import React, { useEffect, useState } from 'react';
import { SECTORS } from '../constants';
import { authService } from '../services/firebase';

const Sectors: React.FC = () => {
  const [sectors, setSectors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getSectors().then(data => {
      const merged = data.map(fsSector => {
        const staticData = SECTORS.find(s => s.id === fsSector.id);
        return {
          ...fsSector,
          icon: staticData?.icon || SECTORS[0].icon,
          color: staticData?.color || SECTORS[0].color,
          title: fsSector.name
        };
      });
      setSectors(merged);
      setLoading(false);
    });
  }, []);

  const handleSelectSector = (id: string, type: any) => {
    authService.setSector(type);
    window.location.hash = `#/sector/${id}`;
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32">
      <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading tracks</div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">Select Your Industry</h1>
          <p className="text-xl text-slate-500 max-w-2xl font-medium leading-relaxed">
            Professional engineering curricula built around the specific challenges of top-tier software companies.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {sectors.map((sector) => (
          <button 
            key={sector.id} 
            onClick={() => handleSelectSector(sector.id, sector.type)}
            className="group relative flex flex-col text-left bg-white rounded-[3rem] border border-slate-200 p-12 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-3 transition-all duration-500 overflow-hidden"
          >
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-10 transition-opacity group-hover:opacity-30 ${sector.color.split(' ')[0]}`}></div>
            
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-xl ${sector.color} shadow-current/10`}>
              {sector.icon}
            </div>
            
            <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">{sector.title}</h3>
            <p className="text-slate-500 mb-12 flex-1 leading-relaxed text-lg font-medium">{sector.description}</p>
            
            <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform">
              Explore Track
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
