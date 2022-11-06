import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import { isAuthenticated } from './auth';

export const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeResolve((to, from) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return { name: 'login' };
  }
});
