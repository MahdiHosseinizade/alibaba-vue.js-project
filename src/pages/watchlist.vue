<template>
  <div>
    <header class="bg-yellow-400 text-white flex justify-between items-center p-2 w-full ">
      <a href="../html/index.html" class="text-3xl font-bold no-underline text-white px-2 py-2.5 bg-black rounded-xl ">
        <i class='bx bxs-movie text-4xl mr-2.5'></i>IMDB
      </a>
      <div @click="redirectTo('./profile.html')" class="person-icon">
        <span
          class="bg-yellow-100 text-black text-sm font-medium mr-2 px-2.5 py-1 rounded dark:bg-gray-400 dark:text-balck hover:cursor-pointer">{{
            user && user.username ? user.username : '' }}</span>
      </div>
    </header>
    <h1 class="text-white text-center mt-12 mb-8 ">My Watch List</h1>
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
                  :</strong> {{ movie.genre }}</p>
            </div>
          </div>
        </div>
        <button
          class="bg-black  px-2.5 py-3 border-none text-base rounded-md cursor-pointer text-white mx-2.5 ml-2.5 hover:bg-yellow-400 hover:text-black hover:font-bold"
          @click="watchMovie(movie.id)">Watch</button>
        <button
          class=" bg-black ml-auto px-2.5 py-3 border-none text-base rounded-md cursor-pointer  hover:bg-red-600 text-white hover:text-base"
          @click="removeMovie(movie.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>
  
<script setup>
import { ref, inject, watch, onMounted } from 'vue';
import { imageBaseURL, imageSize } from '../constants/imageAPI';
const user = inject('user');

async function getWatchListMovie() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTU2YzhmYzk2N2EzMTA1NDk2OTA3MmFhY2E2MDVmNiIsInN1YiI6IjY0YTUxYjMyMWJmMjY2MDEwNTE4MDAyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HxmHxMHAYsrdt_Q3S613yYxLtOJCHd2gYTqAfOAIY2I'
    }
  };
  await fetch('https://api.themoviedb.org/3/account/20109680/watchlist/movies', options)
    .then(response => response.json())
    .then(data => {
      movies.value = data.results;
    })
  console.log(movies.value);
}
onMounted(getWatchListMovie)

const movies = ref([]);

function redirectTo(url) {
  window.location.href = url;
}

function removeMovie(id) {
  movies.value = movies.value.filter(movie => movie.id !== id);
}

function watchMovie(id) {
}
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
    flex-direction: row;
  }

  li button {
    width: 100%;
    margin: 10px 0;
  }
  .vote_avarage{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width:2px;
    height: 50px;
    margin-top: 2%;
    margin-right: 5%;
  }
  .logoImg{
    width: 25px !important;
    height: 25px!important;
  }
}
</style>
  