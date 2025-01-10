import React from 'react';
import { Project } from '../../utils/projectsTypes';

interface ProjectListProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  selectedProject: Project | null;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelectProject, selectedProject }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Projects</h2>
      <div className="space-y-4">
        {projects.map(project => (
          <div
            key={project.id}
            className={`p-4 rounded-lg shadow-md transition-all cursor-pointer border ${
              selectedProject?.id === project.id
                ? 'bg-blue-100 border-white-900 shadow-lg'
                : 'bg-white border-gray-300 hover:shadow-lg hover:bg-gray-50'
            }`}
            onClick={() => onSelectProject(project)}
          >
            <h3 className="font-semibold text-lg mb-1 text-black">{project.name}</h3>
            <p className="text-sm text-gray-600">{project.team?.name || 'No team assigned'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
