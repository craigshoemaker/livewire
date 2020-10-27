import axios from 'axios';

const isLocal = /localhost|127\.0\.0\.1/.test(window.location.host);

const axiosInstance = axios.create({
  baseURL: isLocal ? 'api/' : `https://livewireapp.azurewebsites.net/api/`,
});

export const api = {
  async addResource(payload) {
    const key = isLocal
      ? ''
      : '?code=JlpSRyXtLrtzLdcerBYJIEWLqbBuqRfaKV5sMDwgqT9UikvYvoOusQ==';
    return await axiosInstance.post(`./addResource${key}`, payload);
  },
};
