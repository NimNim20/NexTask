function TeamsPage() {
    // Testing of a static list
    const teams = [
      { id: 1, name: "Team Alpha", members: 5 },
      { id: 2, name: "Team Beta", members: 8 },
      { id: 3, name: "Team Gamma", members: 3 },
    ];
  
    return (
      <section className="w-full h-full p-6">
        <h2 className="text-3xl text-slate-800 mb-6">Your Teams</h2>
        <div className="space-y-4">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-white p-4 rounded-lg shadow-md border border-slate-200"
            >
              <h3 className="text-xl text-slate-800">{team.name}</h3>
              <p className="text-slate-600">Members: {team.members}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default TeamsPage;
  