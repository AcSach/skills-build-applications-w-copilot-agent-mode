import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await fetchCollection('leaderboard', 'leaderboard');
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
