import React from 'react';

function SummaryForm({ title, value, onClick }) {
  return (
    <button 
      onClick={onClick} 
      style={{
        border: '1px solid gray',
        padding: '10px',
        margin: '5px',
        backgroundColor: '#f0f0f0',
        cursor: 'pointer',
        textAlign: 'left',
        width: '200px'
      }}
    >
      <h3>{title}</h3>
      <p>{value}</p>
    </button>
  );
}

export default SummaryForm;
