import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiEndpoint = 'https://-8000.app.github.dev/api/teams';

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div>Loading teams...</div>;

  return (
    <div className="teams-container">
      <h2>Teams</h2>
      <div className="teams-grid">
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team.id} className="team-card">
              <h3>{team.name}</h3>
              <p>Members: {team.memberCount}</p>
              <p>{team.description}</p>
            </div>
          ))
        ) : (
          <p>No teams found.</p>
        )}
      </div>
    </div>
  );
};

export default Teams;
