<template>
  <section id="coming" class="movies">
    <h2 class="heading">Movie</h2>

    <div class="">
      <div v-if="isLoading" v-for="(_, index) in skeletonCount" :key="index" class="skeleton-loader movie-container">
        <div class="skeleton-img"></div>
        <div class="skeleton-title"></div>
        <div class="skeleton-info"></div>
      </div>
      <div v-else class="movie-container">
        <div v-for="(series, index) in seriesList" :key="index" class="box relative">
          <div
            class="box-img group relative rounded-md overflow-hidden transition duration-500 hover:brightness-100 hover:scale-105">
            <img :src="`${imageBaseURL}${imageSize}${series.poster_path}`" :alt="series.title" class="object-cover">
            <div class="overlay absolute inset-0 bg-black bg-opacity-50 flex  justify-center items-center opacity-0
        transition-opacity duration-300 group-hover:opacity-100">
              <RouterLink :to="{ name: 'movie', params: { id: series.id } }"><i
                  class="fas fa-arrow-right  h-12 w-12 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-zinc-300 ">
                </i></RouterLink>

              <i
              @click="addMovieToWatchList(series.id)"
class="fas fa-bookmark text-yellow-300 h-12 w-12 opacity-0 transition-opacity duration-300 cursor-pointer group-hover:opacity-100 hover:text-yellow-600 p-3"></i>
            </div>
          </div>
          <h3 class="movie-title">{{ series.title }}</h3>
          <span class="movie-info">{{ movieInfo }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

  
<script setup>

import { inject, onMounted, ref } from 'vue';
import { imageBaseURL, imageSize } from '@/constants/imageAPI';
import { ACCESS_TOKEN, BASEURL } from '@/constants/apiConstants'
const seriesList = ref([]);
const movieInfo = ref('');
const isLoading = ref(true);
const skeletonCount = ref(3);
const user = inject('user')


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`
  }
};


const getPopularSeries = async () => {
  isLoading.value = true;
  const response = await fetch(`${BASEURL}/3/movie/top_rated?language=en-US&page=1`, options);
  const data = await response.json();
  const movies = data.results;
  for (const movie of movies) {
    const movieDetailsResponse = await fetch(`${BASEURL}/3/movie/${movie.id}?language=en-US`, options);
    const movieDetails = await movieDetailsResponse.json();
    const genre = movieDetails.genres.map((genre) => genre.name);
    movieInfo.value = `imdb : ${movie.vote_average}  | ${genre[0]}`;
  }
  seriesList.value = movies;
  isLoading.value = false;

};

const addMovieToWatchList = (movieId) =>{
  try {
    if(!user.value){
      alert('Please login to add movie to watchlist');
      return;
    }
    const session_id = sessionStorage.getItem('session_id');
    if (!session_id) {
      alert('Please login to add movie to watchlist');
      return;
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization : `Bearer ${ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        media_type: 'movie',
        media_id: movieId,
        watchlist: true
      })
    };
    fetch(`${BASEURL}/3/account/${user.value.id}/watchlist?session_id=${session_id}`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert('Movie added to watchlist');
      });
  } catch (error) {
    alert('Something went wrong');
  }
}

onMounted(getPopularSeries);

</script>

