
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
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="#/" className="flex items-center gap-2 group transition-all">
                <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <span className="text-xl font-black tracking-tight text-slate-900">
                  BuildLike<span className="text-blue-600">Engineer</span>
                </span>
              </a>
            </div>

            <div className="flex items-center gap-6">
              {user ? (
                <>
                  <div className="hidden md:flex items-center gap-6">
                    <a href="#/dashboard" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Dashboard</a>
                    <a href="#/sectors" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Sectors</a>
                  </div>
                  <div className="h-4 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end hidden sm:flex">
                      <span className="text-xs font-bold text-slate-900">{user.displayName}</span>
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Lvl 1 Engineer</span>
                    </div>
                    <img src={user.photoURL || ''} alt="User" className="w-9 h-9 rounded-full border-2 border-slate-100 shadow-sm" />
                    <button 
                      onClick={handleLogout}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                      title="Logout"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <a href="#/login" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors px-4 py-2">Log in</a>
                  <a href="#/signup" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md shadow-slate-200">Get Started</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4 opacity-50 grayscale">
            <span className="text-lg font-black tracking-tight text-slate-900">BuildLikeEngineer</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} Professional Software Engineering Platform.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
