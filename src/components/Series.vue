<template>
  <section id="movies" class="movies">
    <h2 class="heading">Series</h2>

    <div class="movie-container">
      <div v-for="(series, index) in seriesList" :key="index" class="box">
        <div class="box-img">
          <img :src="`${imageBaseURL}${imageSize}${series.poster_path}`" :alt="series.title">
        </div>
          <h3>{{ series.title }}</h3>
          <span>{{ movieInfo }}</span>
      </div>
    </div>
  </section>
</template>
  
<script setup>

import { onMounted, ref } from 'vue';
import { imageBaseURL, imageSize } from '../common/imageAPI';
const seriesList = ref([]);
const movieInfo = ref('');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTU2YzhmYzk2N2EzMTA1NDk2OTA3MmFhY2E2MDVmNiIsInN1YiI6IjY0YTUxYjMyMWJmMjY2MDEwNTE4MDAyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HxmHxMHAYsrdt_Q3S613yYxLtOJCHd2gYTqAfOAIY2I'
  }
};

const getPopularSeries = async () => {
  const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
  const data = await response.json();
  const movies = data.results.slice(9, 15) ;
  for (const movie of movies){
    console.log('movie is:',movie);
    const movieDetailsResponse = await fetch (`https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`,options);
    const movieDetails = await movieDetailsResponse.json();
    const genre = movieDetails.genres.map((genre) => genre.name);
    movieInfo.value = `imdb : ${movie.vote_average}  | ${genre[0]}`;
  }
  seriesList.value = movies;
};



onMounted(getPopularSeries);

</script>

<style scoped>
  .movieInfo{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    /* justify-content: center; */

  }
</style>