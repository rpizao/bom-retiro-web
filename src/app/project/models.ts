export interface Project {
  code: string;
  title: string;
  status: string;
  description: string;
  department: string;
  created: string;
  expiresIn?: string;
  author: string;
  finished: boolean;
  priority: string;
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
