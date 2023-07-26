import { defineAsyncComponent } from 'vue';

const Home = defineAsyncComponent(() => import('@/pages/Home.vue'));
const Register = defineAsyncComponent(() => import('@/pages/Register.vue'));
const MovieDetail = defineAsyncComponent(() => import('@/pages/MovieDetail.vue'));
const Login = defineAsyncComponent(() => import('@/pages/login.vue'));
const profile = defineAsyncComponent(() => import('@/pages/profile.vue'));
const watchList =defineAsyncComponent(() =>import('@/pages/watchlist.vue'));
const search = defineAsyncComponent(() => import('@/pages/searchMovie.vue'));
export const routes = [
  { path: '/', name: 'home', component: Home  },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/movie/:id', name: 'movie', component: MovieDetail },
  {path: '/search', name: 'search', component: search},
  {path : '/watchlist',name:'watchlist',component:watchList,meta: { requiresAuth: true }},
  { path: '/profile', name: 'profile', component: profile , meta: { requiresAuth: true }},
];
