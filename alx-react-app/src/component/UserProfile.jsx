// src/components/UserProfile.jsx
import React from 'react';

const UserProfile = (props) => {
  return (
    <div style={{ border: '1px solid gray', padding: '10px', margin: '10px', borderRadius: '8px' }}>
      <h2 style={{ color: 'blue', fontSize: '24px' }}>{props.name}</h2>
      <p style={{ fontSize: '18px' }}>Age: <span style={{ fontWeight: 'bold' }}>{props.age}</span></p>
      <p style={{ fontSize: '16px' }}>Bio: {props.bio}</p>
    </div>
  );
};

export default UserProfile;