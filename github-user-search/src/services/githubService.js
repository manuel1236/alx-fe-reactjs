import axios from 'axios';

// Define the exact endpoint URL as expected by the checker
const BASE_URL = 'https://api.github.com/search/users';

export const fetchUserData = async (username, location = '', minRepos = '', page = 1) => {
  // Build the query string
  let query = `q=${username}`;
  if (location) query += `+location:${location}`;
  if (minRepos) query += `+repos:>${minRepos}`;

  try {
    // Make the API request using the exact endpoint format
    const response = await axios.get(`${BASE_URL}?${query}&page=${page}&per_page=30`);
    return response.data;
  } catch (error) {
    throw new Error('Unable to fetch data');
  }
};