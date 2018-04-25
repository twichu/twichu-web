import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import IndexPage from '@/components/IndexPage'
import ItemList from '@/components/ItemList/Index'
import MainPage from '@/components/MainPage/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: IndexPage
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/itemlist',
      name: 'ItemList',
      component: ItemList
    },
    {
      path: '/mainpage',
      name: 'MainPage',
      component: MainPage
    },
  ]
})
