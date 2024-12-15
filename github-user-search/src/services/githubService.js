import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export const fetchUserData = async (username, location = '', minRepos = 0, page = 1) => {
  try {
    let query = `${username}`;
    if (location) query += ` location:${location}`;
    if (minRepos > 0) query += ` repos:>${minRepos}`;

    const response = await axios.get(`${BASE_URL}/search/users`, {
      params: { q: query, page, per_page: 30 },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'GitHub API Error.');
    }
    throw new Error('Network error. Please try again.');
  }
};