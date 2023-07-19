import { defineAsyncComponent } from 'vue';

const Home = defineAsyncComponent(() => import('@/components/Home.vue'));
const Register = defineAsyncComponent(() => import('@/components/Register.vue'));
const MovieDetail = defineAsyncComponent(() => import('@/components/MovieDetail.vue'));
const Login = defineAsyncComponent(() => import('@/components/login.vue'));
const Profile = defineAsyncComponent(() => import('@/pages/profile.vue'));

export const routes = [
  { path: '/', name: 'home', component: Home  },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/movie/:id', name: 'movie', component: MovieDetail },
  { path: '/profile', name: 'profile', component: Profile , meta: { requiresAuth: true }}
];
