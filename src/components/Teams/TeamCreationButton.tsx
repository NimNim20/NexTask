import React, { useState } from 'react';
import TeamCreationModal from './TeamsCreationModal';

const TeamCreationButton: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button
                onClick={handleOpenModal}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Create Team
            </button>
            {isModalOpen && <TeamCreationModal onClose={handleCloseModal} />}
        </div>
    );
};

export default TeamCreationButton;