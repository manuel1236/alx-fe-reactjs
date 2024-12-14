import React, { useState } from 'react';
import { fetchGitHubUser } from './services/apiClient';
import UserProfile from './components/UserProfile'; // Import the new UserProfile component

const App = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!username.trim()) {
      setError('Please enter a GitHub username.');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const data = await fetchGitHubUser(username);
      setUserData(data);
    } catch (err) {
      setError('Error fetching user data. Please check the username or try again later.');
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App" style={styles.container}>
      <h1 style={styles.heading}>GitHub User Search</h1>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {userData && <UserProfile userData={userData} />} {/* Use UserProfile */}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
  },
  heading: {
    color: '#333',
  },
  searchBox: {
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
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default App;