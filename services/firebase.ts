
import { User, SectorType } from '../types';

class AuthService {
  private user: User | null = null;
  private listeners: ((user: User | null) => void)[] = [];

  constructor() {
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
    if (this.user) {
      localStorage.setItem('be_user', JSON.stringify(this.user));
    } else {
      localStorage.removeItem('be_user');
    }
    this.listeners.forEach(l => l(this.user));
  }

  async login(email: string, pass: string): Promise<User> {
    const user: User = {
      uid: Math.random().toString(36).substr(2, 9),
      email,
      displayName: email.split('@')[0],
      photoURL: `https://picsum.photos/seed/${email}/200`,
      completedProjects: [],
      currentSector: null
    };
    this.user = user;
    this.notify();
    return user;
  }

  async loginWithGithub(): Promise<User> {
    const user: User = {
      uid: 'gh_' + Math.random().toString(36).substr(2, 9),
      email: 'github_user@example.com',
      displayName: 'GitHub Engineer',
      photoURL: 'https://picsum.photos/seed/github/200',
      completedProjects: [],
      currentSector: null
    };
    this.user = user;
    this.notify();
    return user;
  }

  async markProjectCompleted(projectId: string) {
    if (this.user && !this.user.completedProjects.includes(projectId)) {
      this.user.completedProjects = [...this.user.completedProjects, projectId];
      this.notify();
    }
  }

  async setSector(sector: SectorType) {
    if (this.user) {
      this.user.currentSector = sector;
      this.notify();
    }
  }

  async logout() {
    this.user = null;
    this.notify();
  }

  getCurrentUser() {
    return this.user;
  }
}

export const authService = new AuthService();
