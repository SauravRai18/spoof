
export enum SectorType {
  FINTECH = 'Fintech',
  ECOMMERCE = 'E-commerce',
  SAAS = 'SaaS'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  sector: SectorType;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  brd: string;
  architecture: string;
  database: string;
  api: string;
  tasks: Task[];
  githubUrl?: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  completedProjects: string[]; // List of project IDs
  currentSector: SectorType | null;
}

export interface ProjectProgress {
  projectId: string;
  completedTasks: string[];
  githubRepo?: string;
}
