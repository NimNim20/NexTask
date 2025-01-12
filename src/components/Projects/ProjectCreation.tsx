import React, { useState } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { Project, Team } from '../../types/projectsTypes';

interface ProjectCreationProps {
  onCreateProject: (newProject: Project) => void;
  teams: Team[];
}

const ProjectCreation: React.FC<ProjectCreationProps> = ({ onCreateProject, teams }) => {
  const [projectName, setProjectName] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');
  
  const handleCreate = async () => {
    if (projectName.trim() && selectedTeamId) {
      const team = teams.find((t) => t.id === selectedTeamId);
      if (team) {
        const newProject: Project = {
          id: Date.now().toString(),
          name: projectName,
          team: team,
          tasks: [],
        };

        try {
          const docRef = await addDoc(collection(db, 'projects'), newProject);
          onCreateProject({ ...newProject, id: docRef.id });
          setProjectName('');
          setSelectedTeamId('');
        } catch (error) {
          console.error('Error adding document: ', error);
        }
      }
    }
  };

  const handleDelete = async (projectId: string) => {
    try {
      const projectRef = doc(db, 'projects', projectId);
      await deleteDoc(projectRef);
      console.log('Project deleted successfully!');
    } catch (error) {
      console.error('Error deleting project: ', error);
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
      
      {/* This button is for testing project deletion */}
      {/* You will need to pass the projectId for the project you want to delete */}
      <button 
        onClick={() => handleDelete('some_project_id')}
        className="bg-red-500 text-white p-2 rounded mt-2"
      >
        Delete Project
      </button>
    </div>
  );
};

export default ProjectCreation;
