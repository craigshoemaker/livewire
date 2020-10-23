import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `api/`,
});

const isLocalhost = /localhost|127\.0\.0\.1/.test(window.location.host);

export const api = {
  async addResource(payload) {
    const key = isLocalhost
      ? ''
      : '?code=JlpSRyXtLrtzLdcerBYJIEWLqbBuqRfaKV5sMDwgqT9UikvYvoOusQ==';
    return await axiosInstance.post(`./addResource${key}`, payload);
  },
};
