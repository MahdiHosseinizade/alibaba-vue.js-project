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
            <div class="overlay absolute inset-0 bg-black bg-opacity-50 flex flex-col  justify-center items-center opacity-0
            transition-opacity duration-300 group-hover:opacity-100">
              <div
                class="mb-6 flex rounded bg-black px-1 pb-1.5 pt-2 text-yellow-400 font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#F5C518] transition duration-150 ease-in-out hover:bg-yellow-600 text-yellow-100  focus:bg-gray-200 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-gray-950 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                <img src="../assets/images/logo.png" alt="IMDb Logo" class="w-5 h-5 mr-2">
                {{ series.rate }}
                <span
                  class="ml-2 inline-block whitespace-nowrap rounded-[0.27rem] bg-danger-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-danger-700"></span>
              </div>

              <div>
                <RouterLink :to="{ name: 'movie', params: { id: series.id } }"><i
                    class="fas fa-arrow-right  h-12 w-12 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-zinc-300 ">
                  </i></RouterLink>

                <i @click="addMovieToWatchList(series.id)"
                  class="fas fa-bookmark text-yellow-300 h-12 w-12 opacity-0 transition-opacity duration-300 cursor-pointer group-hover:opacity-100 hover:text-yellow-600 p-3"></i>
              </div>
            </div>
          </div>
          <h3 class="movie-title">{{ series.title }}</h3>

        </div>
      </div>
    </div>
  </section>
</template>

  
<script setup>

import { inject, onMounted, ref } from 'vue';
import { imageBaseURL, imageSize } from '@/constants/imageAPI';
import { API_READ_ACCESS_TOKEN, BASEURL, API_KEY } from '@/constants/apiConstants';
import { fetchApi,fetchApiPost } from '@/utils/fetchAPI';
import { useToast } from 'vue-toastification';
const seriesList = ref([]);
const movieInfo = ref('');
const isLoading = ref(true);
const skeletonCount = ref(3);
const user = inject('user')
const toast = useToast();


function getPopularSeries(){
  fetchApi(`${BASEURL}/3/movie/top_rated?language=en-US&page=1`)
    .then((data) => {
      const movies = data.results;
      for (const movie of movies) {
        movie.rate = movie.vote_average;
      }
      seriesList.value = movies;
      isLoading.value = false;
    })
    .catch((error) => {
      console.log(error);
    });
}

const addMovieToWatchList = (movieId) =>{
  fetchApiPost(`${BASEURL}/3/account/${user.value.id}/watchlist?api_key=${API_KEY}&session_id=${sessionStorage.getItem('session_id')}`,{
    media_type: 'movie',
    media_id: movieId,
    watchlist: true
  })
  .then((data) => {
    toast.success('Movie added to watchlist successfully');
  })
  .catch((error) => {
    toast.error('Something went wrong');
  });
}
// const addMovieToWatchList = (movieId) => {
//   try {
//     if (!user.value) {
//       toast.error('Please login to add movie to watchlist');
//       return;
//     }
//     const session_id = sessionStorage.getItem('session_id');
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`
//       },
//       body: JSON.stringify({
//         media_type: 'movie',
//         media_id: movieId,
//         watchlist: true
//       })
//     };
//     fetch(`${BASEURL}/3/account/${user.value.id}/watchlist?session_id=${session_id}`, options)
//       .then((response) => response.json())
//       .then((data) => {
//         toast.success('Movie added to watchlist successfully');
//       });
//   } catch (error) {
//     toast.error('Something went wrong');
//   }
// }

onMounted(getPopularSeries);

</script>

