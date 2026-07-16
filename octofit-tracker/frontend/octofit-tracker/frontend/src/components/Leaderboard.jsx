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
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.length > 0 ? (
            leaderboard.map((entry, index) => (
              <tr key={entry._id || `${entry.name}-${index}`}>
                <td>{entry.rank || index + 1}</td>
                <td>{entry.name}</td>
                <td>{entry.points}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No leaderboard data available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
