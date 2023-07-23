<template>
  <div>
    <header class="bg-yellow-400 text-white flex justify-between items-center p-2 w-full ">
      <RouterLink to="/" class="text-3xl font-bold no-underline text-white px-2 py-2.5 bg-black rounded-xl ">
        <i class='bx bxs-movie text-4xl mr-2.5'></i>IMDB
      </RouterLink>
      <div @click="redirectTo('./profile.html')" class="person-icon">
        <span
          class="bg-yellow-100 text-black text-sm font-medium mr-2 px-2.5 py-1 rounded dark:bg-gray-400 dark:text-balck hover:cursor-pointer">{{
            user && user.username ? user.username : '' }}</span>
      </div>
    </header>

    <h1 v-if="!movies.length" class="text-white text-center mt-12 mb-8 ">
      No movie in your watchlist</h1>
    <h1 class="text-white text-center mt-12 mb-8" v-else><span
        class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-black bg-yellow-300 rounded-full">{{
          movies.length }}</span>
      movies is in your watchlist</h1>
    <ul class=" w-4/5 mx-auto list-none p-0 m-0 watchlist">
      <li class="border border-solid border-yellow-400 rounded-xl flex items-center mb-5" v-for="movie in movies"
        :key="movie.id">
        <img :src="`${imageBaseURL}${imageSize}${movie.poster_path}`" :alt="movie.title"
          class="rounded-xl w-48 h-60 mr-5">
        <div>
          <h2 class="m-0 text-lg text-white"><strong> <i class="fas fa-film text-yellow-400 mr-2.5"></i> Name : </strong>
            {{ movie.title }}</h2>
          <p class="m-0 text-sm text-gray-500 mt-2"><i class="far fa-calendar-alt text-yellow-400 mr-2.5"> </i><strong
              class="mr-1">Release Year : </strong> {{ movie.release_date }}</p>
          <p class="m-0 text-sm text-gray-500 mt-2"><strong><i class="fas fa-info-circle text-yellow-400 mr-2.5"></i>
              Descreption :</strong> {{ movie.overview }}</p>
          <div class="time-genre  flex flex-col">
            <div
              class=" vote_avarage w-28 my-3 flex rounded bg-black px-1 pb-1.5 pt-2 text-yellow-400 font-medium uppercase leading-normal  transition duration-150 ease-in-out  text-yellow-100  focus:bg-gray-200 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 hover:bg-gray-950 ">
              <img src="@/assets/images/logo.png" alt="IMDb Logo" class="w-5 h-5 mr-2 logoImg">
              {{ movie.vote_average }}
            </div>
            <div>
              <p class="m-0 text-sm text-gray-500 mt-2"><strong> <i class="fas fa-tags text-yellow-400 mr-2.5"></i> Genre
                  :</strong> {{ movie.genres }}</p>
            </div>
          </div>
        </div>
        <button
          class="bg-black  px-2.5 py-3 border-none text-base rounded-md cursor-pointer text-white mx-2.5 ml-2.5 hover:bg-yellow-400 hover:text-black hover:font-bold">Watch</button>
        <button
          class=" bg-black ml-auto px-2.5 py-3 border-none text-base rounded-md cursor-pointer  hover:bg-red-600 text-white hover:text-base"
          @click="removeMovie(movie.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>
  
<script setup>
import { ref, inject, watch, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';
import { imageBaseURL, imageSize } from '@/constants/imageAPI';
import { API_READ_ACCESS_TOKEN, BASEURL, API_KEY } from '@/constants/apiConstants';


const movies = ref([]);
const user = inject('user');
const toast = useToast();
const session_id = sessionStorage.getItem('session_id');

async function getWatchListMovie() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`
    }
  };
  const response = await fetch(`${BASEURL}/3/account/${user.value.id}/watchlist/movies`, options)
  const data = await response.json();
  const watchListMovie = data.results;
  for (const movie of watchListMovie) {
    const genre = await fetch(`${BASEURL}/3/movie/${movie.id}?language=en-US`, options)
    const genreData = await genre.json();
    const gen = genreData.genres.map((genre) => genre.name);
    movie.genres = gen.join(', ');
  }
  movies.value = watchListMovie;
}


async function removeMovie(id) {
  console.log('remove movie  : ', id);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`
    },
    body: JSON.stringify({
      media_type: 'movie',
      media_id: id,
      watchlist: false
    })
  }
  fetch(`${BASEURL}/3/account/${user.value.id}/watchlist?session_id=${session_id}`, options)
    .then(response => response.json())
    .then(data => {
      toast.success('Movie removed from watchlist successfully');
      getWatchListMovie();
    })
}


onMounted(getWatchListMovie)
</script>

<style>
@media only screen and (max-width: 780px) {
  ul.watchlist li {
    flex-direction: column;
    padding: 16px;
  }

  ul.watchlist li img {
    width: 90%;
    height: 300px;
    margin-right: 0;
    margin-bottom: 20px;
  }

  ul.watchlist li div {
    flex-grow: 1;
  }

  .time-genre {
    display: flex;
    flex-direction: column;
  }

  li button {
    width: 100%;
    margin: 10px 0;
  }

  .vote_avarage {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 50px;
    margin-top: 2%;
    margin-right: 5%;
  }

  .logoImg {
    width: 25px !important;
    height: 25px !important;
  }
}
</style>
  