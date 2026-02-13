
import React from 'react';
import { MOCK_PROJECTS } from '../constants';
import { authService } from '../services/firebase';

const Dashboard: React.FC = () => {
  const user = authService.getCurrentUser();
  const activeProjects = MOCK_PROJECTS.slice(0, 1); 
  const completedCount = 4; // Mocked
  const selectedSector = "Fintech"; // Mocked

  if (!user) return <div>Please login</div>;

  return (
    <div className="py-8">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => window.location.hash = '#/'}
          className="bg-white border border-slate-200 p-2 rounded-xl text-slate-500 hover:text-slate-900 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Welcome back, {user.displayName}</h1>
          <p className="text-slate-500">Your engineering progress at a glance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">User Name</p>
          <p className="text-2xl font-bold text-slate-900">{user.displayName}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Completed Projects</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-black text-blue-600">{completedCount}</p>
            <p className="text-slate-500 font-medium">tracks mastered</p>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Current Sector</p>
          <div className="flex items-center gap-2">
             <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
             <p className="text-2xl font-bold text-slate-900">{selectedSector}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="bg-blue-600 w-2 h-6 rounded-full inline-block"></span>
              Current Progress
            </h3>
            {activeProjects.map(project => (
              <div key={project.id} className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center hover:border-blue-400 transition-all cursor-pointer shadow-sm">
                <div className="w-full md:w-32 h-32 bg-slate-100 rounded-2xl flex-shrink-0 overflow-hidden">
                  <img src={`https://picsum.photos/seed/${project.id}/200/200`} className="w-full h-full object-cover" alt="p" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">{project.sector}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-400 text-xs">Phase 2 / 5</span>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">{project.title}</h4>
                  <div className="w-full bg-slate-100 h-2 rounded-full mb-2">
                    <div className="bg-blue-600 h-full rounded-full w-[45%]"></div>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-slate-500">
                    <span>45% Complete</span>
                    <span>18 / 40 Tasks</span>
                  </div>
                </div>
                <a 
                  href={`#/project/${project.id}`}
                  className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all text-center w-full md:w-auto"
                >
                  Resume
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl">
             <h4 className="text-xl font-bold mb-6">Quick Actions</h4>
             <div className="space-y-3">
               <a href="#/sectors" className="flex items-center justify-between p-4 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-all">
                 <span className="font-semibold text-sm">Switch Project Track</span>
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
               </a>
               <button className="w-full flex items-center justify-between p-4 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-all">
                 <span className="font-semibold text-sm">Update Profile</span>
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
