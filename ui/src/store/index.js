import Vue from "vue";
import Vuex from "vuex";

import resourcesModule from "./modules/resources";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    resources: resourcesModule,
  },
});
