import axios from "axios";
import { GET_RESOURCES } from "./mutationTypes";

export default {
  strict: process.env.NODE_ENV !== "production",
  namespaced: true,
  state: {
    repositories: [],
    extensions: [],
    facets: {},
  },
  mutations: {
    [GET_RESOURCES](state, resources) {
      // state = { ...resources };
      state.repositories = resources.repositories;
      state.extensions = resources.extensions;
      state.facets = resources.facets;
    },
  },
  actions: {
    async resourcesAction({ commit }) {
      try {
        const response = await axios.get(`/api/get`);
        const { data: resources } = response;
        commit(GET_RESOURCES, resources);
        return resources;
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    },
  },
  getters: {
    repositories: (state) => state.repositories,
    extensions: (state) => state.extensions,
    facets: (state) => state.facets,
  },
};
