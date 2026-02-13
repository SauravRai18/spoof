
import React, { useState } from 'react';
import { MOCK_PROJECTS } from '../constants';
import MarkdownView from '../components/MarkdownView';

interface ProjectDetailProps {
  projectId: string;
}

type Tab = 'brd' | 'architecture' | 'database' | 'apis' | 'tasks';

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId }) => {
  const project = MOCK_PROJECTS.find(p => p.id === projectId);
  const [activeTab, setActiveTab] = useState<Tab>('brd');
  const [isRepoConnected, setIsRepoConnected] = useState(false);

  if (!project) return <div className="py-20 text-center">Project not found</div>;

  const handleConnectGithub = () => {
    // Placeholder for GitHub OAuth flow
    const repoName = prompt("Enter your GitHub repository name (e.g., username/repo-name):");
    if (repoName) {
      setIsRepoConnected(true);
      alert(`Successfully linked to ${repoName}! (Simulation)`);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'brd': return <MarkdownView content={project.brd} />;
      case 'architecture': return <MarkdownView content={project.architecture} />;
      case 'database': return <MarkdownView content={project.database} />;
      case 'apis': return <MarkdownView content={project.api} />;
      case 'tasks':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Development Tasks</h2>
              {isRepoConnected && (
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Repo Synced
                </div>
              )}
            </div>
            <div className="grid gap-4">
              {project.tasks.map(task => (
                <div key={task.id} className="group flex items-start gap-4 p-6 bg-white border border-slate-200 rounded-[2rem] hover:border-blue-400 transition-all hover:shadow-lg hover:shadow-slate-100">
                  <div className={`mt-1 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${task.status === 'done' ? 'bg-green-500 border-green-500' : 'border-slate-300'}`}>
                    {task.status === 'done' && <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>}
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-lg font-bold ${task.status === 'done' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{task.title}</h4>
                    <p className="text-slate-500 text-sm mt-1">{task.description}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                        task.status === 'done' ? 'bg-green-100 text-green-700' : 
                        task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {task.status.replace('-', ' ')}
                      </span>
                    </div>
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
    <div className="py-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.history.back()}
            className="bg-white border border-slate-200 p-2 rounded-xl text-slate-500 hover:text-slate-900 transition-all shadow-sm group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-blue-600 text-xs font-black uppercase tracking-widest">{project.sector}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 text-xs font-bold">{project.difficulty}</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{project.title}</h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
           {!isRepoConnected ? (
             <button 
               onClick={handleConnectGithub}
               className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg"
             >
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
               Connect GitHub Repository
             </button>
           ) : (
             <button 
               className="bg-white border border-slate-200 text-slate-900 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
             >
               <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
               Repo Connected
             </button>
           )}
           <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
             Complete Phase
           </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24 bg-white border border-slate-200 rounded-[2.5rem] p-4 space-y-1.5 shadow-sm">
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
                className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-3 font-bold transition-all ${
                  activeTab === tab.id ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

        <section className="flex-1 bg-white border border-slate-200 rounded-[3rem] p-10 min-h-[600px] shadow-sm">
          {renderContent()}
        </section>
      </div>
    </div>
  );
};

export default ProjectDetail;
