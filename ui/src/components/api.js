import axios from 'axios';

const baseURL = process.env.VUE_APP_API_BASE_URL;
const axiosInstance = axios.create({ baseURL });

export default {
  async addResource(payload) {
    const key = `?code=${process.env.VUE_APP_ADD_RESOURCES_FUNCTION_KEY}`;
    return await axiosInstance.post(`addResource${key}`, payload);
  },
  async getResources() {
    const key = `?code=${process.env.VUE_APP_GET_RESOURCES_FUNCTION_KEY}`;
    return await axiosInstance.get(`getResources${key}`);
  },
};
