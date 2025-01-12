import { useState } from 'react';
import { Project } from '../types/projectsTypes';

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

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

    return {
        projects,
        selectedProject,
        isSidebarVisible,
        handleCreateProject,
        handleSelectProject,
        handleUpdateProject,
        toggleSidebar,
    };
};