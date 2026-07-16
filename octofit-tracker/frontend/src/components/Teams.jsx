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
  }, [apiEndpoint]);

  return (
    <div>
      <h2>Teams</h2>
      {loading ? <p>Loading...</p> : <pre>{JSON.stringify(teams, null, 2)}</pre>}
    </div>
  );
};

export default Teams;
