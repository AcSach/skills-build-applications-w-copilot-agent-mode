import { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.activities || payload.results || payload.items || [];
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, [apiEndpoint]);

  return (
    <div>
      <h2>Activities</h2>
      {loading ? <p>Loading...</p> : <pre>{JSON.stringify(activities, null, 2)}</pre>}
    </div>
  );
};

export default Activities;
