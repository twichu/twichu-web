import Vue from 'vue';
import Router from 'vue-router';
import IndexPage from '@/components/IndexPage';
import ProfilePage from '@/components/ProfilePage';
import HelloWorld from '@/components/HelloWorld';

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
      path: '/profile',
      name: 'ProfilePage',
      component: ProfilePage,
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld,
    },
  ],
});
