import Home from "@/components/Home.vue"
import Register from '@/components/Register.vue'
import MovieDetail from '@/components/MovieDetail.vue'
import Login from '@/components/login.vue'
import Profile from '@/pages/profile.vue'

export const routes = [
    {path: '/' , name : 'home' , component : Home},
    {path: '/login' , name : 'login' , component : Login},
    {path: '/register' , name : 'register' , component : Register},
    {path : '/movie/:id' , name: 'movie' ,component: MovieDetail},
    {path: '/profile' ,name:'profile', component:Profile}
]