<template>
    <section id="coming" class="movies">
      <h2 class="heading">Movie</h2>
  
      <div class="movie-container">
        <div v-for="(movie, index) in movieList" :key="index" class="box">
          <RouterLink :to="{name : 'movie' , params:{id:movie.id}}">
            <div class="box-img" >
              <img :src="`${imageBaseURL}${imageSize}${movie.poster_path}`" :alt="movie.title">
            </div>
            <h3 class="movie-title">{{ movie.title }}</h3>
            <span class="movie-info">{{ movieInfo }}</span>
          </RouterLink>

        </div>
      </div>
    </section>
</template>

<script setup>
  import { imageBaseURL, imageSize } from '../constants/imageAPI';
  import {ACCESS_TOKEN,BASEURL} from '../constants/apiConstants'
    import { onMounted, ref } from 'vue';
    const movieList = ref([]);
    const movieInfo = ref('');



  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`
  }
};

const getUpcomingMovie = async () =>{
  const respponse = await fetch(`${BASEURL}/3/movie/upcoming?language=en-US&page=1`, options)
  const data = await respponse.json();
  const upcomingMovie = data.results.slice(0,5);
  for (const movie of upcomingMovie){
    const movieDetailsResponse = await fetch (`${BASEURL}/3/movie/${movie.id}?language=en-US`,options);
    const movieDetails = await movieDetailsResponse.json();
    const genre = movieDetails.genres.map((genre) => genre.name);
    movieInfo.value = `imdb :${movie.vote_average} | ${genre[0]}`;
  }
  movieList.value = upcomingMovie;
}
onMounted(getUpcomingMovie);

</script>

<style scoped>
  .movie-title{
    color: white !important;
  }
</style>