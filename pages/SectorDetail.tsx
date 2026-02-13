
import React from 'react';
import { useParams } from 'react-router-dom'; // Using manual extraction as we simulate routes
import { MOCK_PROJECTS, SECTORS } from '../constants';
import { SectorType } from '../types';

interface SectorDetailProps {
  sectorId: string;
}

const SectorDetail: React.FC<SectorDetailProps> = ({ sectorId }) => {
  const sector = SECTORS.find(s => s.id === sectorId);
  const filteredProjects = MOCK_PROJECTS.filter(p => p.sector.toLowerCase() === sectorId.toLowerCase());

  if (!sector) return <div>Sector not found</div>;

  return (
    <div className="py-8">
      <div className="flex items-center gap-4 mb-8">
        <a href="#/sectors" className="text-slate-500 hover:text-slate-900 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </a>
        <h1 className="text-4xl font-bold text-slate-900">{sector.title} Projects</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.length > 0 ? filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-blue-400 transition-all group flex flex-col h-full">
            <div className="h-48 bg-slate-100 relative overflow-hidden">
               <img src={`https://picsum.photos/seed/${project.id}/600/400`} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900">
                 {project.difficulty}
               </div>
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{project.title}</h3>
              <p className="text-slate-600 mb-6 flex-1">{project.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/${project.id+i}/32/32`} className="w-8 h-8 rounded-full border-2 border-white" alt="user" />
                  ))}
                  <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">+12</div>
                </div>
                <a 
                  href={`#/project/${project.id}`}
                  className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-colors"
                >
                  Start Project
                </a>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-12 text-center text-slate-500">
            No projects available in this track yet. Coming soon!
          </div>
        )}
      </div>
    </div>
  );
};

export default SectorDetail;
