
import React, { useState } from 'react';
import { MOCK_PROJECTS } from '../constants';
import { authService } from '../services/firebase';
import MarkdownView from '../components/MarkdownView';

interface ProjectDetailProps {
  projectId: string;
}

type Tab = 'brd' | 'architecture' | 'database' | 'apis' | 'tasks';

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId }) => {
  const project = MOCK_PROJECTS.find(p => p.id === projectId);
  const [activeTab, setActiveTab] = useState<Tab>('brd');
  const [isRepoConnected, setIsRepoConnected] = useState(false);
  const user = authService.getCurrentUser();

  if (!project) return <div className="py-20 text-center text-slate-500 font-bold">Project not found</div>;

  const isCompleted = user?.completedProjects.includes(project.id);

  const handleConnectGithub = () => {
    const repoName = prompt("Enter your GitHub repository name:");
    if (repoName) {
      setIsRepoConnected(true);
      alert(`Linked to ${repoName}!`);
    }
  };

  const handleMarkCompleted = async () => {
    await authService.markProjectCompleted(project.id);
    alert("Project marked as completed! Points added to your profile.");
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'brd': return <div className="animate-in fade-in slide-in-from-bottom-2 duration-300"><MarkdownView content={project.brd} /></div>;
      case 'architecture': return <div className="animate-in fade-in slide-in-from-bottom-2 duration-300"><MarkdownView content={project.architecture} /></div>;
      case 'database': return <div className="animate-in fade-in slide-in-from-bottom-2 duration-300"><MarkdownView content={project.database} /></div>;
      case 'apis': return <div className="animate-in fade-in slide-in-from-bottom-2 duration-300"><MarkdownView content={project.api} /></div>;
      case 'tasks':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-2xl font-black mb-8">Engineering Backlog</h2>
            <div className="grid gap-4">
              {project.tasks.map(task => (
                <div key={task.id} className="group flex items-center gap-6 p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:border-blue-300 transition-all hover:shadow-xl">
                  <div className={`h-10 w-10 rounded-2xl border-2 flex items-center justify-center transition-all ${task.status === 'done' ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-200' : 'border-slate-200'}`}>
                    {task.status === 'done' && <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>}
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-xl font-bold ${task.status === 'done' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{task.title}</h4>
                    <p className="text-slate-500 font-medium mt-1">{task.description}</p>
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
    <div className="py-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.history.back()}
            className="bg-white border border-slate-200 p-2 rounded-xl text-slate-500 hover:text-slate-900 transition-all hover:border-slate-400 group shadow-sm"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em]">{project.sector}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{project.difficulty}</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{project.title}</h1>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
           {!isRepoConnected ? (
             <button 
               onClick={handleConnectGithub}
               className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
             >
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
               Connect GitHub Repository
             </button>
           ) : (
             <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-8 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
               Repository Linked
             </div>
           )}
           <button 
             onClick={handleMarkCompleted}
             disabled={isCompleted}
             className={`px-8 py-3.5 rounded-2xl font-black text-sm transition-all shadow-xl ${isCompleted ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100'}`}
           >
             {isCompleted ? '✅ Track Mastered' : '✅ Mark as Completed'}
           </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <nav className="lg:w-72 flex-shrink-0 space-y-2">
          {[
            { id: 'brd', label: 'BRD', icon: '📋' },
            { id: 'architecture', label: 'Architecture', icon: '🏗️' },
            { id: 'database', label: 'Database', icon: '🗄️' },
            { id: 'apis', label: 'APIs', icon: '🔌' },
            { id: 'tasks', label: 'Tasks', icon: '✅' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`w-full text-left px-8 py-5 rounded-[2rem] flex items-center gap-4 font-black transition-all border-2 ${
                activeTab === tab.id 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xl shadow-slate-300' 
                  : 'bg-white text-slate-500 border-transparent hover:bg-slate-50'
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              <span className="tracking-tight">{tab.label}</span>
            </button>
          ))}
        </nav>

        <section className="flex-1 bg-white border border-slate-200 rounded-[3rem] p-12 min-h-[700px] shadow-sm relative">
           <div className="absolute top-8 right-12 opacity-10 pointer-events-none select-none">
             <span className="text-8xl font-black uppercase">{activeTab}</span>
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
