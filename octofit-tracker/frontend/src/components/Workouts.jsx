import { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.workouts || payload.results || payload.items || [];
        setWorkouts(data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, [apiEndpoint]);

  return (
    <div>
      <h2>Workouts</h2>
      {loading ? <p>Loading...</p> : <pre>{JSON.stringify(workouts, null, 2)}</pre>}
    </div>
  );
};

export default Workouts;
