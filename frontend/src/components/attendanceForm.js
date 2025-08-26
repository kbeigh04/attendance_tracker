import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AttendanceTable() {
  const [users, setUsers] = useState([]);
  const [attendanceData, setAttendanceData] = useState({}); // { userName: { status: '', notes: '' } }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5001/users');
        setUsers(res.data);
        const initData = {};
        res.data.forEach(u => {
          initData[u.name] = { status: '', notes: '' };
        });
        setAttendanceData(initData);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  const handleStatusChange = (userName, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [userName]: { ...prev[userName], status }
    }));
  };

  const handleNotesChange = (userName, notes) => {
    setAttendanceData(prev => ({
      ...prev,
      [userName]: { ...prev[userName], notes }
    }));
  };

  // ✅ New: submit all users at once
  const handleSubmitAll = async () => {
    const entries = Object.entries(attendanceData);
    for (const [userName, entry] of entries) {
      if (!entry.status) {
        alert(`Please select a status for ${userName}`);
        return;
      }
    }

    try {
      await Promise.all(
        entries.map(([userName, entry]) =>
          axios.post('http://localhost:5001/attendance', {
            name: userName,
            date: new Date().toISOString().split('T')[0],
            status: entry.status,
            notes: entry.notes
          })
        )
      );
      alert('All attendance submitted!');
      // reset form
      const resetData = {};
      users.forEach(u => {
        resetData[u.name] = { status: '', notes: '' };
      });
      setAttendanceData(resetData);
    } catch (err) {
      console.error(err);
      alert('Error submitting attendance');
    }
  };

 return (
    <div>
      <h2>Attendance Table</h2>
      <table style={{ borderCollapse: 'collapse', width: '90%', margin: '15px'}}>
        <thead>
          <tr>
            <th style={{ border: '1px solid gray', padding: '5px' }}>Name</th>
            <th style={{ border: '1px solid gray', padding: '5px' }}>Status</th>
            <th style={{ border: '1px solid gray', padding: '5px' }}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => {
            const currentStatus = attendanceData[u.name]?.status || '';
            return (
              <tr key={u.name}>
                <td style={{ border: '1px solid gray', padding: '5px' }}>{u.name}</td>
                <td style={{ border: '1px solid gray', padding: '5px' }}>
                  {['present', 'late', 'absent', 'excused'].map(status => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(u.name, status)}
                      style={{
                        backgroundColor:
                          currentStatus === status
                            ? status === 'present'
                              ? 'lightgreen'
                              : status === 'late'
                              ? 'yellow'
                              : status === 'absent'
                              ? 'lightcoral'
                              : 'lightblue'
                            : '',
                        borderRadius: '12px',
                        padding: '5px 10px',
                        marginRight: '5px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </td>
                <td style={{ border: '1px solid gray', padding: '5px' }}>
                  <input
                    type="text"
                    value={attendanceData[u.name]?.notes || ''}
                    onChange={e => handleNotesChange(u.name, e.target.value)}
                    placeholder="Add notes"
                    style={{ width: '90%', padding: '5px' }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        onClick={handleSubmitAll}
        style={{
          marginTop: '15px',
          padding: '10px 20px',
          borderRadius: '8px',
          backgroundColor: 'blue',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Submit All
      </button>
    </div>
  );
}

  

export default AttendanceTable;
