import React from 'react';
import { Task, TaskStatus } from '../../utils/projectsTypes';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';


const TaskColumn: React.FC<{
    status: TaskStatus;
    tasks: Task[];
    onMoveTask: (taskId: number, newStatus: TaskStatus) => void;
    onCreateTask: (status: TaskStatus, title: string, description: string) => void;
    color: string;
  }> = ({ status, tasks, onMoveTask, onCreateTask, color }) => {
    return (
      <div className="flex-shrink-0 w-64">
        <h3 className={`font-semibold mb-2 text-white p-2 rounded ${color}`}>{status}</h3>
        <div className="bg-white p-4 rounded-md shadow min-h-[200px]">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onMoveTask={onMoveTask} />
          ))}
          <TaskForm status={status} onCreateTask={onCreateTask} />
        </div>
      </div>
    );
  };

export default TaskColumn;