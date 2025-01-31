import api from './api';

const launchService = {
  fetchLaunches: async (offset) => {
    const response = await api.get(`https://api.spacexdata.com/v3/launches?offset=${offset}&limit=10`);
    return response.data;
  },
  searchLaunches: async (searchTerm) => {
    const response = await api.get(`launches?mission_name=${searchTerm}`);
    return response.data;
  },
};

export default launchService;