import React, { useState, useEffect } from 'react';
import { Project } from '../utils/projectsTypes';
import { Team } from '../utils/projectsTypes';
import ProjectCreation from '../components/Projects/ProjectCreation';
import ProjectList from '../components/Projects/ProjectList';
import ProjectBoard from '../components/Projects/ProjectBoard';
import { db, auth } from '../components/config/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeamName, setNewTeamName] = useState('');

  // Fetch teams from Firestore on component mount
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'teams'));
        const teamsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Team, 'id'>),
        }));
        setTeams(teamsData as Team[]);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTeamName.trim()) {
      try {
        const newTeam: Omit<Team, 'id'> = {
          name: newTeamName.trim(),
          createdBy: auth.currentUser?.uid || '',
          createdAt: new Date().toISOString(), 
        };

        const docRef = await addDoc(collection(db, 'teams'), newTeam);
        console.log('Team created with ID:', docRef.id);

        setTeams((prevTeams) => [
          ...prevTeams,
          { id: docRef.id, ...newTeam },
        ]);

        setNewTeamName('');
      } catch (error) {
        console.error('Error creating team:', error);
      }
    }
  };

  const handleCreateProject = (newProject: Project) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setIsSidebarVisible(false);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
    setSelectedProject(updatedProject);
  };


  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-slate-800">
      {isSidebarVisible && (
        <div className="w-1/6 bg-white p-4 overflow-y-auto transition-all duration-300 ease-in-out">
          <h2>Create Team</h2>
          <form onSubmit={handleCreateTeam} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              placeholder="Enter team name"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Team
            </button>
          </form>
          {teams.length === 0 ? (
            <div className="text-gray-500 text-center p-4">
              No teams created yet. Please create a team first.
            </div>
          ) : (
            <>
              <ProjectCreation onCreateProject={handleCreateProject} teams={teams} />
              <ProjectList
                projects={projects}
                onSelectProject={handleSelectProject}
                selectedProject={selectedProject}
              />
            </>
          )}
        </div>
      )}
      <div
        className={`${
          isSidebarVisible ? 'w-3/4' : 'w-full'
        } p-4 overflow-y-auto transition-all duration-300 ease-in-out`}
      >
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
            <ProjectBoard project={selectedProject} onUpdateProject={handleUpdateProject} />
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
