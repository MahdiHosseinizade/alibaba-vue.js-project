<template>
  <header class="bg-yellow-400 text-white flex justify-between items-center p-2 w-full">
    <RouterLink class="text-3xl font-bold no-underline text-white px-2 py-2.5 rounded-lg bg-black" to="/">
      <i class="text-l mr-2.5 bx bxs-movie"></i>IMDB
    </RouterLink>
        <span
          @click="Logout"
          class="bg-yellow-100 text-black text-sm font-medium mr-2 p-2 rounded dark:bg-gray-100 dark:text-balck hover:cursor-pointer">Log Out</span>
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
            <span class="text-black text-xs font-semibold">{{ movieScore }}%</span>
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
  <section class="mt-24">
    <div v-if="movies.length">
      <article class=" mb-5 flex flex-row  ">
      <h2 class=" ml-40  font-bold text-2xl">Upcoming From Watchlist </h2>
      <RouterLink to="watchlist">
        <h3 class=" watchlist-link border border-yellow-400 rounded px-5 py-2 absolute right-40 hover:bg-yellow-400 hover:text-black hover:font-bold">Go to Watchlist</h3>
      </RouterLink>
    </article>
    </div>
    <div v-else>
      <h2 class="text-white text-center mt-12 mb-8 ">
        No movie in your watchlist</h2>
    </div>
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
          <ul class="flex gap-12 mt-5">
            <li><i
                class="fas fa-star p-2 rounded-full border border-yellow-400 mr-2 cursor-pointer hover:border-gray-700 hover:bg-yellow-400 hover:text-black "></i>Your
              rating</li>
            <li><i
                class="fas fa-heart p-2 rounded-full border border-red-400 mr-2 cursor-pointer hover:border-gray-700 hover:bg-red-600 hover:text-black"></i>Favourite
            </li>
            <li><i
                class="fas fa-list p-2 rounded-full border border-gray-400 mr-2 cursor-pointer hover:border-gray-700 hover:bg-gray-600 hover:text-black"></i>Add
              to list</li>
            <li @click="removeMovie(movie.id)"><i
                class="fas fa-trash p-2 rounded-full border border-orange-500 mr-2 cursor-pointer hover:border-gray-700 hover:bg-orange-500 hover:text-black"></i>Remove
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { inject, ref, onMounted, watch } from 'vue';
import { RouterLink,useRouter } from 'vue-router';
import { fetchApi,fetchApiPost } from '@/utils/fetchAPI';
import { imageBaseURL, imageSize } from '@/constants/imageAPI';
import { API_READ_ACCESS_TOKEN, BASEURL, API_KEY } from '@/constants/apiConstants';
import { useToast } from 'vue-toastification';

const user = inject('user');
const logout = inject('logout');
const router = useRouter();
const session_id = sessionStorage.getItem('session_id');
const movieScore = ref(5)
const tvScore = ref(92);
const toast = useToast();

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

function getWatchListMovie() {
  fetchApi(`${BASEURL}/3/account/${user.value.id}/watchlist/movies`)
    .then((res) => {
      movies.value = res.results;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function Logout(){
  await logout();
  router.replace("/");
  toast.success('Logout successfully');
}

async function removeMovie(id){
  fetchApiPost(`${BASEURL}/3/account/${user.value.id}/watchlist?session_id=${session_id}`,{
    media_type: 'movie',
    media_id: id,
    watchlist: false
  })
  .then((res)=>{
    toast.success('Movie removed from watchlist successfully');
    getWatchListMovie();
  })
}



onMounted(() => {
  getWatchListMovie();
})
watch(movies,(newVal,oldVal)=>{
  if (newVal.length < oldVal.length) {
    getWatchListMovie();
  }
})

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
}

ul i {
  transition: all 0.3s ease;
}
.watchlist-link{
  transition: all 0.5s ease-in-out ;
}

</style>