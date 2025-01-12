import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Team } from '../../types/projectsTypes';

const TeamShow: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const db = getFirestore();
                const snapshot = await getDocs(collection(db, 'teams'));
                const teamsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Team[];
                setTeams(teamsData);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        fetchTeams();
    }, []);

    return (
        <div>
            <h1>Teams</h1>
            <ul>
                {teams.map((team) => (
                    <li key={team.id}>
                        {team.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeamShow;