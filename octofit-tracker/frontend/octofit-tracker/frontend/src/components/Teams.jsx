import { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.teams || payload.results || payload.items || [];
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) return <div>Loading teams...</div>;

  return (
    <div className="card-grid">
      <h2>Teams</h2>
      {teams.length > 0 ? (
        teams.map((team, index) => (
          <div key={team._id || `${team.name}-${index}`} className="card-item">
            <h3>{team.name}</h3>
            <p>School: {team.school}</p>
            <p>Points: {team.points}</p>
            <p>Members: {team.members?.join(', ') || 'No members listed'}</p>
          </div>
        ))
      ) : (
        <p>No teams found.</p>
      )}
    </div>
  );
};

export default Teams;
