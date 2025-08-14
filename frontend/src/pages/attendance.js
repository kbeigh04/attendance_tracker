import React from 'react';
import AttendanceForm from '../components/attendanceForm';
import AttendanceTable from '../components/attendanceTable';
import { Link } from 'react-router-dom';

function Attendance() {
  return (
    <div>
      <h1>Attendance</h1>
      <AttendanceForm />
      <AttendanceTable />
      <Link to="/dash">Go to Dashboard</Link>
    </div>
  );
}

export default Attendance;
