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
  }, []);

  if (loading) return <div>Loading activities...</div>;

  return (
    <div className="card-grid">
      <h2>Activities</h2>
      {activities.length > 0 ? (
        activities.map((activity, index) => (
          <div key={activity._id || `${activity.type}-${index}`} className="card-item">
            <h3>{activity.type}</h3>
            <p>{activity.userName}</p>
            <p>Duration: {activity.durationMinutes} minutes</p>
            <p>Points: {activity.points}</p>
          </div>
        ))
      ) : (
        <p>No activities found.</p>
      )}
    </div>
  );
};

export default Activities;
