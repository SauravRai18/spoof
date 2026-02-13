
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { authService } from '../services/firebase';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return authService.onAuthStateChanged(u => setUser(u));
  }, []);

  const handleLogout = () => {
    authService.logout();
    window.location.hash = '#/login';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="#/" className="flex items-center gap-2">
                <div className="bg-slate-900 text-white p-1.5 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">BuildLike<span className="text-blue-600">Engineer</span></span>
              </a>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <a href="#/dashboard" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Dashboard</a>
                  <a href="#/sectors" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Sectors</a>
                  <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
                  <div className="flex items-center gap-3">
                    <img src={user.photoURL || ''} alt="User" className="w-8 h-8 rounded-full border border-slate-200" />
                    <button 
                      onClick={handleLogout}
                      className="text-sm font-semibold text-slate-500 hover:text-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <a href="#/login" className="text-slate-600 hover:text-slate-900 font-medium">Log in</a>
                  <a href="#/login" className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-all">Sign up</a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} BuildLikeEngineer Platform. For educational purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
