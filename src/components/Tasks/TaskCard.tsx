import React from 'react';
import { Task, TaskStatus } from '../../utils/projectsTypes';

interface TaskCardProps {
    task: Task;
    onMoveTask: (taskId: number, newStatus: TaskStatus) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onMoveTask }) => {
    return (
        <div className="bg-white p-2 mb-3 rounded shadow border border-gray-200">
            <h4 className="font-semibold text-black">{task.title}</h4>
            <p className="text-sm text-gray-600">{task.description || 'No description'}</p>
            <p className="text-sm text-gray-600">Priority: {task.priority}</p>
            <p className="text-sm text-gray-600">
                Assignee: {task.assignee?.name || 'Unassigned'}
            </p>
            <select
                aria-label={`Change status for task "${task.title}"`}
                value={task.status}
                onChange={(e) => onMoveTask(task.id, e.target.value as TaskStatus)}
                className="mt-2 w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

