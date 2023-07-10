<template>
  <section id="coming" class="movies">
    <h2 class="heading">Movie</h2>

    <div class="">
      <div v-if="isLoading" v-for="(series, index) in 3" class="skeleton-loader movie-container">
        <div class="skeleton-img"></div>
        <div class="skeleton-title"></div>
        <div class="skeleton-info"></div>
      </div>
      <div v-else class="movie-container">
        <div v-for="(movie, index) in movieList" :key="index" class="box">
          <RouterLink :to="{name:'movie' , params:{id:movie.id}}">
            <div class="box-img">
              <img :src="`${imageBaseURL}${imageSize}${movie.poster_path}`" :alt="movie.title">
            </div>
            <h3 class="movie-title">{{ movie.title }}</h3>
            <span class="movie-info">{{ movieInfo }}</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { imageBaseURL, imageSize } from '../constants/imageAPI';
import { ACCESS_TOKEN, BASEURL } from '../constants/apiConstants'
import { onMounted, ref } from 'vue';
const movieList = ref([]);
const movieInfo = ref('');
const isLoading = ref(true);



const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`
  }
};

const getUpcomingMovie = async () => {
  isLoading.value = true;
  const respponse = await fetch(`${BASEURL}/3/movie/upcoming?language=en-US&page=1`, options)
  const data = await respponse.json();
  const upcomingMovie = data.results;
  for (const movie of upcomingMovie) {
    const movieDetailsResponse = await fetch(`${BASEURL}/3/movie/${movie.id}?language=en-US`, options);
    const movieDetails = await movieDetailsResponse.json();
    const genre = movieDetails.genres.map((genre) => genre.name);
    movieInfo.value = `imdb :${movie.vote_average} | ${genre[0]}`;
  }
  movieList.value = upcomingMovie;
  isLoading.value = false;
}
onMounted(getUpcomingMovie);

</script>

<style scoped>
.movie-title {
  color: white !important;
}
</style>