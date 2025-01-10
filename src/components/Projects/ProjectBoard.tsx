import React, { useState } from 'react';

import { Task, TaskStatus, TaskPriority, Project } from '../../utils/projectsTypes';
import TaskColumn from '../Tasks/TaskColumn';



interface ProjectBoardProps {
  project: Project;
  onUpdateProject: (updatedProject: Project) => void;
}

const groupTasksByStatus = (tasks: Task[]): Record<TaskStatus, Task[]> => {
  return tasks.reduce((acc, task) => {
    (acc[task.status] = acc[task.status] || []).push(task);
    return acc;
  }, {} as Record<TaskStatus, Task[]>);
};


const ProjectBoard: React.FC<ProjectBoardProps> = ({ project, onUpdateProject }) => {
  const [tasksByStatus, setTasksByStatus] = useState(groupTasksByStatus(project.tasks));

  const statusColors: Record<TaskStatus, string> = {
    [TaskStatus.Backlog]: 'bg-gray-200',
    [TaskStatus.NotStarted]: 'bg-blue-200',
    [TaskStatus.PickedForDevelopment]: 'bg-yellow-200',
    [TaskStatus.InProgress]: 'bg-purple-200',
    [TaskStatus.InReview]: 'bg-green-200',
    [TaskStatus.Done]: 'bg-teal-200',
  };

  const handleCreateTask = (status: TaskStatus, title: string, description: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      priority: TaskPriority.Medium,
      assignee: null,
      status,
    };

    const updatedTasks = [...project.tasks, newTask];
    onUpdateProject({ ...project, tasks: updatedTasks });
    setTasksByStatus(groupTasksByStatus(updatedTasks));
  };

  const handleMoveTask = (taskId: number, newStatus: TaskStatus) => {
    const updatedTasks: Task[] = project.tasks.map((task: Task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
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
            onCreateTask={handleCreateTask}
            color={statusColors[status]}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectBoard;