import React, { useState, useEffect } from 'react';
import { MOCK_PROJECTS } from '../constants';
import { authService } from '../services/firebase';

const Dashboard: React.FC = () => {
  const [seeding, setSeeding] = useState(false);
  const [sectorStats, setSectorStats] = useState<any[]>([]);
  const user = authService.getCurrentUser();

  useEffect(() => {
    if (user) {
      authService.getSectors().then(sectors => {
        const stats = sectors.map(s => {
          const totalInSector = MOCK_PROJECTS.filter(p => p.sector.toLowerCase() === s.id.toLowerCase()).length;
          const completedInSector = user.completedProjects.filter(cpId => {
             const proj = MOCK_PROJECTS.find(mp => mp.id === cpId);
             return proj && proj.sector.toLowerCase() === s.id.toLowerCase();
          }).length;
          return {
            id: s.id,
            name: s.name,
            total: totalInSector || 0,
            completed: completedInSector
          };
        });
        setSectorStats(stats);
      });
    }
  }, [user]);

  if (!user) return (
    <div className="flex justify-center py-20">
      <div className="animate-pulse text-slate-400 font-bold">Authenticating...</div>
    </div>
  );

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await authService.seedDatabase();
      alert('Firestore populated with Sectors and Projects!');
      window.location.reload();
    } catch (e) {
      console.error(e);
      alert('Failed to seed database.');
    } finally {
      setSeeding(false);
    }
  };

  const completedCount = user.completedProjects.length;
  const lastProject = MOCK_PROJECTS.find(p => !user.completedProjects.includes(p.id)) || MOCK_PROJECTS[0];
  
  // Progress Message Logic
  const renderProgressMessage = () => {
    if (completedCount === 0) {
      return (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="text-2xl">🚀</div>
          <div>
            <p className="text-blue-900 font-black">Ready to build?</p>
            <p className="text-blue-700 font-medium">Start your first project in the <a href="#/sectors" className="underline font-bold">Fintech sector</a> today.</p>
          </div>
        </div>
      );
    }

    const mostRecentSector = sectorStats.find(s => s.completed > 0);
    if (mostRecentSector) {
      return (
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-8 flex items-center gap-4">
          <div className="text-2xl">📈</div>
          <div>
            <p className="text-emerald-900 font-black">Great momentum!</p>
            <p className="text-emerald-700 font-medium">You've completed {mostRecentSector.completed} of {mostRecentSector.total} projects in {mostRecentSector.name}.</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Engineer Workspace</h1>
          <p className="text-slate-500 font-medium">Welcome back, {user.displayName?.split(' ')[0]}. Track your progress and master new domains.</p>
        </div>
        <button 
          onClick={handleSeed}
          disabled={seeding}
          className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm"
        >
          {seeding ? 'Syncing...' : 'Reset Demo Data'}
        </button>
      </div>

      {renderProgressMessage()}

      {!user.currentSector && (
        <div className="bg-amber-50 border border-amber-100 rounded-3xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="text-3xl">🎯</div>
            <div>
              <h3 className="text-amber-900 font-bold text-lg">No sector selected</h3>
              <p className="text-amber-700">Choose an industry track to start specializing your engineering skills.</p>
            </div>
          </div>
          <a href="#/sectors" className="bg-amber-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-amber-700 transition-all whitespace-nowrap">
            Select a Sector
          </a>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Profile Summary Card */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col items-center text-center h-full hover:shadow-lg transition-shadow">
            <div className="relative mb-6">
              <img src={user.photoURL || ''} className="w-28 h-28 rounded-3xl border-4 border-white shadow-xl rotate-2" alt="User" />
              <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-lg border-2 border-white shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              </div>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-1 leading-tight">{user.displayName}</h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">Software Engineer</p>
            
            <div className="w-full space-y-4 pt-6 border-t border-slate-100">
               <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl">
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-tight">Mastery</span>
                 <span className="text-lg font-black text-blue-600">{Math.round((completedCount/Math.max(1, MOCK_PROJECTS.length))*100)}%</span>
               </div>
               <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl">
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-tight">Solved</span>
                 <span className="text-lg font-black text-emerald-600">{completedCount}</span>
               </div>
            </div>
          </div>
        </div>

        {/* Featured Card */}
        <div className="lg:col-span-9 flex flex-col gap-8">
          <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-200 group">
            <div className="relative z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-black uppercase tracking-widest mb-4">
                Current Focus
              </span>
              <h3 className="text-4xl font-black mb-4 tracking-tight group-hover:translate-x-1 transition-transform">{lastProject.title}</h3>
              <p className="text-slate-400 max-w-lg mb-10 text-lg leading-relaxed">Continue your journey in the {lastProject.sector.toLowerCase()} track. Production-ready requirements await.</p>
              <a 
                href={`#/project/${lastProject.id === 'fin-1' ? 'wallet-system' : lastProject.id}`}
                className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95"
              >
                Launch Project Track
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </a>
            </div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] -mr-20 -mt-20"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm">
              <h4 className="font-black text-slate-900 text-xl mb-8">Learning Progress</h4>
              <div className="space-y-8">
                {sectorStats.length > 0 ? sectorStats.map(s => (
                  <div key={s.id}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-black text-slate-700 tracking-tight">{s.name}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.completed}/{s.total}</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(37,99,235,0.3)]" 
                        style={{ width: `${(s.completed / Math.max(1, s.total)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )) : (
                  <p className="text-slate-400 italic text-sm text-center">No track data available.</p>
                )}
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm flex flex-col">
              <h4 className="font-black text-slate-900 text-xl mb-8">Quick Actions</h4>
              <div className="grid grid-cols-1 gap-4 flex-1">
                <a href="#/sectors" className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 hover:bg-blue-600 hover:text-white transition-all group font-black text-slate-700">
                  <span>Browse All Sectors</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <a href="https://github.com" target="_blank" className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 hover:bg-slate-900 hover:text-white transition-all group font-black text-slate-700">
                  <span>Open GitHub</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;