import React, { useState } from 'react';
import axios from 'axios';

function AttendanceForm() {
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState('present');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/attendance', {
        user_id: userId,
        date: new Date().toISOString().split('T')[0], // today
        status,
        notes: ''
      });
      alert('Attendance marked!');
      setUserId('');
      setStatus('present');
    } catch (err) {
      console.error(err);
      alert('Error marking attendance');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="present">Present</option>
        <option value="late">Late</option>
        <option value="absent">Absent</option>
      </select>
      <button type="submit">Mark Attendance</button>
    </form>
  );
}

export default AttendanceForm;
