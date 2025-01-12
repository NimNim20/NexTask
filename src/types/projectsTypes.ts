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
  id: string;
  name: string;
  members: User[];
  createdBy: string;
  createdAt: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
    assignee: string | null;
    projectId: string;
}
export interface Project {
  id: string;
  name: string;
  team: Team | null;
  tasks: Task[];
}

