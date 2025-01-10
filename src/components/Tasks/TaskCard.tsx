import React from 'react';
import { Task, User, predefinedUsers, TaskStatus } from '../../utils/taskTypes';

interface TaskCardProps {
    task: Task;
    onMoveTask: (taskId: number, newStatus: TaskStatus) => void;
    onAssignTask: (taskId: number, assigneeId: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onMoveTask, onAssignTask }) => {
    const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const assigneeId = parseInt(e.target.value, 10);
        onAssignTask(task.id, assigneeId);
    };

    return (
        <div className="bg-white p-4 mb-4 rounded shadow border border-gray-200">
            <h4 className="font-semibold text-black">{task.title}</h4>
            <p className="text-sm text-gray-600">{task.description || 'No description'}</p>
            <p className="text-sm text-gray-600">Priority: {task.priority}</p>

            <div className="text-sm text-gray-600 flex items-center">
                <span>Assignee: </span>
                <select
                    value={task.assignee?.id || ''}
                    onChange={handleAssigneeChange}
                    className="ml-2 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>
                        Select Assignee
                    </option>
                    {predefinedUsers.map((user: User) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mt-2">
                <label className="block text-sm text-gray-600">Status:</label>
                <select
                    value={task.status}
                    onChange={(e) => onMoveTask(task.id, e.target.value as TaskStatus)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                >
                    {Object.values(TaskStatus).map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default TaskCard;
