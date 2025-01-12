import React, { useState, useEffect } from 'react';
import { addDoc, deleteDoc, doc, updateDoc, collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Project, Task, TaskStatus, TaskPriority } from '../../types/projectsTypes';
import TaskColumn from '../Tasks/TaskColumn';
import TaskCreationModal from '../Modals/TaskCreationModal';

interface ProjectBoardProps {
  projectId: string;
  onUpdateProject: (updatedProject: Project) => void;
}

const ProjectBoard: React.FC<ProjectBoardProps> = ({ projectId, onUpdateProject }) => {
  const [tasksByStatus, setTasksByStatus] = useState<Record<TaskStatus, Task[]>>({
    [TaskStatus.Backlog]: [],
    [TaskStatus.NotStarted]: [],
    [TaskStatus.PickedForDevelopment]: [],
    [TaskStatus.InProgress]: [],
    [TaskStatus.InReview]: [],
    [TaskStatus.Done]: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [team, setTeam] = useState<{ id: string; name: string } | null>(null);

  // Fetch project data, tasks, and users
  useEffect(() => {
    const fetchProjectData = async () => {
      const projectDoc = doc(db, 'projects', projectId);
      const projectSnapshot = await getDoc(projectDoc);
      if (projectSnapshot.exists()) {
        const projectData = projectSnapshot.data();
        onUpdateProject(projectData as Project);

        if (projectData.teamId) {
          const teamDoc = doc(db, 'teams', projectData.teamId);
          const teamSnapshot = await getDoc(teamDoc);
          if (teamSnapshot.exists()) {
            setTeam(teamSnapshot.data() as { id: string; name: string });
          }
        }

        const tasksQuery = query(collection(db, 'tasks'), where('projectId', '==', projectId));
        const tasksSnapshot = await getDocs(tasksQuery);
        const tasks = tasksSnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          priority: doc.data().priority,
          status: doc.data().status,
          assignee: doc.data().assignee,
          projectId: doc.data().projectId,
        }));
        const groupedTasks = groupTasksByStatus(tasks);
        setTasksByStatus(groupedTasks);

        // Fetch users
        const usersQuery = query(collection(db, 'users'));
        const usersSnapshot = await getDocs(usersQuery);
        const usersList = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setUsers(usersList);
      }
    };
    fetchProjectData();
  }, [projectId, onUpdateProject]);

  const groupTasksByStatus = (tasks: Task[]): Record<TaskStatus, Task[]> => {
    return tasks.reduce((acc, task) => {
      (acc[task.status] = acc[task.status] || []).push(task);
      return acc;
    }, {} as Record<TaskStatus, Task[]>);
  };

  const handleCreateTask = async (title: string, description: string, status: string) => {
    const newTask: Omit<Task, 'id'> = {
      title,
      description,
      priority: TaskPriority.Medium,
      status: status as TaskStatus,
      assignee: null,
      projectId: projectId,
    };

    const taskRef = await addDoc(collection(db, 'tasks'), newTask);

    const updatedTasks = [...(tasksByStatus[status as TaskStatus] || []), { ...newTask, id: taskRef.id }];
    setTasksByStatus(groupTasksByStatus(updatedTasks));

    onUpdateProject((prevProject: Project) => {
      const updatedProject = {
        ...prevProject,
        tasks: [...prevProject.tasks, { ...newTask, id: taskRef.id }],
      };
      return updatedProject as Project;
    });
  };

  const handleMoveTask = async (taskId: string, newStatus: TaskStatus) => {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, { status: newStatus });

    const updatedTasks = Object.values(tasksByStatus).flat().map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasksByStatus(groupTasksByStatus(updatedTasks));
  };

  const handleDeleteTask = async (taskId: string) => {
    const taskRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskRef);

    const updatedTasks = Object.values(tasksByStatus)
      .flat()
      .filter((task) => task.id !== taskId);
    setTasksByStatus(groupTasksByStatus(updatedTasks));
  };

  const handleAssignTask = async (taskId: string, userId: string) => {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, { assignee: userId });
  }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{team?.name || 'No Team'}</h2>
      <p className="mb-4">Project ID: {projectId}</p>

      <div className="flex gap-4 overflow-x-auto justify-center">
        {Object.values(TaskStatus).map((status) => (
          <TaskColumn
            key={status}
            title={status}
            tasks={tasksByStatus[status] || []}
            onMoveTask={handleMoveTask}
            onDeleteTask={handleDeleteTask}
            onCreateTask={handleCreateTask}
            onAssignTask={handleAssignTask}
            users={users}
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
