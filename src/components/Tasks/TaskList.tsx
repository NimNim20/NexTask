// components/TaskList.tsx
import React from 'react';
import { Task, TaskStatus } from '../../types/projectsTypes';
import TaskColumn from './TaskColumn';

interface TaskListProps {
    tasksByStatus: Record<TaskStatus, Task[]>;
    onMoveTask: (taskId: string, newStatus: TaskStatus) => Promise<void>;
    onDeleteTask: (taskId: string) => Promise<void>;
    onAssignTask: (taskId: string, userId: string) => Promise<void>;
    onCreateTask: (title: string, description: string, status: string) => Promise<void>;
    users: { id: string; name: string }[];
}

const TaskList: React.FC<TaskListProps> = ({ tasksByStatus, onMoveTask, onDeleteTask, onAssignTask, onCreateTask, users }) => {
    return (
        <div className="flex gap-4 overflow-x-auto justify-center">
            {Object.values(TaskStatus).map((status) => (
                <TaskColumn
                    key={status}
                    title={status}
                    tasks={tasksByStatus[status] || []}
                    onMoveTask={onMoveTask}
                    onDeleteTask={onDeleteTask}
                    onCreateTask={onCreateTask}
                    onAssignTask={onAssignTask}
                    users={users}
                />
            ))}
        </div>
    );
};

export default TaskList;
