import React, { useState, useCallback } from 'react';
import { Project } from '../../types/project';
import { useTaskActions } from '../../Hooks/useTaskActions';
import useProjectData from '../../Hooks/useProjectData';
import ProjectHeader from './ProjectHeader';
import TaskList from '../Tasks/TaskList';
import TaskModal from '../Modals/TaskModal';
import { TaskStatus, TaskPriority } from '../../types/enums';
import { Task } from '../../types/task';
import { Timestamp } from 'firebase/firestore';

interface ProjectBoardProps {
  projectId: string;
  onUpdateProject: (updatedProject: Project) => void;
}

const ProjectBoard: React.FC<ProjectBoardProps> = ({ projectId, onUpdateProject }) => {
  const { tasksByStatus, users, team, project } = useProjectData(projectId);
  const { createTask, moveTask, deleteTask, assignTask } = useTaskActions(onUpdateProject);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTask = useCallback(async (title: string, description: string, status: string) => {
    const newTask: Task = {
      id: '',
      title,
      description,
      priority: TaskPriority.Medium,
      status: status as TaskStatus,
      assignee: null,
      projectId,
      dueDate: Timestamp.fromDate(new Date()),
      createdAt: Timestamp.fromDate(new Date()),
      tasks: [],
    };

    if (project) {
      await createTask(newTask, project);
    }
    
    setIsModalOpen(false);
  }, [createTask, projectId, project]);

  return (
    <div>
      <ProjectHeader teamName={team ? team.name : "No Team Assigned"} projectId={projectId} />
      <TaskList
        tasksByStatus={tasksByStatus}
        onMoveTask={moveTask}
        onDeleteTask={deleteTask}
        onAssignTask={assignTask}
        onCreateTask={handleCreateTask}
        users={users}
      />
      <button onClick={() => setIsModalOpen(true)}>Create Task</button>
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateTask={handleCreateTask}
      />
    </div>
  );
};

export default ProjectBoard;
