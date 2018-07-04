// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import { VueMasonryPlugin } from 'vue-masonry';
import Ads from 'vue-google-adsense';
import App from './App';
import router from './router';
import store from './vuex/index';

Vue.use(require('vue-script2'));

Vue.use(Ads.Adsense);
Vue.use(Ads.InArticleAdsense);
Vue.use(Ads.InFeedAdsense);

Vue.use(BootstrapVue);
Vue.use(VueMasonryPlugin);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
});
