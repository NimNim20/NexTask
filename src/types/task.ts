import { TaskStatus, TaskPriority } from './enums';
import { Timestamp } from 'firebase/firestore';

export interface Task {
    id: string;
    title: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
    assignee: string | null;
    projectId: string;
    dueDate: Timestamp;
    createdAt: Timestamp;
    tasks: Task [];
}

