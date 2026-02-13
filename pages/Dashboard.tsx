
import React from 'react';
import { MOCK_PROJECTS } from '../constants';
import { authService } from '../services/firebase';

const Dashboard: React.FC = () => {
  const user = authService.getCurrentUser();
  const activeProjects = MOCK_PROJECTS.slice(0, 1); // Mocked "in progress" projects

  if (!user) return <div>Please login</div>;

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Hello, {user.displayName}</h1>
          <p className="text-slate-500">Ready to tackle your next engineering challenge?</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-emerald-50 text-emerald-700 px-6 py-3 rounded-2xl border border-emerald-100 flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Experience</p>
              <p className="text-lg font-bold leading-tight">2,450 XP</p>
            </div>
          </div>
          <div className="bg-blue-50 text-blue-700 px-6 py-3 rounded-2xl border border-blue-100 flex items-center gap-3">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Day Streak</p>
              <p className="text-lg font-bold leading-tight">12 Days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="bg-blue-600 w-2 h-6 rounded-full inline-block"></span>
              Active Projects
            </h3>
            {activeProjects.map(project => (
              <div key={project.id} className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-32 h-32 bg-slate-100 rounded-2xl flex-shrink-0 overflow-hidden">
                  <img src={`https://picsum.photos/seed/${project.id}/200/200`} className="w-full h-full object-cover" alt="p" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">{project.sector}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-400 text-xs">Updated 2h ago</span>
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

          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="bg-amber-500 w-2 h-6 rounded-full inline-block"></span>
              Recommended for You
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_PROJECTS.slice(1, 3).map(p => (
                <div key={p.id} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-indigo-400">
                   <h5 className="font-bold text-slate-900 mb-1">{p.title}</h5>
                   <p className="text-slate-500 text-xs mb-4">{p.description.substring(0, 60)}...</p>
                   <div className="flex justify-between items-center">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.difficulty}</span>
                     <span className="text-indigo-600 font-bold text-sm">View Details →</span>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-slate-900 rounded-[2rem] p-8 text-white">
             <h4 className="text-xl font-bold mb-4">Engineering Stats</h4>
             <div className="space-y-6">
               <div className="flex justify-between items-end">
                 <div>
                   <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">Code Pushed</p>
                   <p className="text-3xl font-bold">14.2k <span className="text-xs font-normal text-slate-500">lines</span></p>
                 </div>
                 <div className="h-10 w-20 bg-slate-800 rounded-lg flex items-end gap-1 p-2">
                   {[4,7,5,9,6].map((h, i) => <div key={i} className="bg-blue-500 w-full" style={{height: `${h*10}%`}}></div>)}
                 </div>
               </div>
               <div className="flex justify-between items-end">
                 <div>
                   <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">PRs Merged</p>
                   <p className="text-3xl font-bold">38</p>
                 </div>
                 <div className="h-10 w-20 bg-slate-800 rounded-lg flex items-end gap-1 p-2">
                   {[2,5,3,6,4].map((h, i) => <div key={i} className="bg-emerald-500 w-full" style={{height: `${h*10}%`}}></div>)}
                 </div>
               </div>
               <button className="w-full bg-blue-600 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all mt-4">
                 Connect Portfolio
               </button>
             </div>
           </div>

           <div className="bg-white border border-slate-200 rounded-[2rem] p-8">
             <h4 className="text-xl font-bold text-slate-900 mb-6">Learning Path</h4>
             <div className="space-y-4">
               {[
                 { label: 'System Architecture', val: 70, color: 'bg-indigo-500' },
                 { label: 'Database Design', val: 45, color: 'bg-blue-500' },
                 { label: 'API Engineering', val: 90, color: 'bg-emerald-500' },
                 { label: 'Security Patterns', val: 20, color: 'bg-red-500' }
               ].map(stat => (
                 <div key={stat.label}>
                   <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                     <span>{stat.label}</span>
                     <span>{stat.val}%</span>
                   </div>
                   <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                     <div className={`${stat.color} h-full rounded-full`} style={{width: `${stat.val}%`}}></div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
