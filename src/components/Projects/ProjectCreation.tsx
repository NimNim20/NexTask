import React, { useState } from 'react';
import { Project, Team } from '../../utils/projectsTypes';

interface ProjectCreationProps {
  onCreateProject: (newProject: Project) => void;
  teams: Team[];  // Add the teams prop
}

const ProjectCreation: React.FC<ProjectCreationProps> = ({ onCreateProject, teams }) => {
  const [projectName, setProjectName] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');  // Store the selected team id

  const handleCreate = () => {
    if (projectName.trim() && selectedTeamId) {
      const team = teams.find((t) => t.id === selectedTeamId);  // Find the team by id
      if (team) {
        const newProject: Project = {
          id: Date.now().toString(),
          name: projectName,
          team: team,  // Assign the team object
          tasks: [],
        };
        onCreateProject(newProject);
        setProjectName('');
        setSelectedTeamId('');
      }
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
      <select
        value={selectedTeamId}
        onChange={(e) => setSelectedTeamId(e.target.value)}
        className="p-2 mb-2 border rounded"
      >
        <option value="">Select Team</option>
        {teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>
      <button onClick={handleCreate} className="bg-blue-500 text-white p-2 rounded">
        Create Project
      </button>
    </div>
  );
};

export default ProjectCreation;
