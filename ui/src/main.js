import Vue from "vue";
import VueRouter from 'vue-router'
import App from "./App.vue";

import "./assets/app.css";
import store from './store'

Vue.config.productionTip = false;

Vue.use(VueRouter)

const BlankTemplate = { template: '<div></div>' }

const router = new VueRouter({
  mode: 'history', // use hashless route
  routes: [
    { path: '/getting-started', name: "getting-started", component: BlankTemplate },
    { path: '/tools', name: "tools", component: BlankTemplate },
    { path: '/extensions', name: "extensions", component: BlankTemplate },
    { path: '/', redirect: '/getting-started'},
    { path: "*", redirect: '/getting-started'}
  ]
})

new Vue({
  router: router,
  store,
  render: (h) => h(App)
}).$mount("#app");
