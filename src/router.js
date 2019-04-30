import Vue from 'vue'
import Router from 'vue-router'
import Navbar from './views/Homepage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    // name: 'navbar',
    component: Navbar,
    children: [
      {
        path: '/',
        name: 'outer-cards',
        component: () => import(/* webpackChunkName: "cards" */ '@/components/outer-cards.vue')
      }
    ]
  }]
})
