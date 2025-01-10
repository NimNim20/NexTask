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
      if (!title.trim()) {
        alert('Task title cannot be empty.');
        return;
      }
      onCreateTask(status, title.trim(), description.trim());
      setTitle('');
      setDescription('');
    };
  
    return (
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          aria-label={`Task title for status ${status}`}
          className="w-full mb-2 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description (optional)"
          aria-label={`Task description for status ${status}`}
          className="w-full mb-2 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button
          type="submit"
          className="w-full px-2 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Task
        </button>
      </form>
    );
  };

export default TaskForm;