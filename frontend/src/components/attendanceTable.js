import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AttendanceTable() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/attendance')
      .then((res) => setRecords(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>User ID</th>
          <th>Date</th>
          <th>Status</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {records.map((r) => (
          <tr key={r.id}>
            <td>{r.user_id}</td>
            <td>{r.date}</td>
            <td>{r.status}</td>
            <td>{r.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AttendanceTable;
