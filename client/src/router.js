import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import firebase from "firebase/app";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/auth/Login.vue'),
      meta: {
        requiresAuth: false
      },
      beforeEnter(to, from, next) {
        const {currentUser} = firebase.auth();
        if (currentUser) {
          next('/')
        } else {
          next();
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/auth/Register.vue'),
      beforeEnter(to, from, next) {
        const {currentUser} = firebase.auth();
        if (currentUser) {
          next('/')
        } else {
          next();
        }
      }
    },
  ],
});

router.beforeEach((to, from, next) => {
  const {currentUser} = firebase.auth();
  if (to.meta && typeof to.meta.requiresAuth && currentUser) {
    next();
  } else if (!to.meta || !to.meta.requiresAuth) {
    next();
  } else {
    next('login');
  }
});

export default router
