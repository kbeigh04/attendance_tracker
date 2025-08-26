import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Summary() {
  const [attendance, setAttendance] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get('http://localhost:5001/attendance');
        setAttendance(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAttendance();
  }, []);

  // Filter based on search
  const filteredAttendance = searchName
    ? attendance.filter(a =>
        a.name.toLowerCase().includes(searchName.toLowerCase())
      )
    : attendance;

  return (
    <div>

      <h1>Attendance Summary</h1>
      <Link to="/dash" style={{
          color: 'white',           
          backgroundColor: 'blue',
          padding: '8px 20px',    
          borderRadius: '8px',      
          textDecoration: 'none',   
          fontWeight: 'bold',      
          display: 'inline-block', 
          marginBottom: '20px', 
          marginRight: '5px'  
        }}>Go to Dashboard</Link>
      <input
        type="text"
        placeholder="Search by name"
        value={searchName}
        onChange={e => setSearchName(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
      />

      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid gray', padding: '5px' }}>Name</th>
            <th style={{ border: '1px solid gray', padding: '5px' }}>Date</th>
            <th style={{ border: '1px solid gray', padding: '5px' }}>Status</th>
            <th style={{ border: '1px solid gray', padding: '5px' }}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendance.map((entry, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid gray', padding: '5px' }}>{entry.name}</td>
              <td style={{ border: '1px solid gray', padding: '5px' }}>{entry.date}</td>
              <td style={{ border: '1px solid gray', padding: '5px' }}>{entry.status}</td>
              <td style={{ border: '1px solid gray', padding: '5px' }}>{entry.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Summary;
