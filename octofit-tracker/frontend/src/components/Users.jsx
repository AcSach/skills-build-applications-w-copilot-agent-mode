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
  }, [apiEndpoint]);

  return (
    <div>
      <h2>Users</h2>
      {loading ? <p>Loading...</p> : <pre>{JSON.stringify(users, null, 2)}</pre>}
    </div>
  );
};

export default Users;
