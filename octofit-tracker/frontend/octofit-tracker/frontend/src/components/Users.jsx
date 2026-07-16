import { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.users || payload.results || payload.items || [];
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
