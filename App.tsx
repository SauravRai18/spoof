
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

const App: React.FC = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderRoute = () => {
    const hash = currentHash || '#/';
    const user = authService.getCurrentUser();

    // Route matching
    if (hash === '#/') return <Home />;
    if (hash === '#/login') return <Login />;
    if (hash === '#/signup') return <Signup />;
    
    // Protected routes
    if (!user && hash !== '#/') {
      window.location.hash = '#/login';
      return <Login />;
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
