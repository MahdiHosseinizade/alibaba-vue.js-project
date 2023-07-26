<template>
    <header class="bg-yellow-400 text-white flex justify-between items-center p-2 w-full">
        <RouterLink class="text-3xl font-bold no-underline text-white px-2 py-2.5 rounded-lg bg-black" to="/">
            <i class="text-l mr-2.5 bx bxs-movie"></i>IMDB
        </RouterLink>
    </header>
    <section class="max-w-4xl m-auto flex flex-col justify-center items-center mt-12" id="search">
        <h2 class=" items-center text-lg font-semibold mb-5">Find Your Movie</h2>
        <form class="bg-slate-50 p-3 rounded-lg flex items-center justify-center w-96">
            <input class="border-0 py-2 rounded-md outline-none w-56 text-black" v-model="search" type="text" name="text"
                placeholder="movie ...">
            <input type="submit" value="Search"
                class="btn border-0 outline-none  uppercase font-medium cursor-pointer border-none  w-24">
        </form>
    </section>
    <section class="movie-container" v-if="searchMovie.length">
        <div v-for="(search, index) in searchMovie" :key="index" class="box relative">
            <div
                class="box-img group relative rounded-md overflow-hidden transition duration-500 hover:brightness-100 hover:scale-105">
                <img :src="`${imageBaseURL}${imageSize}${search.poster_path}`" :alt="search.title" class="object-cover">
                <div class="overlay absolute inset-0 bg-black bg-opacity-50 flex flex-col  justify-center items-center opacity-0
            transition-opacity duration-300 group-hover:opacity-100">
                    <div
                        class=" vote_avarage w-28 my-3 flex rounded bg-black px-1 pb-1.5 pt-2 text-yellow-400 font-medium uppercase leading-normal  transition duration-150 ease-in-out  text-yellow-100  focus:bg-gray-200 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 hover:bg-gray-950 ">
                        <img src="@/assets/images/logo.png" alt="IMDb Logo" class="w-5 h-5 mr-2 logoImg">
                        {{ search.vote_average }}
                    </div>

                    <div>
                        <RouterLink :to="{ name: 'movie', params: { id: search.id } }"><i
                                class="fas fa-arrow-right  h-12 w-12 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-zinc-300 ">
                            </i></RouterLink>

                        <i @click="addMovieToWatchList(search.id)"
                            class="fas fa-bookmark text-yellow-300 h-12 w-12 opacity-0 transition-opacity duration-300 cursor-pointer group-hover:opacity-100 hover:text-yellow-600 p-3"></i>
                    </div>
                </div>
            </div>
            <h3 class="movie-title">{{ search.title }}</h3>
        </div>
    </section>
</template>
  
<script setup>
import { ref, watch, inject } from 'vue';
import { BASEURL, API_KEY } from '@/constants/apiConstants';
import { imageBaseURL, imageSize } from '../constants/imageAPI';
import { fetchApi, fetchApiPost } from '@/utils/fetchAPI';
import { RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';
const user = inject('user');
console.log(user);
const search = ref('');
const searchMovie = ref([]);
const toast = useToast();
const addMovieToWatchList = (movieId) => {
    const session_id = sessionStorage.getItem('session_id');
    console.log(session_id);
    if (session_id) {
        fetchApiPost(`${BASEURL}/3/account/${user.value.id}/watchlist?api_key=${API_KEY}&session_id=${session_id}`, {
            media_type: 'movie',
            media_id: movieId,
            watchlist: true,
        })
            .then((data) => {
                toast.success('Movie added to watchlist successfully');
            })
            .catch((error) => {
                console.log(error);
            });
    }
    else {
        toast.error('Please login to add movie to watchlist');
    }
};

watch(search, () => {
    if (search.value.length > 2) {
        fetchApi(`${BASEURL}/3/search/movie?api_key=${API_KEY}&query=${search.value}`)
            .then((data) => {
                searchMovie.value = data.results;
            })
            .catch((error) => {
                console.log(error);
            });
    }
    if (search.value.length === 0) {
        searchMovie.value = [];
    }
})

</script>
  