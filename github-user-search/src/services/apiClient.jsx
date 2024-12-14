import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_GITHUB_API_URL || 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_KEY || ''}`,
  },
});

export const fetchGitHubUser = async (username) => {
  if (!username) {
    throw new Error('Username is required');
  }
  try {
    const response = await apiClient.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};