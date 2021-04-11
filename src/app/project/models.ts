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
  nextState: string;
  state: string;
  progress?: Progress[];
}

export interface Progress {
  state: string;
  percentual?: number;
  lock: boolean;
  created: string;
  comments?: ProgressComment[];
}

export interface ProgressComment {
  text: string;
  date: string;
  author: string;
}
