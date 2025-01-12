// components/Projects/ProjectCreation.tsx
import React, { useState } from 'react';
import { Project } from '../../utils/projectsTypes';

interface ProjectCreationProps {
  onCreateProject: (newProject: Project) => void;
}

const ProjectCreation: React.FC<ProjectCreationProps> = ({ onCreateProject }) => {
  const [projectName, setProjectName] = useState('');

  const handleCreate = () => {
    if (projectName.trim()) {
      const newProject: Project = {
        id: Date.now().toString(),
        name: projectName,
        team: null,
        tasks: [],
      };
      onCreateProject(newProject);
      setProjectName('');
    }
  };

  return (
    <div>
      <h3>Create New Project</h3>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Project name"
        className="p-2 mb-2 border rounded"
      />
      <button onClick={handleCreate} className="bg-blue-500 text-white p-2 rounded">
        Create Project
      </button>
    </div>
  );
};

export default ProjectCreation;
