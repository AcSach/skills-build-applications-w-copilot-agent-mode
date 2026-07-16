import { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.leaderboard || payload.results || payload.items || [];
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, [apiEndpoint]);

  return (
    <div>
      <h2>Leaderboard</h2>
      {loading ? <p>Loading...</p> : <pre>{JSON.stringify(leaderboard, null, 2)}</pre>}
    </div>
  );
};

export default Leaderboard;
