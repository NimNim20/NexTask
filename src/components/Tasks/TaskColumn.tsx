import React from 'react';
import { Task } from '../../types/task';
import TaskCard from './TaskCard';
import { TaskStatus } from '../../types/enums';

interface TaskColumnProps {

    title: TaskStatus;

    tasks: Task[];

    onMoveTask: (taskId: string, newStatus: TaskStatus) => Promise<void>;

    onDeleteTask: (taskId: string) => Promise<void>;

    onCreateTask: (title: string, description: string, status: string) => Promise<void>;
    
    onAssignTask: (taskId: string, userId: string) => Promise<void>;

    users: { id: string; name: string }[];

}

const TaskColumn: React.FC<TaskColumnProps> = ({
    title,
    tasks,
    onMoveTask,
    onAssignTask,
    onDeleteTask,
    users
}) => {
    return (
        <div className="w-1/3 p-4">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onMoveTask={onMoveTask}
                    onAssignTask={onAssignTask}
                    onDeleteTask={onDeleteTask}
                    users={users}
                />
            ))}
        </div>
    );
};

export default TaskColumn;
