import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export const fetchUserData = async (query) => {
  try {
    // Use the search endpoint for advanced queries
    const response = await axios.get(`${BASE_URL}/search/users`, {
      params: {
        q: query, // Accepts a query string like "location:xyz repos:>10"
      },
    });
    return response.data.items; // Return the array of users
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Propagate the error for handling in the caller
  }
};