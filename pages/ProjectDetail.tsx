import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { authService } from '../services/firebase';
import MarkdownView from '../components/MarkdownView';

interface ProjectDetailProps {
  projectId: string;
}

type Tab = 'brd' | 'architecture' | 'database' | 'apis' | 'tasks';

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('brd');
  const [isRepoConnected, setIsRepoConnected] = useState(false);
  
  const user = authService.getCurrentUser();

  useEffect(() => {
    setLoading(true);
    authService.getProjectById(projectId).then(data => {
      setProject(data);
      setLoading(false);
    });
  }, [projectId]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40">
      <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-6"></div>
      <div className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Assembling Spec</div>
    </div>
  );
  if (!project) return <div className="py-20 text-center text-slate-500 font-black text-2xl">Specification Not Found</div>;

  const isCompleted = user?.completedProjects?.includes(project.id);

  const handleConnectGithub = () => {
    const repoName = prompt("Enter your GitHub repository name:");
    if (repoName) {
      setIsRepoConnected(true);
      alert(`Linked to ${repoName}! Monitoring for commits...`);
    }
  };

  const handleMarkCompleted = async () => {
    try {
      await authService.markProjectCompleted(project.id);
    } catch (e) {
      console.error(e);
      alert("Error updating track record.");
    }
  };

  const tabs = [
    { id: 'brd', label: 'BRD', icon: '📋' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
    { id: 'database', label: 'Database', icon: '🗄️' },
    { id: 'apis', label: 'APIs', icon: '🔌' },
    { id: 'tasks', label: 'Tasks', icon: '✅' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'brd': return <div className="animate-in fade-in slide-in-from-bottom-4 duration-500"><MarkdownView content={project.brd} /></div>;
      case 'architecture': return <div className="animate-in fade-in slide-in-from-bottom-4 duration-500"><MarkdownView content={project.architecture} /></div>;
      case 'database': return <div className="animate-in fade-in slide-in-from-bottom-4 duration-500"><MarkdownView content={project.database} /></div>;
      case 'apis': return <div className="animate-in fade-in slide-in-from-bottom-4 duration-500"><MarkdownView content={project.api} /></div>;
      case 'tasks':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-black tracking-tight text-slate-900">Engineering Backlog</h2>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-4 py-2 rounded-xl">{project.tasks.length} Modules</span>
            </div>
            <div className="grid gap-6">
              {project.tasks.map((task, i) => (
                <div key={task.id} className="group flex items-start gap-8 p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:border-blue-400 transition-all hover:shadow-2xl hover:shadow-blue-900/5">
                  <div className={`mt-1 h-14 w-14 rounded-3xl border-2 flex-shrink-0 flex items-center justify-center transition-all duration-500 ${task.status === 'done' ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-100 scale-105' : 'border-slate-100 group-hover:border-blue-200'}`}>
                    <span className={`text-lg font-black ${task.status === 'done' ? 'text-white' : 'text-slate-300'}`}>{task.status === 'done' ? '✓' : i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-2xl font-black mb-2 tracking-tight ${task.status === 'done' ? 'text-slate-300 line-through' : 'text-slate-900'}`}>{task.title}</h4>
                    <p className="text-slate-500 font-medium leading-relaxed text-lg">{task.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
        <div className="flex items-center gap-8">
          <button 
            onClick={() => window.history.back()}
            className="bg-white border border-slate-200 p-4 rounded-3xl text-slate-400 hover:text-slate-900 hover:border-slate-400 transition-all shadow-sm group active:scale-90"
          >
            <svg className="w-7 h-7 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-blue-600 text-white px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-200">{project.sector}</span>
              <span className="w-2 h-2 rounded-full bg-slate-200"></span>
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{project.difficulty} Track</span>
            </div>
            <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">{project.title}</h1>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
           {!isRepoConnected ? (
             <button 
               onClick={handleConnectGithub}
               className="bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black text-sm flex items-center gap-4 hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 active:scale-95"
             >
               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
               Connect Repository
             </button>
           ) : (
             <div className="bg-emerald-50 border-2 border-emerald-100 text-emerald-700 px-10 py-5 rounded-[2rem] font-black text-sm flex items-center gap-3 animate-in slide-in-from-right-2 duration-500 shadow-xl shadow-emerald-50">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
               GitHub Linked
             </div>
           )}
           {!isCompleted ? (
             <button 
               onClick={handleMarkCompleted}
               className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black text-sm hover:bg-blue-700 transition-all shadow-2xl shadow-blue-100 active:scale-95"
             >
               Mark Track Complete
             </button>
           ) : (
             <div className="bg-slate-50 border-2 border-slate-100 text-slate-400 px-10 py-5 rounded-[2rem] font-black text-sm flex items-center gap-3">
               Track Mastered ✅
             </div>
           )}
        </div>
      </div>

      {/* Navigation Interface */}
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Navigation Sidebar */}
        <nav className="w-full lg:w-72 flex lg:flex-col gap-3 p-3 bg-white border border-slate-100 rounded-[3rem] shadow-sm shrink-0 sticky top-28">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`group flex-1 lg:w-full text-left px-8 py-5 rounded-3xl flex items-center gap-5 font-black transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-2xl shadow-blue-200' 
                  : 'bg-transparent text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              }`}
            >
              <span className="text-2xl opacity-80 group-hover:scale-110 transition-transform">{tab.icon}</span>
              <span className="text-sm tracking-tight">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Content Viewer */}
        <section className="flex-1 w-full bg-white border border-slate-200 rounded-[4rem] p-10 md:p-20 min-h-[900px] shadow-sm relative overflow-hidden selection:bg-blue-100 selection:text-blue-900">
           {/* Backdrop UI Element */}
           <div className="absolute top-10 right-16 opacity-[0.02] pointer-events-none select-none">
             <span className="text-[18rem] font-black uppercase tracking-tighter leading-none">{activeTab}</span>
           </div>
           
           <div className="relative z-10">
            {renderContent()}
           </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectDetail;