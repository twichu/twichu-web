import Vue from 'vue';
import Vuex from 'vuex';
import VueAxios from 'vue-axios';
import { VueAuthenticate } from 'vue-authenticate';
import axios from 'axios';
import profileModule from './profile';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const vueAuth = new VueAuthenticate(Vue.prototype.$http, {
  baseUrl: 'http://127.0.0.1:3000',
  providers: {
    twitter: {
      url: '/api/auth/twitter',
    },
  },
});

const store = new Vuex.Store({
  modules: {
    profileModule,
  },
  state: {
    isAuthenticated: vueAuth.isAuthenticated(),
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
  },
  actions: {
    authenticate(context, provider) {
      vueAuth.authenticate(provider).then((response) => {
        profileModule.state.profile = response.data;
        context.commit('isAuthenticated', {
          isAuthenticated: vueAuth.isAuthenticated(),
        });
      });
    },
    logout(context) {
      vueAuth.logout().then(() => {
        context.commit('isAuthenticated', {
          isAuthenticated: vueAuth.isAuthenticated(),
        });
      });
    },
  },
  mutations: {
    isAuthenticated(state, payload) {
      state.isAuthenticated = payload.isAuthenticated;
    },
  },
});

export default store;
