import React from 'react';

const UserProfile = ({ userData }) => {
  if (!userData) {
    return null; // Don't render if there's no user data
  }

  return (
    <div className="user-profile" style={styles.container}>
      <img
        src={userData.avatar_url}
        alt={`${userData.name}'s avatar`}
        style={styles.avatar}
      />
      <h2>{userData.name || 'No Name Provided'}</h2>
      <p>{userData.bio || 'No Bio Available'}</p>
      <a
        href={userData.html_url}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.link}
      >
        Visit GitHub Profile
      </a>
    </div>
  );
};

// Inline styles for quick styling
const styles = {
  container: {
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '20px auto',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '10px',
  },
  link: {
    textDecoration: 'none',
    color: '#0366d6',
    fontWeight: 'bold',
  },
};

export default UserProfile;