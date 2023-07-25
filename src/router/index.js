import {createRouter, createWebHistory} from 'vue-router';
import { routes } from './routes';


export const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user-id');
    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
      next('/login');
      return;
    }
    if (to.name === 'login' && loggedIn) {
      next('/');
      return;
    }
    next();
  });
  