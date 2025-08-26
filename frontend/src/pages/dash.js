import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AttendanceForm from '../components/attendanceForm';
import { Link } from 'react-router-dom';


function Dashboard() {
  const [attendance, setAttendance] = useState([]);
  const [users, setUsers] = useState([]);
   const [today, setToday] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5001/attendance')
      .then(res => setAttendance(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:5001/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
      
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setToday(new Date().toLocaleDateString(undefined, options));
  }, []);
  return (
    <div style={{ backgroundColor: 'white'}}>
      <h1 
        style={{
          color: "white", 
          backgroundColor: 'red'

      }}
      >CMU Women's Volleyball Club Attendance</h1>
      <h2>{today}</h2>
      <Link 
        to="/summary" 
        style={{
          color: 'white',           
          backgroundColor: 'blue',
          padding: '8px 20px',    
          borderRadius: '8px',      
          textDecoration: 'none',   
          fontWeight: 'bold',      
          display: 'inline-block', 
          marginBottom: '20px',   
        }}>Go to Summary</Link>
      <Link 
        to="/edit-db" 
        style={{
          color: 'white',           
          backgroundColor: 'blue',
          padding: '8px 20px',    
          borderRadius: '8px',      
          textDecoration: 'none',   
          fontWeight: 'bold',      
          display: 'inline-block', 
          marginBottom: '20px',  
          marginLeft: '20px',  
        }}>Add/Remove</Link>
      <AttendanceForm />
       
      <h3> Notes </h3>
      <text> - Brooke has class on Monday and cannot come.</text>
    </div>
  );
}

export default Dashboard;

