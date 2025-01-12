import React, { useState } from 'react';
import { TaskStatus } from '../../utils/projectsTypes';

const TaskForm: React.FC<{
    status: TaskStatus;
    onCreateTask: (status: TaskStatus, title: string, description: string) => void;
}> = ({ status, onCreateTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreateTask(status, title, description);
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
