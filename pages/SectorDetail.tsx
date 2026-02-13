import React, { useEffect, useState } from 'react';
import { SECTORS } from '../constants';
import { authService } from '../services/firebase';

interface SectorDetailProps {
  sectorId: string;
}

const SectorDetail: React.FC<SectorDetailProps> = ({ sectorId }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = authService.getCurrentUser();
  const sector = SECTORS.find(s => s.id === sectorId);

  useEffect(() => {
    authService.getProjectsBySector(sectorId).then(data => {
      const order: Record<string, number> = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
      const sorted = data.sort((a, b) => {
        const valA = order[a.level] || 99;
        const valB = order[b.level] || 99;
        return valA - valB;
      });
      setProjects(sorted);
      setLoading(false);
    });
  }, [sectorId]);

  if (!sector) return <div className="py-20 text-center font-black text-slate-400">Track not found.</div>;
  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32">
      <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <div className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Architecting projects</div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-6 mb-16">
        <a href="#/sectors" className="bg-white border border-slate-200 p-3 rounded-2xl text-slate-400 hover:text-slate-900 hover:border-slate-400 transition-all shadow-sm active:scale-95">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </a>
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">{sector.title} Mastery</h1>
          <p className="text-slate-500 font-bold text-lg">Ascend the engineering ladder by solving real production specs.</p>
        </div>
      </div>

      <div className="relative space-y-20 pb-32">
        {/* Central Vertical Line */}
        <div className="absolute left-10 md:left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 z-0 hidden sm:block"></div>

        {projects.length === 0 ? (
           <div className="relative z-10 text-center bg-white p-16 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-100/50">
             <div className="text-5xl mb-6">🏗️</div>
             <p className="text-slate-900 font-black text-2xl mb-2">Projects Under Construction</p>
             <p className="text-slate-400 font-medium text-lg">Check back soon for the {sector.title.toLowerCase()} curriculum.</p>
           </div>
        ) : projects.map((project, index) => {
          const isEven = index % 2 === 0;
          const isCompleted = user?.completedProjects?.includes(project.id);
          
          return (
            <div key={project.id} className="relative z-10 flex flex-col md:flex-row items-center">
              {/* Timeline Indicator */}
              <div className={`absolute left-10 md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-[1.25rem] border-4 border-slate-50 flex items-center justify-center font-black text-sm shadow-xl transition-all duration-500 hidden sm:flex ${isCompleted ? 'bg-emerald-500 text-white shadow-emerald-200 scale-110' : 'bg-white text-slate-900 shadow-slate-100'}`}>
                {isCompleted ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg> : index + 1}
              </div>

              <div className={`w-full md:w-1/2 pl-0 md:pl-0 ${isEven ? 'md:pr-20 md:text-right' : 'md:ml-auto md:pl-20'}`}>
                <div className={`bg-white p-12 rounded-[3.5rem] border-2 transition-all group duration-500 relative ${isCompleted ? 'border-emerald-100 shadow-emerald-50/50' : 'border-slate-100 hover:border-blue-400 shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2'}`}>
                  
                  {/* Floating Completion Badge */}
                  {isCompleted && (
                    <div className="absolute -top-4 -right-4 bg-emerald-500 text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-200 animate-in zoom-in duration-300">
                      Completed ✅
                    </div>
                  )}

                  <div className={`flex items-center gap-3 mb-6 flex-wrap md:flex-nowrap justify-start ${isEven ? 'md:justify-end' : ''}`}>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] ${
                      project.level === 'Advanced' ? 'bg-red-50 text-red-600' : 
                      project.level === 'Intermediate' ? 'bg-amber-50 text-amber-600' : 
                      'bg-blue-50 text-blue-600'
                    }`}>
                      {project.level}
                    </span>
                    <span className="text-slate-200 hidden md:inline">•</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{project.tasks?.length || 0} Modules</span>
                  </div>
                  
                  <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter group-hover:text-blue-600 transition-colors leading-tight">{project.title}</h3>
                  <p className="text-slate-500 font-medium mb-12 leading-relaxed text-lg line-clamp-2">{project.description}</p>
                  
                  <a 
                    href={`#/project/${project.id}`}
                    className={`inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-black transition-all active:scale-95 shadow-xl ${
                      isCompleted 
                        ? 'bg-slate-50 text-slate-500 hover:bg-slate-100' 
                        : 'bg-slate-900 text-white hover:bg-blue-600 shadow-slate-300 hover:shadow-blue-200'
                    }`}
                  >
                    {isCompleted ? 'Review Solution' : 'Start Building'}
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectorDetail;