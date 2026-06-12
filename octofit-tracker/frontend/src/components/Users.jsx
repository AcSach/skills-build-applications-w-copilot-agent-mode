import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiEndpoint = 'https://-8000.app.github.dev/api/users';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="users-container">
      <h2>Users</h2>
      <div className="users-list">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="user-item">
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Username: {user.username}</p>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Users;
