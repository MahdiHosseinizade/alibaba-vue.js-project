<template>
    <section id="coming" class="movies">
      <h2 class="heading">Movie</h2>
  
      <div class="movie-container">
        <div v-for="(movie, index) in movieList" :key="index" class="box">
          <div class="box-img" @click="openMoviePage(movie)">
            <img :src="`${imageBaseURL}${imageSize}${movie.poster_path}`" :alt="movie.title">
          </div>
          <h3>{{ movie.title }}</h3>
          <span>{{ movieInfo }}</span>
        </div>
      </div>
      <MoviePage v-if="showMoviePage" :movie="selectedMovie" @close="closeMoviePage" />
    </section>
</template>

<script setup>
  import { imageBaseURL, imageSize } from '../constants/imageAPI';
  import {ACCESS_TOKEN,BASEURL} from '../constants/apiConstants'
    import { onMounted, ref } from 'vue';
    const showMoviePage = ref(false);
    const selectedMovie = ref(null);
    const movieList = ref([]);
    const movieInfo = ref('');
    const openMoviePage = (movie) => {
    selectedMovie.value = movie;
    showMoviePage.value = true;
  };
  const closeMoviePage = () => {
    showMoviePage.value = false;
  };

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
  const upcomingMovie = data.results;
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