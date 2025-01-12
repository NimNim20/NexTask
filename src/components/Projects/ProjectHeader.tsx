// components/ProjectHeader.tsx
import React from 'react';

interface ProjectHeaderProps {
    teamName: string | null;
    projectId: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ teamName, projectId }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{teamName || 'No Team'}</h2>
            <p className="mb-4">Project ID: {projectId}</p>
        </div>
    );
};

export default ProjectHeader;
