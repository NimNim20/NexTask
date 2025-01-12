import React, { useState } from 'react';
import { TaskStatus, Project } from '../../types/projectsTypes';
import { addDoc, updateDoc, doc, deleteDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import useProjectData from '../../Hooks/useProjectData';
import ProjectHeader from './ProjectHeader';
import TaskList from '../Tasks/TaskList';
import TaskModal from '../Modals/TaskModal';

interface ProjectBoardProps {
  projectId: string;
  onUpdateProject: (updatedProject: Project) => void;
}

const ProjectBoard: React.FC<ProjectBoardProps> = ({ projectId, onUpdateProject }) => {
  const { tasksByStatus, users, team } = useProjectData(projectId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTask = async (title: string, description: string, status: string) => {
    const newTask = {
      title,
      description,
      priority: 'Medium',
      status: status as TaskStatus,
      assignee: null,
      projectId: projectId,
    };

    const taskRef = await addDoc(collection(db, 'tasks'), newTask);

    onUpdateProject((prevProject: Project) => ({
      ...prevProject,
      tasks: [...prevProject.tasks, { ...newTask, id: taskRef.id }],
    }));
  };

  const handleMoveTask = async (taskId: string, newStatus: TaskStatus) => {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, { status: newStatus });
  };

  const handleDeleteTask = async (taskId: string) => {
    const taskRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskRef);
  };

  const handleAssignTask = async (taskId: string, userId: string) => {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, { assignee: userId });
  };

  return (
    <div>
      <ProjectHeader teamName={team?.name ?? null} projectId={projectId} />
      <TaskList
        tasksByStatus={tasksByStatus}
        onMoveTask={handleMoveTask}
        onDeleteTask={handleDeleteTask}
        onAssignTask={handleAssignTask}
        onCreateTask={handleCreateTask}
        users={users}
      />
      <button onClick={() => setIsModalOpen(true)}>Create Task</button>
      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreateTask={handleCreateTask} />
    </div>
  );
};

export default ProjectBoard;
