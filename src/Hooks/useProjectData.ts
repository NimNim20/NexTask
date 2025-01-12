// hooks/useProjectData.ts
import { useState, useEffect } from 'react';
import { db } from '../components/config/firebase';
import { Task, TaskStatus } from '../types/projectsTypes';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';

const useProjectData = (projectId: string) => {
    const [tasksByStatus, setTasksByStatus] = useState<Record<TaskStatus, Task[]>>({
        [TaskStatus.Backlog]: [],
        [TaskStatus.NotStarted]: [],
        [TaskStatus.PickedForDevelopment]: [],
        [TaskStatus.InProgress]: [],
        [TaskStatus.InReview]: [],
        [TaskStatus.Done]: [],
    });
    const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
    const [team, setTeam] = useState<{ id: string; name: string } | null>(null);

    useEffect(() => {
        const fetchProjectData = async () => {
            // Fetch project data
            const projectDoc = doc(db, 'projects', projectId);
            const projectSnapshot = await getDoc(projectDoc);
            if (projectSnapshot.exists()) {
                const projectData = projectSnapshot.data();

                // Fetch team data
                if (projectData.teamId) {
                    const teamDoc = doc(db, 'teams', projectData.teamId);
                    const teamSnapshot = await getDoc(teamDoc);
                    if (teamSnapshot.exists()) {
                        setTeam(teamSnapshot.data() as { id: string; name: string });
                    }
                }

                // Fetch tasks
                const tasksQuery = query(collection(db, 'tasks'), where('projectId', '==', projectId));
                const tasksSnapshot = await getDocs(tasksQuery);
                const tasks = tasksSnapshot.docs.map(doc => ({
                    ...(doc.data() as Task),
                    id: doc.id,
                }));

                const groupedTasks = tasks.reduce((acc, task) => {
                    (acc[task.status as TaskStatus] = acc[task.status as TaskStatus] || []).push(task);
                    return acc;
                }, {} as Record<TaskStatus, Task[]>);

                setTasksByStatus(groupedTasks);

                // Fetch users
                const usersQuery = query(collection(db, 'users'));
                const usersSnapshot = await getDocs(usersQuery);
                const usersList = usersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name,
                }));
                setUsers(usersList);
            }
        };

        fetchProjectData();
    }, [projectId]);

    return { tasksByStatus, users, team };
};

export default useProjectData;
