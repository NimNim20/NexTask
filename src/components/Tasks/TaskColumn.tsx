import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task, TaskStatus } from '../../utils/projectsTypes';
import TaskCard from './TaskCard';

interface TaskColumnProps {
    status: TaskStatus;
    tasks: Task[];
    onMoveTask: (taskId: number, newStatus: TaskStatus) => void;
    onCreateTask: (status: TaskStatus, title: string, description: string) => void;
    color: string;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
    status,
    tasks,
    onMoveTask,
    onCreateTask,
    color,
}) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');

    const handleCreateTask = () => {
        if (newTaskTitle.trim()) {
            onCreateTask(status, newTaskTitle.trim(), newTaskDescription.trim());
            setNewTaskTitle('');
            setNewTaskDescription('');
        }
    };

    return (
        <div className={`w-64 ${color} p-4 rounded-lg`}>
            <h3 className="font-bold mb-2">{status}</h3>
            {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <TaskCard task={task} onMoveTask={onMoveTask} />
                        </div>
                    )}
                </Draggable>
            ))}
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="New task title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                />
                <textarea
                    placeholder="New task description"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                />
                <button
                    onClick={handleCreateTask}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Add Task
                </button>
            </div>
        </div>
    );
};

export default TaskColumn;

