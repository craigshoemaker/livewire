import axios from "axios";
import { GET_RESOURCES, GET_FILTERED_RESOURCES } from "./mutationTypes";

export default {
  strict: process.env.NODE_ENV !== "production",
  namespaced: true,
  state: {
    repositories: [],
    repositoriesFiltered: [],
    extensions: [],
    extensionsFiltered: [],
    facets: {},
  },
  actions: {
    async getResourcesAction({ commit }) {
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
    getFilteredRepositoriesAction({ commit }, filters) {
      let repositories = this.state.resources.repositories;

      if (filters.categories.length > 0) {
        repositories = repositories.filter((repo) =>
          repo.categories.includes(...filters.categories)
        );
      }

      if (filters.languages.length > 0) {
        repositories = repositories.filter((repo) =>
          repo.languages.includes(...filters.languages)
        );
      }

      if (filters.technologies.length > 0) {
        repositories = repositories.filter((repo) =>
          repo.technologies.includes(...filters.technologies)
        );
      }

      if (filters.searchText.length > 0) {
        repositories = repositories.filter((repo) => {
          const regex = new RegExp(filters.searchText, "i");
          return regex.test(repo.title) || regex.test(repo.description);
        });
      }

      commit(GET_FILTERED_RESOURCES, repositories);
    },
  },
  mutations: {
    [GET_RESOURCES](state, resources) {
      state.repositories = resources.repositories;
      state.repositoriesFiltered = resources.repositories;
      state.extensions = resources.extensions;
      state.extensionsFiltered = resources.extensions;
      state.facets = resources.facets;
    },
    [GET_FILTERED_RESOURCES](state, repositories) {
      state.repositoriesFiltered = repositories;
    },
  },
  getters: {
    repositories: (state) => state.repositories,
    repositoriesFiltered: (state) => state.repositoriesFiltered,
    extensions: (state) => state.extensions,
    extensionsFiltered: (state) => state.extensionsFiltered,
    facets: (state) => state.facets,
  },
};
