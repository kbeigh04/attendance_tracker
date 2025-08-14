import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SummaryForm from '../components/summaryForm';
import UserList from '../components/userList';
import { Link } from 'react-router-dom';


function Dashboard() {
  const [attendance, setAttendance] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/attendance')
      .then(res => setAttendance(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:5001/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const presentCount = attendance.filter(a => a.status === 'present').length;
  const lateCount = attendance.filter(a => a.status === 'late').length;
  const absentCount = attendance.filter(a => a.status === 'absent').length;

  return (
    <div>
      <h1>Dashboard</h1>

      <div style={{ display: 'flex', gap: '10px' }}>
        <SummaryForm title="Present Today" value={presentCount} />
        <SummaryForm title="Late Today" value={lateCount} />
        <SummaryForm title="Absent Today" value={absentCount} />
      </div>

      <h2>User List</h2>
      <UserList users={users} />
       <Link to="/attendance">Go to Attendance</Link>

    </div>
  );
}

export default Dashboard;

