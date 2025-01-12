import React, { useState } from 'react';
import { Project, Team } from '../utils/projectsTypes'; 
import ProjectCreation from '../components/Projects/ProjectCreation';
import ProjectList from '../components/Projects/ProjectList';
import ProjectBoard from '../components/Projects/ProjectBoard';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);


  const [teams] = useState<Team[]>([
    { id: '1', name: 'Development' },
    { id: '2', name: 'Design' },
    { id: '3', name: 'Marketing' },
  ]);

  const handleCreateProject = (newProject: Project) => {
    setProjects(prevProjects => [...prevProjects, newProject]);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setIsSidebarVisible(false);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(prevProjects =>
      prevProjects.map(p => p.id === updatedProject.id ? updatedProject : p)
    );
    setSelectedProject(updatedProject);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-slate-800">
      {isSidebarVisible && (
        <div className="w-1/6 bg-white p-4 overflow-y-auto transition-all duration-300 ease-in-out">
          <ProjectCreation onCreateProject={handleCreateProject} teams={teams} />
          <ProjectList
            projects={projects}
            onSelectProject={handleSelectProject}
            selectedProject={selectedProject}
          />
        </div>
      )}
      <div className={`${isSidebarVisible ? 'w-3/4' : 'w-full'} p-4 overflow-y-auto transition-all duration-300 ease-in-out`}>
        {selectedProject ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={toggleSidebar}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isSidebarVisible ? 'Hide Projects' : 'Show Projects'}
              </button>
            </div>
            <ProjectBoard
              project={selectedProject}
              onUpdateProject={handleUpdateProject}
            />
          </>
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
