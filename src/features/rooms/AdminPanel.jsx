import { useState, useEffect } from "react";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    const token = sessionStorage.getItem("token");
    const response = await fetch("http://localhost:3000/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
  
    const result = await response.json();
    console.log(result);
    setUsers(result.users); // Update to access users array from response
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;

