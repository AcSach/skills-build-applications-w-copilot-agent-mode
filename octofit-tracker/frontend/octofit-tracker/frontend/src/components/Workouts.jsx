import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await fetchCollection('workouts/', 'workouts');
        setWorkouts(data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  if (loading) return <div>Loading workouts...</div>;

  return (
    <div className="card-grid">
      <h2>Workouts</h2>
      {workouts.length > 0 ? (
        workouts.map((workout, index) => (
          <div key={workout._id || `${workout.name}-${index}`} className="card-item">
            <h3>{workout.name}</h3>
            <p>Category: {workout.category}</p>
            <p>Difficulty: {workout.difficulty}</p>
            <p>Duration: {workout.durationMinutes} minutes</p>
            <p>{workout.description}</p>
          </div>
        ))
      ) : (
        <p>No workouts found.</p>
      )}
    </div>
  );
};

export default Workouts;
