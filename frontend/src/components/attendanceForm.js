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
      <table
        style={{
          width: '90%',
          margin: '15px auto',
          border: '2px solid #4E8098',   
          borderRadius: '12px',       
          overflow: 'hidden'
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: '8px', borderBottom: '1px solid #90C2E7', borderRight: '1px solid #90C2E7' }}>Name</th>
            <th style={{ padding: '8px', borderBottom: '1px solid #90C2E7', borderRight: '1px solid #90C2E7' }}>Status</th>
            <th style={{ padding: '8px', borderBottom: '1px solid #90C2E7' }}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, rowIndex) => {
            const currentStatus = attendanceData[u.name]?.status || '';
            const isLastRow = rowIndex === users.length - 1;

            return (
              <tr key={u.name}>
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
                    borderRight: '1px solid #90C2E7',
                    borderBottom: isLastRow ? 'none' : '1px solid #90C2E7'
                  }}
                >
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
                <td
                  style={{
                    padding: '8px',
                    borderBottom: isLastRow ? 'none' : '1px solid #90C2E7'
                  }}
                >
                  <input
                    type="text"
                    value={attendanceData[u.name]?.notes || ''}
                    onChange={e => handleNotesChange(u.name, e.target.value)}
                    placeholder="Add notes"
                    style={{ width: '90%', padding: '5px', borderRadius: '8px' }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <center>
        <button
          onClick={handleSubmitAll}
          style={{
            color: 'white',
            backgroundColor: '#4E8098',
            padding: '8px 20px',
            borderRadius: '8px',
            fontWeight: 'bold',
            display: 'inline-block',
            marginBottom: '20px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Submit All
        </button>
      </center>
    </div>
  );
}

export default AttendanceTable;

