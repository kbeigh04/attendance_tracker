import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Summary() {
  const [attendance, setAttendance] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [today, setToday] = useState("");

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
  useEffect(() => {
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          setToday(new Date().toLocaleDateString(undefined, options));
      }, []);

  return (
    <div style={{backgroundColor: '#FCF7F8'}}>
      <center><h1 
        style={{
          color: "#FCF7F8", 
          backgroundColor: '#A31621', 
          padding: '20px',
          margin: '0%',

      }}
      >CMU Women's Volleyball Club Attendance</h1></center>
      <h1 style={{marginLeft: '40px' }}> Attendance Summary</h1>
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
                marginBottom: '20px',  
        }}>Home</Link>
      <input
        type="text"
        placeholder="Search name"
        value={searchName}
        onChange={e => setSearchName(e.target.value)}
        style={{
           marginBottom: '10px',
           marginLeft: '8px', 
           padding: '5px', 
           width: '200px',
          borderRadius: '8px'}}
      />

      <table style={{ 
        width: '90%',
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
                borderBottom: '1px solid #90C2E7',
                borderRight: '1px solid #90C2E7'
              }}
            >
              Date
            </th>
            <th
              style={{
                padding: '8px',
                borderBottom: '1px solid #90C2E7',
                borderRight: '1px solid #90C2E7'
              }}
            >
              Status
            </th>
            <th
              style={{
                padding: '8px',
                borderBottom: '1px solid #90C2E7'
              }}
            >
              Notes
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendance.map((entry, rowIndex) => {
            const isLastRow = rowIndex === filteredAttendance.length - 1;
            return (
              <tr key={rowIndex}>
                <td
                  style={{
                    padding: '8px',
                    borderRight: '1px solid #90C2E7',
                    borderBottom: isLastRow ? 'none' : '1px solid #90C2E7'
                  }}
                >
                  {entry.name}
                </td>
                <td
                  style={{
                    padding: '8px',
                    borderRight: '1px solid #90C2E7',
                    borderBottom: isLastRow ? 'none' : '1px solid #90C2E7'
                  }}
                >
                  {entry.date}
                </td>
                <td
                  style={{
                    padding: '8px',
                    borderRight: '1px solid #90C2E7',
                    borderBottom: isLastRow ? 'none' : '1px solid #90C2E7'
                  }}
                >
                  {entry.status}
                </td>
                <td
                  style={{
                    padding: '8px',
                    borderBottom: isLastRow ? 'none' : '1px solid #90C2E7'
                  }}
                >
                  {entry.notes}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

    </div>
  );
}

export default Summary;
