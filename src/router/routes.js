import Home from "../components/Home.vue";
import Register from '../components/Register.vue/'
import MovieDetail from '../components/MovieDetail.vue/'

export const routes = [
    {path: '/' , name : 'home' , component : Home},
    {path: '/register' , name : 'register' , component : Register},
    {path : '/movie/:id' , name: 'movie' ,component: MovieDetail}
]