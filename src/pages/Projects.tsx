import React, { useState } from 'react';
import { Project } from '../utils/projectsTypes';
import ProjectCreation from '../components/Projects/ProjectCreation';
import ProjectList from '../components/Projects/ProjectList';
import ProjectBoard from '../components/Projects/ProjectBoard';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleCreateProject = (newProject: Project) => {
    setProjects(prevProjects => [...prevProjects, newProject]);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(prevProjects => 
      prevProjects.map(p => p.id === updatedProject.id ? updatedProject : p)
    );
    setSelectedProject(updatedProject);
  };

  return (
    <div className="flex h-screen bg-slate-800">
      <div className="w-1/4 bg-white bg-opacity-80 p-4 overflow-y-auto">
        <ProjectCreation onCreateProject={handleCreateProject} />
        <ProjectList 
          projects={projects} 
          onSelectProject={handleSelectProject} 
          selectedProject={selectedProject} 
        />
      </div>
      <div className="w-3/4 p-4 overflow-y-auto">
        {selectedProject ? (
          <ProjectBoard 
            project={selectedProject} 
            onUpdateProject={handleUpdateProject} 
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-gray-500">Select a project to view its board</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;

