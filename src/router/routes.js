import Home from "../components/Home.vue";
import Register from '../components/Register.vue/'



export const routes = [
    {path: '/' , name : 'home' , component : Home},
    {path: '/register' , name : 'register' , component : Register},
]