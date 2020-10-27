import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUserSecret,
  faCodeBranch,
  faStar,
  faEye,
  faInfoCircle,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import './assets/app.css';
import store from './store';

library.add([
  faUserSecret,
  faCodeBranch,
  faYoutube,
  faStar,
  faEye,
  faInfoCircle,
  faWindowClose,
]);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(VueRouter);

const BlankTemplate = { template: '<div></div>' };

const router = new VueRouter({
  mode: 'history', // use hashless route
  routes: [
    {
      path: '/getting-started',
      name: 'getting-started',
      component: BlankTemplate,
    },
    { path: '/tools', name: 'tools', component: BlankTemplate },
    { path: '/extensions', name: 'extensions', component: BlankTemplate },
    { path: '/', redirect: '/getting-started' },
    { path: '*', redirect: '/getting-started' },
  ],
});

new Vue({
  router: router,
  store,
  render: (h) => h(App),
}).$mount('#app');
