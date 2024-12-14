import React, { useState } from 'react';
import { fetchGitHubUser } from './services/apiClient';

const App = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!username.trim()) {
      setError('Please enter a valid GitHub username');
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetchGitHubUser(username);
      setUserData(data);
      setError('');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('User not found');
      } else {
        setError('An unexpected error occurred');
      }
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>GitHub User Search</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        aria-label="GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch} aria-label="Search GitHub user">
        Search
      </button>

      {isLoading && <p>Loading...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {userData && (
        <div>
          <h2>{userData.name || 'No Name Provided'}</h2>
          <p>{userData.bio || 'No Bio Available'}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            Visit Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default App;