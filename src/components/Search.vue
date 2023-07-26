<template>
    <section class="search" id="search">
        <h2>Find Your Movie</h2>
        <form @submit.prevent="searchHandler">
            <input class="text-black" v-model="search" type="text" name="text" placeholder="movie ...">
            <input type="submit" value="Search" class="btn">
        </form>
    </section>
    <section class="movie-container" v-if="searchMovie.length">
        <div v-for="(search, index) in searchMovie" :key="index" class="box relative">
            {{ search.poster_path }}
            <div
                class="box-img group relative rounded-md overflow-hidden transition duration-500 hover:brightness-100 hover:scale-105">
                <img :src="`${imageBaseURL}${imageSize}${search.poster_path}`" :alt="search.title" class="object-cover">
                <div class="overlay absolute inset-0 bg-black bg-opacity-50 flex flex-col  justify-center items-center opacity-0
            transition-opacity duration-300 group-hover:opacity-100">
                    <div
                        class="mb-6 flex rounded bg-black px-1 pb-1.5 pt-2 text-yellow-400 font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#F5C518] transition duration-150 ease-in-out hover:bg-yellow-600 text-yellow-100  focus:bg-gray-200 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-gray-950 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                        <img src="@/assets/images/logo.png" alt="IMDb Logo" class="w-5 h-5 mr-2">
                        {{ search.rate }}
                        <span
                            class="ml-2 inline-block whitespace-nowrap rounded-[0.27rem] bg-danger-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-danger-700"></span>
                    </div>

                    <div>
                        <RouterLink :to="{ name: 'movie', params: { id: search.id } }"><i
                                class="fas fa-arrow-right  h-12 w-12 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-zinc-300 ">
                            </i></RouterLink>

                        <i
                            class="fas fa-bookmark text-yellow-300 h-12 w-12 opacity-0 transition-opacity duration-300 cursor-pointer group-hover:opacity-100 hover:text-yellow-600 p-3"></i>
                    </div>
                </div>
            </div>
            <h3 class="movie-title">{{ search.title }}</h3>
        </div>
    </section>
</template>
  
<script setup>
import { ref, watch } from 'vue';
import { API_READ_ACCESS_TOKEN, BASEURL, API_KEY } from '@/constants/apiConstants';
import { imageBaseURL, imageSize } from '../constants/imageAPI';
import { fetchApi } from '@/utils/fetchAPI';
const search = ref('');
const searchMovie = ref([]);
watch(search, () => {
    if (search.value.length > 2) {
        fetchApi(`${BASEURL}/3/search/movie?api_key=${API_KEY}&query=${search.value}`)
            .then((data) => {
                searchMovie.value = data.results;
                console.log(searchMovie.value);
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
  