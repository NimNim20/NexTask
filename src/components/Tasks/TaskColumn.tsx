import React from 'react';
import { Task, TaskStatus } from '../../utils/projectsTypes';
import TaskCard from './TaskCard';

interface TaskColumnProps {
    status: TaskStatus;
    tasks: Task[];
    onMoveTask: (taskId: string, newStatus: TaskStatus) => void;
    onCreateTask: (status: TaskStatus, title: string, description: string) => void;
    onDeleteTask: (taskId: string) => void;
    color: string;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
    status,
    tasks,
    onMoveTask
}) => {
    return (
        <div className={`flex flex-col p-4 rounded-md bg-white w-full max-w-sm`}>
            <h3 className="text-lg font-semibold text-black mb-2">{status}</h3>
            <div className="space-y-2 flex-grow">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onMoveTask={onMoveTask}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskColumn;
