import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchCollection('users', 'users');
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="card-grid">
      <h2>Users</h2>
      {users.length > 0 ? (
        users.map((user, index) => (
          <div key={user._id || `${user.name}-${index}`} className="card-item">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Grade: {user.gradeLevel}</p>
            <p>Favorite activity: {user.favoriteActivity}</p>
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Users;
