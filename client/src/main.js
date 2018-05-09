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
  baseUrl: 'http://127.0.0.1:3000', // Your API domain
  providers: {
    twitter: {
      url: '/api/auth/twitter',
    },
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
