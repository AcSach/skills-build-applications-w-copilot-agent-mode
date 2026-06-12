import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiEndpoint = 'https://-8000.app.github.dev/api/workouts';

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div>Loading workouts...</div>;

  return (
    <div className="workouts-container">
      <h2>Workouts</h2>
      <div className="workouts-list">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <div key={workout.id} className="workout-item">
              <h3>{workout.title}</h3>
              <p>Duration: {workout.duration} minutes</p>
              <p>Type: {workout.type}</p>
              <p>{workout.description}</p>
            </div>
          ))
        ) : (
          <p>No workouts found.</p>
        )}
      </div>
    </div>
  );
};

export default Workouts;
