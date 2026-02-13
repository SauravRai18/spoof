
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-8 border border-blue-100">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        New project tracks for Q4 just dropped
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-4xl">
        Build Software Like a <span className="text-blue-600">Senior Engineer.</span>
      </h1>
      <p className="text-xl text-slate-600 mb-10 max-w-2xl">
        Stop building toy apps. Master industry-standard projects with real requirements, 
        system architectures, and database designs.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-20">
        <a href="#/sectors" className="bg-slate-900 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
          Start Project Track
        </a>
        <a href="#/login" className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 transition-all">
          View Demo
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {[
          { title: "Real Requirements", desc: "Detailed BRDs and technical specs for every project.", icon: "📋" },
          { title: "System Design", desc: "Architectural diagrams and data flow patterns.", icon: "🏗️" },
          { title: "Push to GitHub", desc: "Sync your progress and build a world-class portfolio.", icon: "🐙" }
        ].map((feat, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-left hover:border-blue-200 transition-colors">
            <div className="text-3xl mb-4">{feat.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-slate-900">{feat.title}</h3>
            <p className="text-slate-600">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
