import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Edit() {

    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState("");
    const [today, setToday] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    //getting user from database
    const fetchUsers = async () => {
        try {
        const res = await axios.get("http://localhost:5001/users");
        setUsers(res.data);
        } catch (err) {
        console.error(err);
        }
    };
    //adding user
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
    // deleting user
    const handleDelete = async (id) => {
        try {
        await axios.delete(`http://localhost:5001/users/${id}`);
        fetchUsers();
        } catch (err) {
        console.error(err);
        }
    };
    useEffect(() => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setToday(new Date().toLocaleDateString(undefined, options));
    }, []);
  return (
    <div style={{ backgroundColor: '#FCF7F8'}}>
    <center><h1 
        style={{
          color: "#FCF7F8", 
          backgroundColor: '#A31621', 
          padding: '20px',
          margin: '0%',
      }}
      >CMU Women's Volleyball Club Attendance</h1></center>
      <h1 style={{ marginLeft: '40px' }} >Attendance Roster</h1>
      <h2 style ={{
        color: '#4E8098',
        display: 'inline-block',
        paddingRight: '8px',
        marginLeft: '40px' }}
        >{today}</h2>
     <Link to="/dash"
     style={{
          color: 'white',           
          backgroundColor: '#90C2E7',
          padding: '8px 20px',    
          borderRadius: '8px',      
          textDecoration: 'none',   
          fontWeight: 'bold',      
          display: 'inline-block', 
          marginBottom: '20px' 
        }}>Home</Link>
      {/* Add user form */}
      <form onSubmit={handleAdd} style={{ marginBottom: "20px" }}>
        <center><input
          type="text"
          placeholder="Enter name"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          required
          style={{borderRadius:'8px'}}
        />
        <button type="submit" style={{ marginLeft: "10px", borderRadius:'8px', color: '#4E8098' }}>
          Add
        </button></center>
      </form>
        <table style={{
            width: '60%',
            margin: '15px auto',
            border: '2px solid #4E8098',   
            borderRadius: '12px',       
            overflow: 'hidden' 
            }}>
        <thead>
            <tr>
            <th
                style={{
                padding: '8px',
                borderBottom: '1px solid #90C2E7',
                borderRight: '1px solid #90C2E7'
                }}
            >
                Name
            </th>
            <th
                style={{
                padding: '8px',
                borderBottom: '1px solid #90C2E7'
                }}
            >
                Remove
            </th>
            </tr>
        </thead>
        <tbody>
            {users.map((u, rowIndex) => {
            const isLastRow = rowIndex === users.length - 1;
            return (
                <tr key={u.id}>
                <td
                    style={{
                    padding: '8px',
                    borderRight: '1px solid #90C2E7',
                    borderBottom: isLastRow ? 'none' : '1px solid #90C2E7'
                    }}
                >
                    {u.name}
                </td>
                <td
                    style={{
                    padding: '8px',
                    borderBottom: isLastRow ? 'none' : '1px solid #90C2E7'
                    }}
                >
                    <center><button
                    onClick={() => handleDelete(u.id)}
                    style={{
                        color: '#FCF7F8',
                        background: '#A31621',
                        borderRadius: '12px',
                        padding: '5px 10px',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                    >
                    Remove
                    </button></center>
                </td>
                </tr>
            );
            })}
        </tbody>
        </table>

    </div>
  );
}

export default Edit;