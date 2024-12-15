import axios from 'axios';

const BASE_URL = 'https://api.github.com/search/users?q';

export const fetchUserData = async (username, location = '', minRepos = 0, page = 1) => {
  try {
    // Construct the query explicitly
    let query = `${username}`;
    if (location) query += `+location:${location}`;
    if (minRepos > 0) query += `+repos:>${minRepos}`;

    // Full API call with explicit URL
    const response = await axios.get(`${BASE_URL}${query}`, {
      params: { page, per_page: 30 },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'GitHub API Error.');
    }
    throw new Error('Network error. Please try again.');
  }
};