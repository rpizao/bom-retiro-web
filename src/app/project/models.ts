export interface Project {
  code: string;
  title: string;
  status: 'late' | 'attention' | 'in-progress' | 'finish' | 'cancel' | 'new';
  description: string;
  department: string;
  created: string;
  expiresIn?: string;
  progress?: Progress[];
}

export interface Progress {
  state: string;
  percentual?: number;
  comments?: ProgressComment[];
  lock: boolean;
  nextStates: string[];
}

export interface ProgressComment {
  text: string;
  date: string;
  author: string;
}
