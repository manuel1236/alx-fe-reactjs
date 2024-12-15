import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.github.com/search/users',
});

export const fetchUserData = async (username, location = '', minRepos = '', page = 1) => {
  let query = `q=${username}`;
  if (location) query += `+location:${location}`;
  if (minRepos) query += `+repos:>${minRepos}`;

  try {
    const response = await apiClient.get(`?${query}&page=${page}&per_page=30`);
    return response.data;
  } catch (error) {
    throw new Error('Unable to fetch data');
  }
};