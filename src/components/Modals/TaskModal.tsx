import React from 'react';
import { TaskStatus } from '../../types/enums';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateTask: (title: string, description: string, status: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onCreateTask }) => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [status, setStatus] = React.useState('');

    const handleSubmit = () => {
        onCreateTask(title, description, status);
        onClose();
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Create New Task</h2>
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    >
                        &times;
                    </button>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Task Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                placeholder="Enter task title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Task Description
                            </label>
                            <textarea
                                id="description"
                                placeholder="Enter task description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                            />
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                Task Status
                            </label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {Object.values(TaskStatus).map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Create Task
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default TaskModal;
