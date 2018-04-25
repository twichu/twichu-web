// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:3000', // Your API domain
  // providers: {
  //   twitter: {
  //     name: 'twitter',
  //     url: '/api/auth/twitter',
  //     authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
  //     redirectUri: 'http://localhost:8080/',
  //     oauthType: '1.0',
  //     popupOptions: { width: 495, height: 645 }
  //   },
  // }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
