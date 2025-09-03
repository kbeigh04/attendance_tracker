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
    <div style={{ backgroundColor: '#FCF7F8'}}>
      <center><h1 
        style={{
          color: "#FCF7F8", 
          backgroundColor: '#A31621', 
          padding: '20px',
          margin: '0%',

      }}
      >CMU Women's Volleyball Club Attendance</h1></center>
    <h1 style={{ marginLeft: '40px' }} >Attendance Form</h1>
     <h2 style ={{
        color: '#4E8098',
        display: 'inline-block',
        paddingRight: '8px',
        marginLeft: '40px ' }}
        >{today}</h2>
      <Link 
        to="/summary" 
        style={{
          color: 'white',           
          backgroundColor: '#90C2E7',
          padding: '8px 20px',    
          borderRadius: '8px',      
          textDecoration: 'none',   
          fontWeight: 'bold',      
          display: 'inline-block', 
          marginBottom: '20px',   
        }}>Summary</Link>
      <Link 
        to="/edit-db" 
        style={{
          color: 'white',           
          backgroundColor: '#90C2E7',
          padding: '8px 20px',    
          borderRadius: '8px',      
          textDecoration: 'none',   
          fontWeight: 'bold',      
          display: 'inline-block', 
          marginBottom: '20px',  
          marginLeft: '20px',  
        }}>Roster</Link>
      <AttendanceForm />
       
     <h3 style={{ marginLeft: '40px' }}>Notes</h3>
      <p style={{ marginLeft: '40px' }}>- Monday Class: Brooke, Bella, Aria</p>
      <p style={{ marginLeft: '40px' }}>- Shakia won't be back till 11/9</p>


    </div>
  );
}

export default Dashboard;

