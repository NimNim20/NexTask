import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../components/config/firebase';
import { Project } from '../types/project';
import { Task } from '../types/task';
import { TaskStatus } from '../types/enums';
import { User } from '../types/user';
import { Team } from '../types/team';

interface UseProjectData {
    tasksByStatus: Record<TaskStatus, Task[]>;
    users: User[];
    team: Team | null;
    project: Project | null;
}

const useProjectData = (projectId: string): UseProjectData => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [team, setTeam] = useState<Team | null>(null);
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        const projectRef = doc(db, 'projects', projectId);
        const unsubscribeProject = onSnapshot(projectRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                setProject({ ...(docSnapshot.data() as Project), id: docSnapshot.id });
            }
        });

        const tasksRef = collection(db, 'tasks');
        const q = query(tasksRef, where('projectId', '==', projectId));
        const unsubscribeTasks = onSnapshot(q, (querySnapshot) => {
            const tasks: Task[] = querySnapshot.docs.map((taskDoc) => ({
                ...(taskDoc.data() as Task),
                id: taskDoc.id,
            }));
            setTasks(tasks);
        });

        return () => {
            unsubscribeProject();
            unsubscribeTasks();
        };
    }, [projectId]);

    useEffect(() => {
        if (project?.teamId) {
            const teamRef = doc(db, 'teams', project.teamId);
            const unsubscribeTeam = onSnapshot(teamRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    setTeam({ ...(docSnapshot.data() as Team), id: docSnapshot.id });
                }
            });

            return () => unsubscribeTeam();
        }
    }, [project?.teamId]);

    useEffect(() => {
        const usersRef = collection(db, 'users');
        const unsubscribeUsers = onSnapshot(usersRef, (querySnapshot) => {
            const users: User[] = querySnapshot.docs.map((userDoc) => ({
                ...(userDoc.data() as User),
                id: userDoc.id,
            }));
            setUsers(users);
        });

        return () => unsubscribeUsers();
    }, []);

    const tasksByStatus: Record<TaskStatus, Task[]> = tasks.reduce((acc, task) => {
        if (!acc[task.status]) acc[task.status] = [];
        acc[task.status].push(task);
        return acc;
    }, {} as Record<TaskStatus, Task[]>);

    return { tasksByStatus, users, team, project };
};

export default useProjectData;
