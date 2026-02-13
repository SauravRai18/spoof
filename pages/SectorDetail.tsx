
import React from 'react';
import { MOCK_PROJECTS, SECTORS } from '../constants';

interface SectorDetailProps {
  sectorId: string;
}

const SectorDetail: React.FC<SectorDetailProps> = ({ sectorId }) => {
  const sector = SECTORS.find(s => s.id === sectorId);
  const filteredProjects = MOCK_PROJECTS.filter(p => p.sector.toLowerCase() === sectorId.toLowerCase());

  if (!sector) return <div className="py-20 text-center">Sector not found</div>;

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <a href="#/sectors" className="bg-white border border-slate-200 p-2 rounded-xl text-slate-500 hover:text-slate-900 transition-all hover:border-slate-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </a>
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">{sector.title} Track</h1>
          <p className="text-slate-500 font-medium">Complete the project ladder to master {sector.title.toLowerCase()} engineering.</p>
        </div>
      </div>

      <div className="relative space-y-12 pb-20">
        {/* Vertical Connector Line */}
        <div className="absolute left-10 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2 z-0"></div>

        {filteredProjects.map((project, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={project.id} className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-0">
              {/* Step Marker */}
              <div className="absolute left-10 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-4 border-slate-50 flex items-center justify-center bg-blue-600 text-white font-black text-sm shadow-lg">
                {index + 1}
              </div>

              {/* Card - Left for Even, Right for Odd on Desktop */}
              <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'}`}>
                <div className={`bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group ${isEven ? 'md:rounded-tr-none' : 'md:rounded-tl-none'}`}>
                  <div className={`inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    project.difficulty === 'Advanced' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {project.difficulty}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{project.title}</h3>
                  <p className="text-slate-600 mb-6 line-clamp-2">{project.description}</p>
                  <div className={`flex items-center ${isEven ? 'md:justify-end' : 'justify-start'} gap-4`}>
                    <a 
                      href={`#/project/${project.id}`}
                      className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-slate-100"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Placeholder for remaining ladder steps if less than 3 */}
        {filteredProjects.length < 3 && Array.from({ length: 3 - filteredProjects.length }).map((_, i) => (
          <div key={`empty-${i}`} className="relative z-10 flex flex-col md:flex-row items-center opacity-40 grayscale">
            <div className="absolute left-10 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-4 border-slate-50 flex items-center justify-center bg-slate-300 text-white font-black text-sm">
              {filteredProjects.length + i + 1}
            </div>
            <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${(filteredProjects.length + i) % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'}`}>
              <div className="bg-slate-50 p-8 rounded-[2rem] border-2 border-dashed border-slate-200">
                <h3 className="text-xl font-bold text-slate-400">Coming Soon</h3>
                <p className="text-slate-400 text-sm">Our engineers are drafting this project spec.</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectorDetail;
