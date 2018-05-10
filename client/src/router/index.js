import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import IndexPage from '@/components/IndexPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: IndexPage,
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld,
    },
  ],
});
