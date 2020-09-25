import { api } from "../components/api";

const AppDataStore = {
  data: {},
  get: async () => {
    const response = await api.get("/get");
    AppDataStore.data = response.data;
  },
};

export default AppDataStore;
