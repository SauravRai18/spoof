
// This file simulates Firebase Auth and Firestore for the demo environment.
// In a real scenario, you would import 'firebase/app', 'firebase/auth', etc.

import { User } from '../types';

class AuthService {
  private user: User | null = null;
  private listeners: ((user: User | null) => void)[] = [];

  constructor() {
    // Check local storage for persistent session
    const stored = localStorage.getItem('be_user');
    if (stored) {
      this.user = JSON.parse(stored);
    }
  }

  onAuthStateChanged(callback: (user: User | null) => void) {
    this.listeners.push(callback);
    callback(this.user);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  private notify() {
    this.listeners.forEach(l => l(this.user));
  }

  async login(email: string, pass: string): Promise<User> {
    // Simulation: any email works for demo
    const user: User = {
      uid: Math.random().toString(36).substr(2, 9),
      email,
      displayName: email.split('@')[0],
      photoURL: `https://picsum.photos/seed/${email}/200`
    };
    this.user = user;
    localStorage.setItem('be_user', JSON.stringify(user));
    this.notify();
    return user;
  }

  async loginWithGithub(): Promise<User> {
    const user: User = {
      uid: 'gh_' + Math.random().toString(36).substr(2, 9),
      email: 'github_user@example.com',
      displayName: 'GitHub Engineer',
      photoURL: 'https://picsum.photos/seed/github/200'
    };
    this.user = user;
    localStorage.setItem('be_user', JSON.stringify(user));
    this.notify();
    return user;
  }

  async logout() {
    this.user = null;
    localStorage.removeItem('be_user');
    this.notify();
  }

  getCurrentUser() {
    return this.user;
  }
}

export const authService = new AuthService();
