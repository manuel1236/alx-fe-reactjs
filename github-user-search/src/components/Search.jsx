import React, { useState, useCallback } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a GitHub username.');
      return;
    }

    if (minRepos < 0) {
      setError('Minimum repositories cannot be negative.');
      return;
    }

    setIsLoading(true);
    setError('');
    if (page === 1) setUserData(null);

    try {
      const data = await fetchUserData(username, location, minRepos, page);
      setUserData((prevData) => ({
        ...data,
        items: [...(prevData?.items || []), ...data.items],
      }));
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 300), [username, location, minRepos, page]);

  const loadMore = async () => {
    setPage((prev) => prev + 1);
    await debouncedSearch();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">GitHub User Search</h1>
      <form onSubmit={handleSearch} className="flex flex-col items-center space-y-4">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-64"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-64"
        />
        <input
          type="number"
          placeholder="Minimum Repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-64"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {isLoading && <p className="text-gray-500 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {userData && userData.items?.length === 0 && <p className="text-gray-700 mt-4">No users found.</p>}
      {userData && (
        <div className="space-y-4 mt-6">
          {userData.items?.map((user) => (
            <div key={user.id} className="border p-4 rounded-md">
              <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
              <h2 className="font-bold">{user.login}</h2>
              <p>{user.location || 'Location not available'}</p>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                View Profile
              </a>
            </div>
          ))}
          {userData.total_count > page * 30 && (
            <button onClick={loadMore} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;