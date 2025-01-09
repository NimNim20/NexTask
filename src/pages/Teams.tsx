import React, { useState } from 'react';

interface Team {
  id: number;
  name: string;
}

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([
    { id: 1, name: 'Development' },
    { id: 2, name: 'Design' },
    { id: 3, name: 'Marketing' },
  ]);
  const [newTeamName, setNewTeamName] = useState('');

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTeamName.trim()) {
      const newTeam: Team = {
        id: Date.now(),
        name: newTeamName.trim(),
      };
      setTeams([...teams, newTeam]);
      setNewTeamName('');
    }
  };

  const handleDeleteTeam = (id: number) => {
    setTeams(teams.filter(team => team.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Teams</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Team</h2>
        <form onSubmit={handleCreateTeam} className="flex gap-2">
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
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Existing Teams</h2>
        {teams.length === 0 ? (
          <p className="text-gray-500">No teams created yet.</p>
        ) : (
          <ul className="space-y-2">
            {teams.map(team => (
              <li key={team.id} className="flex items-center justify-between bg-slate-800 p-4 rounded-md shadow">
                <span className="text-lg">{team.name}</span>
                <button
                  onClick={() => handleDeleteTeam(team.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Teams;
