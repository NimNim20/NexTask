import { addDoc, updateDoc, deleteDoc, doc, collection } from 'firebase/firestore';
import { db } from '../components/config/firebase';
import { Project } from '../types/project';
import { Task } from '../types/task';
import { TaskStatus } from '../types/enums';

export const useTaskActions = (onUpdateProject: (updatedProject: Project) => void) => {
    const createTask = async (task: Omit<Task, 'id'>, prevProject: Project): Promise<void> => {
        const taskRef = await addDoc(collection(db, 'tasks'), task);

        const updatedProject: Project = {
            ...prevProject,
            tasks: [...prevProject.tasks, { ...task, id: taskRef.id }],
            id: prevProject.id,
            name: prevProject.name,
            team: prevProject.team,
            teamId: prevProject.teamId,
            createdAt: prevProject.createdAt,
        };

        onUpdateProject(updatedProject);
    };

    const moveTask = async (taskId: string, newStatus: TaskStatus): Promise<void> => {
        const taskRef = doc(db, 'tasks', taskId);
        await updateDoc(taskRef, { status: newStatus });
    };

    const deleteTask = async (taskId: string): Promise<void> => {
        const taskRef = doc(db, 'tasks', taskId);
        await deleteDoc(taskRef);
    };

    const assignTask = async (taskId: string, userId: string): Promise<void> => {
        const taskRef = doc(db, 'tasks', taskId);
        await updateDoc(taskRef, { assignee: userId });
    };

    return { createTask, moveTask, deleteTask, assignTask };
};
