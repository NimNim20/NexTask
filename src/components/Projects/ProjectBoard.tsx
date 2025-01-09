import React, { useState } from 'react';
import { Project, Task, TaskStatus, TaskPriority } from '../../utils/projectsTypes';

interface ProjectBoardProps {
  project: Project;
  onUpdateProject: (updatedProject: Project) => void;
}

const ProjectBoard: React.FC<ProjectBoardProps> = ({ project, onUpdateProject }) => {
  const [newTaskInputs, setNewTaskInputs] = useState<{[key in TaskStatus]?: string}>({});

  const handleCreateTask = (status: TaskStatus) => {
    const taskTitle = newTaskInputs[status];
    if (taskTitle && taskTitle.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: taskTitle.trim(),
        description: '',
        priority: TaskPriority.Medium,
        assignee: null,
        status: status,
      };
      const updatedProject: Project = {
        ...project,
        tasks: [...project.tasks, newTask],
      };
      onUpdateProject(updatedProject);
      setNewTaskInputs(prev => ({ ...prev, [status]: '' }));
    }
  };

  const handleMoveTask = (taskId: number, newStatus: TaskStatus) => {
    const updatedTasks = project.tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    onUpdateProject({ ...project, tasks: updatedTasks });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
      <p className="mb-4">Team: {project.team?.name || 'No team assigned'}</p>
      <div className="flex gap-4 overflow-x-auto">
        {Object.values(TaskStatus).map(status => (
          <div key={status} className="flex-shrink-0 w-64">
            <h3 className="font-semibold text-white mb-2">{status}</h3>
            <div className="bg-white p-2 rounded-md min-h-[200px]">
              {project.tasks
                .filter(task => task.status === status)
                .map(task => (
                  <div key={task.id} className="bg-white p-2 mb-2 rounded shadow">
                    <h4 className="font-semibold text-black">{task.title}</h4>
                    <p className="text-sm text-black">{task.description}</p>
                    <p className="text-sm text-black">Priority: {task.priority}</p>
                    <p className="text-sm text-black">Assignee: {task.assignee?.name || 'Unassigned'}</p>
                    <select
                      value={task.status}
                      onChange={(e) => handleMoveTask(task.id, e.target.value as TaskStatus)}
                      className="mt-2 w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Object.values(TaskStatus).map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                ))}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateTask(status);
                }} 
                className="mt-2"
              >
                <input
                  type="text"
                  value={newTaskInputs[status] || ''}
                  onChange={(e) => setNewTaskInputs(prev => ({
                    ...prev,
                    [status]: e.target.value
                  }))}
                  placeholder="New task title"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="mt-1 w-full px-2 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add Task
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectBoard;

