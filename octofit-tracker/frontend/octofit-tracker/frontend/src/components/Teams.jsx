import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await fetchCollection('teams', 'teams');
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
