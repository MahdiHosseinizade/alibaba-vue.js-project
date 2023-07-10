<template>
  <section id="movies" class="movies">
    <h2 class="heading">Series</h2>

    <div class="">
      <div v-if="isLoading" v-for="(_, index) in skeletonCount" :key="index" class="skeleton-loader movie-container">
        <div class="skeleton-img"></div>
        <div class="skeleton-title"></div>
        <div class="skeleton-info"></div>
      </div>
      <div v-else class="movie-container">
        <div v-for="(series, index) in seriesList" :key="index" class="box">
          <RouterLink :to="{name:'movie',params:{id:series.id}}">
            <div class="box-img">
              <img :src="`${imageBaseURL}${imageSize}${series.poster_path}`" :alt="series.title">
            </div>
            <h3 class="movie-title">{{ series.title }}</h3>
            <span class="movie-info">{{ movieInfo }}</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

  
<script setup>

import { onMounted, ref } from 'vue';
import { imageBaseURL, imageSize } from '../constants/imageAPI';
import { ACCESS_TOKEN, BASEURL } from '../constants/apiConstants'
const seriesList = ref([]);
const movieInfo = ref('');
const isLoading = ref(true);
const skeletonCount = ref(3);


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN} `
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



onMounted(getPopularSeries);

</script>

