import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await fetchCollection('activities', 'activities');
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
