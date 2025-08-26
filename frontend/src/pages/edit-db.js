import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Edit() {

const [users, setUsers] = useState([]);
const [newUser, setNewUser] = useState("");

useEffect(() => {
    fetchUsers();
  }, []);

const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5001/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/users", { name: newUser });
      setNewUser("");
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
    
      <h1>Attendance Roster</h1>
     <Link to="/dash"
     style={{
          color: 'white',           
          backgroundColor: 'blue',
          padding: '8px 20px',    
          borderRadius: '8px',      
          textDecoration: 'none',   
          fontWeight: 'bold',      
          display: 'inline-block', 
          marginBottom: '20px',   
        }}>Go to Dashboard</Link>
      {/* Add user form */}
      <form onSubmit={handleAdd} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter new user name"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          required
        />
        <button type="submit" style={{ marginLeft: "10px" }}>
          Add User
        </button>
      </form>

      {/* List of users */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>
                <button
                  onClick={() => handleDelete(u.id)}
                  style={{ color: "white", background: "red", borderRadius: "6px" }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Edit;