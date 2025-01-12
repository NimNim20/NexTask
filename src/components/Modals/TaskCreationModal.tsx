import React, { useState } from 'react';

interface TaskCreationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateTask: (title: string, description: string, status: string, priority: string) => void;
}

const TaskCreationModal: React.FC<TaskCreationModalProps> = ({ isOpen, onClose, onCreateTask }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState('Low');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskTitle.trim()) {
            onCreateTask(taskTitle, taskDescription, 'Backlog', taskPriority);
            onClose();
        }
    };

    return (
        isOpen ? (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg w-1/3">
                    <h2 className="text-xl font-semibold mb-4">Create Task</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2">Title</label>
                            <input
                                type="text"
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                                placeholder="Enter task title"
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2">Description</label>
                            <textarea
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                                placeholder="Enter task description"
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2">Priority</label>
                            <select
                                value={taskPriority}
                                onChange={(e) => setTaskPriority(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        ) : null
    );
};

export default TaskCreationModal;
