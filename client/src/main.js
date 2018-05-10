// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuthenticate from 'vue-authenticate';
import App from './App';
import router from './router';

Vue.prototype.$http = axios;

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, {
  baseUrl: 'http://127.0.0.1:3000',
  providers: {
    twitter: {
      url: '/api/auth/twitter',
    },
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
