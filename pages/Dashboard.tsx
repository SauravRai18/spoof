
import React from 'react';
import { MOCK_PROJECTS } from '../constants';
import { authService } from '../services/firebase';

const Dashboard: React.FC = () => {
  const user = authService.getCurrentUser();
  if (!user) return <div>Please login</div>;

  const completedCount = user.completedProjects.length;
  const currentSector = user.currentSector || 'None Selected';
  const lastProject = MOCK_PROJECTS.find(p => !user.completedProjects.includes(p.id)) || MOCK_PROJECTS[0];

  return (
    <div className="py-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <button 
          onClick={() => window.location.hash = '#/'}
          className="bg-white border border-slate-200 p-2 rounded-xl text-slate-500 hover:text-slate-900 transition-all hover:border-slate-400"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Engineer Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm text-center flex flex-col items-center">
          <img src={user.photoURL || ''} className="w-24 h-24 rounded-full border-4 border-slate-50 mb-4 shadow-sm" alt="User" />
          <h2 className="text-xl font-bold text-slate-900">{user.displayName}</h2>
          <p className="text-slate-500 text-sm mb-6">Software Engineer</p>
          <div className="w-full h-[1px] bg-slate-100 mb-6"></div>
          <div className="w-full space-y-4">
             <div className="flex justify-between text-sm">
               <span className="text-slate-500 font-semibold">Selected Sector</span>
               <span className="text-blue-600 font-bold">{currentSector}</span>
             </div>
             <div className="flex justify-between text-sm">
               <span className="text-slate-500 font-semibold">Completed</span>
               <span className="text-emerald-600 font-bold">{completedCount} Projects</span>
             </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2 block">Resume Journey</span>
              <h3 className="text-3xl font-black mb-4">{lastProject.title}</h3>
              <p className="text-slate-400 max-w-md mb-8">Master the fundamentals of {lastProject.sector.toLowerCase()} by completing this specialized project track.</p>
              <a 
                href={`#/project/${lastProject.id}`}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/40"
              >
                Continue Project
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </a>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-[2rem] p-8">
              <h4 className="font-bold text-slate-900 mb-4">Recommended Sectors</h4>
              <div className="space-y-3">
                {['Fintech', 'SaaS', 'E-commerce'].map(s => (
                  <button key={s} className="w-full text-left p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-all flex items-center justify-between group">
                    <span className="font-semibold text-slate-700">{s}</span>
                    <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-[2rem] p-8">
              <h4 className="font-bold text-slate-900 mb-4">Recent Activity</h4>
              <div className="space-y-4">
                {[1,2].map(i => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2"></div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Completed "Setup Database" task</p>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
