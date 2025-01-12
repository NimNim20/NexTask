import React from 'react';
import { Task, TaskStatus } from '../../types/projectsTypes';

const TaskCard: React.FC<{
    task: Task;
    onMoveTask: (taskId: string, newStatus: TaskStatus) => void;
}> = ({ task, onMoveTask }) => {
    const priorityColors = {
        Low: 'bg-green-500 text-white',
        Medium: 'bg-yellow-500 text-white',
        High: 'bg-red-500 text-white',
    };

    return (
        <div className="bg-white p-4 rounded-md shadow-md mb-4 flex flex-col h-full">
            <h4 className="text-lg font-semibold text-black mb-2">{task.title}</h4>
            <p className="text-black mb-2">{task.description}</p>
            <p className="text-black mb-2">Assigned: {task.assignee?.name || 'No one'}</p>

            <div className={`p-2 rounded-md ${priorityColors[task.priority]}`}>
                <span>{task.priority}</span>
            </div>

            <select
                value={task.status}
                onChange={(e) => onMoveTask(task.id, e.target.value as TaskStatus)}
                className="w-full p-2 bg-gray-100 rounded-md mt-2"
            >
                {Object.values(TaskStatus).map((status) => (
                    <option key={status} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TaskCard;
