import Vue from "vue";
import VueRouter from 'vue-router'
import App from "./App.vue";

import "./assets/app.css";

Vue.config.productionTip = false;

Vue.use(VueRouter)

const Foo = { template: '<div></div>' }

const router = new VueRouter({
  mode: 'history', // use hashless route
  routes: [
    { path: '/getting-started', name: "getting-started", component: Foo},
    { path: '/tools', name: "tools", component: Foo},
    { path: '/extensions', name: "extensions", component: Foo},
    { path: '/', redirect: '/getting-started'},
    { path: "*", redirect: '/getting-started'}
  ]
})

new Vue({
  router: router,
  render: (h) => h(App),
}).$mount("#app");
