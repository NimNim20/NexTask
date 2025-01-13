export enum TaskStatus {
    Backlog = 'Backlog',
    NotStarted = 'Not Started',
    PickedForDevelopment = 'Picked for Development',
    InProgress = 'In Progress',
    InReview = 'In Review',
    Done = 'Done',
}

export enum TaskPriority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}

export type UserRole = 'user' | 'admin' | 'projectAdministrator';
