import React from 'react';

const Body = () => {
  const bodyStyle = {
    background: 'linear-gradient(to bottom, #007bff, #4c86d8)',
    minHeight: 'calc(100vh - 56px)', // Adjust this value based on your header's height
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '1.5rem',
  };

  return (
    <div style={bodyStyle}>
    </div>
  );
}

export default Body;
