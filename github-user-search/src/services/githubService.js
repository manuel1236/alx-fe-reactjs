// src/services/githubService.js
import axios from 'axios';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
});

export const fetchUserData = async (username) => {
  if (!username) throw new Error('Username is required');

  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Unable to fetch user data');
  }
};