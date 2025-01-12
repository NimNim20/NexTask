export enum TaskStatus {
  Backlog = 'Backlog',
  NotStarted = 'Not Started',
  PickedForDevelopment = 'Picked for Development',
  InProgress = 'In Progress',
  InReview = 'In Review',
  Done = 'Done'
}

export enum TaskPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High'
}

export interface User {
  id: number;
  name: string;
}

export interface Team {
  id: number;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  assignee: User | null;
  status: TaskStatus;
}

export interface Project {
  id: string;
  name: string;
  team: Team | null;
  tasks: Task[];
}

