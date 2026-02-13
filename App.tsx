
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Sectors from './pages/Sectors';
import SectorDetail from './pages/SectorDetail';
import ProjectDetail from './pages/ProjectDetail';
import { authService } from './services/firebase';
import { User } from './types';

const App: React.FC = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [user, setUser] = useState<User | null>(null);
  const [authResolved, setAuthResolved] = useState(false);

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    
    const unsubscribe = authService.onAuthStateChanged((u) => {
      setUser(u);
      setAuthResolved(true);
    });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      unsubscribe();
    };
  }, []);

  const renderRoute = () => {
    const hash = currentHash || '#/';
    
    if (!authResolved) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium">Initializing Engineering Environment...</p>
        </div>
      );
    }

    // Public routes
    if (hash === '#/') return <Home />;
    if (hash === '#/login') return <Login />;
    if (hash === '#/signup') return <Signup />;
    
    // Protected routes check
    if (!user) {
      // Preserve the intended destination if needed, but for now redirect to login
      if (hash !== '#/' && hash !== '#/login' && hash !== '#/signup') {
         window.location.hash = '#/login';
         return <Login />;
      }
    }

    if (hash === '#/dashboard') return <Dashboard />;
    if (hash === '#/sectors') return <Sectors />;
    
    // Dynamic routes
    if (hash.startsWith('#/sector/')) {
      const sectorId = hash.split('#/sector/')[1];
      return <SectorDetail sectorId={sectorId} />;
    }
    
    if (hash.startsWith('#/project/')) {
      const projectId = hash.split('#/project/')[1];
      return <ProjectDetail projectId={projectId} />;
    }

    return <Home />;
  };

  return (
    <Layout>
      {renderRoute()}
    </Layout>
  );
};

export default App;
