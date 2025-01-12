import React from 'react';
import { Task } from '../../types/task';
import { TaskStatus } from '../../types/enums';



const TaskCard: React.FC<{
    task: Task;
    onMoveTask: (taskId: string, newStatus: TaskStatus) => void;
    onAssignTask: (taskId: string, userId: string) => void;
    onDeleteTask: (taskId: string) => void;
    users: { id: string; name: string }[];
}> = ({ task, onMoveTask }) => {
    const priorityColors = {
        Low: 'bg-green-500 text-white',
        Medium: 'bg-yellow-500 text-white',
        High: 'bg-red-500 text-white',
    };

    const assigneeName = typeof task.assignee === 'string' ? task.assignee : (task.assignee && (task.assignee as { name: string }).name) || 'No one';

    return (
        <div className="bg-white p-4 rounded-md shadow-md mb-4 flex flex-col h-full">
            <h4 className="text-lg font-semibold text-black mb-2">{task.title}</h4>
            <p className="text-black mb-2">{task.description}</p>
            <p className="text-black mb-2">Assigned: {assigneeName}</p>

            <div className={`p-2 rounded-md ${priorityColors[task.priority]}`}>
                <span>{task.priority}</span>
            </div>

            <select
                value={task.status}
                onChange={(e) => onMoveTask(task.id, e.target.value as TaskStatus)}
                className="w-full p-2 bg-slate-700 rounded-md mt-2"
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
