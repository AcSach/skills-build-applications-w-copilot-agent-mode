import React, { useState, useEffect } from 'react';

// Activities component for displaying user activities
const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiEndpoint = 'https://-8000.app.github.dev/api/activities';

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div>Loading activities...</div>;

  return (
    <div className="activities-container">
      <h2>Activities</h2>
      <div className="activities-list">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <h3>{activity.name}</h3>
              <p>{activity.description}</p>
            </div>
          ))
        ) : (
          <p>No activities found.</p>
        )}
      </div>
    </div>
  );
};

export default Activities;
