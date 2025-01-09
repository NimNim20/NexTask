import React, { useState } from 'react';
import { Project, Task, TaskStatus, TaskPriority } from '../../utils/projectsTypes';

interface ProjectBoardProps {
  project: Project;
  onUpdateProject: (updatedProject: Project) => void;
}

const ProjectBoard: React.FC<ProjectBoardProps> = ({ project, onUpdateProject }) => {
  const [newTaskInputs, setNewTaskInputs] = useState<{
    [key in TaskStatus]?: { title: string; description: string };
  }>({});

  // Precompute tasks grouped by status for better performance
  const tasksByStatus = project.tasks.reduce((acc, task) => {
    (acc[task.status] = acc[task.status] || []).push(task);
    return acc;
  }, {} as { [key in TaskStatus]?: Task[] });

  const statusColors = {
    [TaskStatus.Backlog]: 'bg-gray-200',
    [TaskStatus.NotStarted]: 'bg-blue-200',
    [TaskStatus.PickedForDevelopment]: 'bg-yellow-200',
    [TaskStatus.InProgress]: 'bg-purple-200',
    [TaskStatus.InReview]: 'bg-green-200',
    [TaskStatus.Done]: 'bg-teal-200',
  };

  const handleCreateTask = (status: TaskStatus) => {
    const taskInput = newTaskInputs[status];
    if (!taskInput?.title.trim()) {
      alert('Task title cannot be empty.');
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: taskInput.title.trim(),
      description: taskInput.description.trim() || '',
      priority: TaskPriority.Medium,
      assignee: null,
      status,
    };

    const updatedProject: Project = {
      ...project,
      tasks: [...project.tasks, newTask],
    };

    onUpdateProject(updatedProject);

    // Clear input fields for the status
    setNewTaskInputs((prev) => ({ ...prev, [status]: { title: '', description: '' } }));
  };

  const handleMoveTask = (taskId: number, newStatus: TaskStatus) => {
    const updatedTasks = project.tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    onUpdateProject({ ...project, tasks: updatedTasks });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
      <p className="mb-4">Team: {project.team?.name || 'No team assigned'}</p>

      <div className="flex gap-4 overflow-x-auto">
        {Object.values(TaskStatus).map((status) => (
          <div key={status} className="flex-shrink-0 w-64">
            <h3 className={`font-semibold mb-2 text-white p-2 rounded ${statusColors[status]}`}>
              {status}
            </h3>
            <div className="bg-white p-4 rounded-md shadow min-h-[200px]">
              {tasksByStatus[status]?.map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-2 mb-3 rounded shadow border border-gray-200"
                >
                  <h4 className="font-semibold text-black">{task.title}</h4>
                  <p className="text-sm text-gray-600">{task.description || 'No description'}</p>
                  <p className="text-sm text-gray-600">Priority: {task.priority}</p>
                  <p className="text-sm text-gray-600">
                    Assignee: {task.assignee?.name || 'Unassigned'}
                  </p>
                  <select
                    aria-label={`Change status for task "${task.title}"`}
                    value={task.status}
                    onChange={(e) => handleMoveTask(task.id, e.target.value as TaskStatus)}
                    className="mt-2 w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.values(TaskStatus).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              {/* Form to add a new task */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateTask(status);
                }}
                className="mt-4"
              >
                <input
                  type="text"
                  value={newTaskInputs[status]?.title || ''}
                  onChange={(e) =>
                    setNewTaskInputs((prev) => ({
                      ...prev,
                      [status]: {
                        ...(prev[status] || {}),
                        title: e.target.value,
                      },
                    }))
                  }
                  placeholder="Task title"
                  aria-label={`Task title for status ${status}`}
                  className="w-full mb-2 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  value={newTaskInputs[status]?.description || ''}
                  onChange={(e) =>
                    setNewTaskInputs((prev) => ({
                      ...prev,
                      [status]: {
                        ...(prev[status] || {}),
                        description: e.target.value,
                      },
                    }))
                  }
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectBoard;
