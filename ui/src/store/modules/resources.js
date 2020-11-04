import api from '../../components/api';

import { GET_RESOURCES } from './mutationTypes';

export default {
  strict: /production/i.test(process.env.NODE_ENV),
  namespaced: true,
  state: {
    repositories: [],
    extensions: [],
    facets: {},
  },
  actions: {
    async getResourcesAction({ commit }) {
      try {
        const response = await api.getResources();
        const { data: resources } = response;
        commit(GET_RESOURCES, resources);
        return resources;
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
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
  },

  getters: {
    repositories: (state) => state.repositories,
    repositoriesFiltered: (state) => (filters) => {
      // TODO: deep clone
      let repositories = state.repositories;

      if (filters.categories.length > 0) {
        repositories = repositories.filter((repo) =>
          repo.categories.includes(...filters.categories),
        );
      }

      if (filters.languages.length > 0) {
        repositories = repositories.filter((repo) =>
          repo.languages.includes(...filters.languages),
        );
      }

      if (filters.technologies.length > 0) {
        repositories = repositories.filter((repo) =>
          repo.technologies.includes(...filters.technologies),
        );
      }

      if (filters.searchText.length > 0) {
        repositories = repositories.filter((repo) => {
          const regex = new RegExp(filters.searchText, 'i');
          return regex.test(repo.title) || regex.test(repo.description);
        });
      }

      return repositories;
    },
    extensions: (state) => state.extensions,
    extensionsFiltered: (state) => (filters) => {
      let extensions = state.extensions;

      if (filters.searchText.length > 0) {
        extensions = extensions.filter((extension) => {
          const regex = new RegExp(filters.searchText, 'i');
          return (
            regex.test(extension.title) || regex.test(extension.description)
          );
        });
      }

      return extensions;
    },
    recommended: (state) => {
      let { repositories, extensions } = state;
      repositories = repositories.filter((r) => r.isRecommended);
      extensions = extensions.filter((e) => e.isRecommended);
      let resources = [...repositories, ...extensions];
      resources = resources.sort((a, b) => a.title.localeCompare(b.title));
      return resources;
    },
    facets: (state) => state.facets,
  },
};
