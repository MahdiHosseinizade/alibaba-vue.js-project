<template>
  <header class="bg-yellow-400 text-white flex justify-between items-center p-2 w-full">
    <RouterLink class="text-3xl font-bold no-underline text-white px-2 py-2.5 rounded-lg bg-black" to="/">
      <i class="text-l mr-2.5 bx bxs-movie"></i>IMDB
    </RouterLink>
  </header>
  <section class="w-full bg-yellow-700 h-64 flex items-center">
    <div class="w-40 h-40 bg-yellow-500 text-white text-xl rounded-full mx-6 flex items-center justify-center">
      <span class=" text-6xl">{{ user && user.username ? user.username.charAt(0).toUpperCase() : '?' }}</span>
    </div>
    <section class="flex flex-col">
      <article class="flex justify-between gap-7 items-center mt-7 text-black" v-if="user">
        <h3 class=" ml-3  text-2xl font-bold">{{ user.username ? user.username : '' }}</h3>
        <h5 class=" mr-14 text-sm">Member since July 2023</h5>
      </article>
      <article class="flex flex-row justify-around">
        <div class="mr-6 mt-3  flex flex-row-reverse text-black">
          <h4 class="text-lg mt-1 font-bold">Average Movie Score</h4>
          <div class="progress-circle">
            <svg class="progress-ring movie-score" width="40" height="40">
              <circle class="progress-ring__circle" stroke="white" stroke-width="2" fill="transparent" r="18" cx="20"
                cy="20" />
            </svg>
            <span class="text-black text-xs font-semibold" >{{ movieScore }}%</span>
          </div>
        </div>
        <div class="mr-6 mt-3  flex flex-row-reverse text-black">
          <h4 class=" text-lg mt-1 ml-1 font-bold">Average TV Score</h4>
          <div class="progress-circle">
            <svg class="progress-ring tv-score" width="40" height="40">
              <circle class="progress-ring__circle" stroke="white" stroke-width="2" fill="transparent" r="18" cx="20"
                cy="20" />
            </svg>
            <span class="text-black text-xs font-semibold">{{ tvScore }}%</span>
          </div>
        </div>
      </article>
    </section>
  </section>
  <section class="mt-24" >
    <article class=" mb-5 flex flex-row  ">
      <h2 class=" ml-40  font-bold text-2xl">Upcoming From Watchlist </h2>
      <RouterLink to="watchlist">
        <h3 class=" absolute right-40">Go to Watchlist</h3>
      </RouterLink>
    </article>
    <ul class=" w-4/5 mx-auto list-none p-0 m-0 watchlist">
      <li class="border border-solid border-yellow-400 rounded-xl flex items-center mb-5" v-for="movie in movies"
        :key="movie.id">
        <img :src="`${imageBaseURL}${imageSize}${movie.poster_path}`" :alt="movie.title"
          class="rounded-xl w-48 h-60 mr-5">
        <div>
          <h2 class="m-0 text-lg text-white"><strong> <i class="fas fa-film text-yellow-400 mr-2.5"></i> Name : </strong>
            {{ movie.title }}</h2>
          <p class="m-0 text-sm text-gray-500 mt-4"><i class="far fa-calendar-alt text-yellow-400 mr-2.5"> </i><strong
              class="mr-1">Release Year : </strong> {{ movie.release_date }}</p>
          <p class="m-0 text-sm text-gray-500 mt-4"><strong><i class="fas fa-info-circle text-yellow-400 mr-2.5"></i>
              Descreption :</strong> {{ movie.overview }}</p>
        </div>
        <button
          class="bg-black  px-2.5 py-3 border-none text-base rounded-md cursor-pointer text-white mx-2.5 ml-2.5 hover:bg-yellow-400 hover:text-black hover:font-bold"
          >Watch</button>
        <button
          class=" bg-black ml-auto px-2.5 py-3 border-none text-base rounded-md cursor-pointer  hover:bg-red-600 text-white hover:text-base"
          @click="removeMovie(movie.id)">Remove</button>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { fetchApi } from '@/utils/fetchAPI';
import { imageBaseURL, imageSize } from '@/constants/imageAPI';
import { API_READ_ACCESS_TOKEN, BASEURL, API_KEY } from '@/constants/apiConstants';

const user = inject('user');
const movieScore = ref(5)
const tvScore = ref(92);

const movies = ref([]);

function setProgress(percent, circle) {
  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - percent / 100 * circumference;
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;
  circle.style.strokeDashoffset = offset;
}

onMounted(() => {
  const movieCircle = document.querySelector('.movie-score .progress-ring__circle');
  const tvCircle = document.querySelector('.tv-score .progress-ring__circle');
  setProgress(movieScore.value, movieCircle);
  setProgress(tvScore.value, tvCircle);
});

fetchApi(`${BASEURL}/3/account/${user.value.id}/watchlist/movies`)
  .then((res) => {
    movies.value = res.results;
  })
  .catch((err) => {
    console.log(err);
  });

</script>

<style scoped>
.progress-circle {
  position: relative;
  width: 40px;
  height: 40px;
}

.progress-circle .progress-ring__circle {
  transition: 0.35s stroke-dashoffset;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

.progress-circle span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  font-size: 0.7rem;
}</style>