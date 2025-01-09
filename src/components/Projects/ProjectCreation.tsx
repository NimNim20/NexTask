import React, { useState } from 'react';
import { Project, Team } from '../../utils/projectsTypes';

interface ProjectCreationProps {
  onCreateProject: (project: Project) => void;
}

const ProjectCreation: React.FC<ProjectCreationProps> = ({ onCreateProject }) => {
  const [projectName, setProjectName] = useState<string>('');
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');

  const teams: Team[] = [
    { id: 1, name: 'Development' },
    { id: 2, name: 'Design' },
    { id: 3, name: 'Marketing' },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (projectName.trim()) {
      const newProject: Project = {
        id: Date.now(),
        name: projectName.trim(),
        team: teams.find(t => t.id === parseInt(selectedTeamId)) || null,
        tasks: [],
      };
      onCreateProject(newProject);
      setProjectName('');
      setSelectedTeamId('');
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={projectName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)}
          placeholder="Enter project name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedTeamId}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedTeamId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Team</option>
          {teams.map(team => (
            <option key={team.id} value={team.id.toString()}>{team.name}</option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default ProjectCreation;

