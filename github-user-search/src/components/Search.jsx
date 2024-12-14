// src/components/Search.jsx
import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a GitHub username.');
      return;
    }

    setIsLoading(true);
    setError('');
    setUserData(null);

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError('Looks like we can’t find the user.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {isLoading && <p style={styles.message}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {userData && (
        <div style={styles.profile}>
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
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '250px',
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#0366d6',
    color: '#fff',
    cursor: 'pointer',
  },
  message: {
    color: '#555',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  profile: {
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
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

export default Search;