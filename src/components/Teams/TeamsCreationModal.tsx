// TeamsCreationModal.tsx
import React, { useState } from 'react';
import { db, auth, serverTimestamp } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

interface TeamsCreationModalProps {
    onClose: () => void; // Add the onClose prop here
}

const TeamsCreationModal: React.FC<TeamsCreationModalProps> = ({ onClose }) => {
    const [teamName, setTeamName] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const currentUser = auth.currentUser;

    const handleCreateTeam = async () => {
        if (!currentUser) {
            setError('You must be logged in to create a team.');
            return;
        }

        try {
            const newTeam = {
                name: teamName,
                createdBy: currentUser.uid,
                createdAt: serverTimestamp(),
            };

            const docRef = await addDoc(collection(db, 'teams'), newTeam);

            console.log('Document written with ID: ', docRef.id);
            setIsSuccess(true);
            setTeamName('');
            setError('');
        } catch (e) {
            console.error('Error adding document: ', e);
            setError('Failed to create team.');
            setIsSuccess(false);
        }
    };

    return (
        <div>
            <h2>Create Team</h2>
            <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Team Name"
            />
            <button onClick={handleCreateTeam}>Create Team</button>

            {isSuccess && <div className="bg-green-500 text-white p-2">Team "{teamName}" created successfully!</div>}
            {error && <div className="bg-red-500 text-white p-2">{error}</div>}

            <button onClick={onClose}>Close</button> {/* Add a button to trigger onClose */}
        </div>
    );
};

export default TeamsCreationModal;
