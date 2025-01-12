import React, { useState } from 'react';
import { Project, Task, TaskStatus, TaskPriority } from '../../types/projectsTypes';
import TaskColumn from '../Tasks/TaskColumn';
import TaskCreationModal from '../Modals/TaskCreationModal';

interface ProjectBoardProps {
  project: Project;
  onUpdateProject: (updatedProject: Project) => void;
}

const ProjectBoard: React.FC<ProjectBoardProps> = ({ project, onUpdateProject }) => {
  const groupTasksByStatus = (tasks: Task[]): Record<TaskStatus, Task[]> => {
    return tasks.reduce((acc, task) => {
      (acc[task.status] = acc[task.status] || []).push(task);
      return acc;
    }, {} as Record<TaskStatus, Task[]>);
  };

  const [tasksByStatus, setTasksByStatus] = useState<Record<TaskStatus, Task[]>>(groupTasksByStatus(project.tasks));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTask = (title: string, description: string, status: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      priority: TaskPriority.Medium,
      status: status as TaskStatus,
      assignee: null,
    };

    const updatedTasks = [...project.tasks, newTask];
    onUpdateProject({ ...project, tasks: updatedTasks });
    setTasksByStatus(groupTasksByStatus(updatedTasks));
  };

  const handleMoveTask = (taskId: string, newStatus: TaskStatus) => {
    const updatedTasks = project.tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    onUpdateProject({ ...project, tasks: updatedTasks });
    setTasksByStatus(groupTasksByStatus(updatedTasks));
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = project.tasks.filter((task) => task.id !== taskId);
    onUpdateProject({ ...project, tasks: updatedTasks });
    setTasksByStatus(groupTasksByStatus(updatedTasks));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
      <p className="mb-4">Team: {project.team?.name || 'No team assigned'}</p>

      <div className="flex gap-4 overflow-x-auto justify-center">
        {Object.values(TaskStatus).map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasksByStatus[status] || []}
            onMoveTask={handleMoveTask}
            onDeleteTask={handleDeleteTask}
            onCreateTask={handleCreateTask}
            color="blue"
          />
        ))}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Create Task
      </button>

      <TaskCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateTask={handleCreateTask}
      />
    </div>
  );
};

export default ProjectBoard;