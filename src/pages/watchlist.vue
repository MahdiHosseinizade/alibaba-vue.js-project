<template>
    <div>
      <header class="bg-yellow-400 text-white flex justify-between items-center p-2 w-full ">
        <a href="../html/index.html" class="text-3xl font-bold no-underline text-white px-2 py-2.5 bg-black rounded-xl ">
          <i class='bx bxs-movie text-4xl mr-2.5'></i>IMDB
        </a>
        <div @click="redirectTo('./profile.html')" class="person-icon">
          <!-- <i class='fas fa-user-alt'></i> -->
          <p>MahdiHosseini</p>
        </div>
      </header>
      <h1 class="text-white text-center mt-12 mb-8 ">My Watch List</h1>
      <ul class=" w-4/5 mx-auto list-none p-0 m-0">
        <li class="border border-solid border-yellow-400 rounded-xl flex items-center mb-5" v-for="movie in movies" :key="movie.id">
          <img :src="`${imageBaseURL}${imageSize}${movie.poster}`" alt="Movie Poster" class="rounded-xl w-48 h-60 mr-5">
          <div>
            <h2 class="m-0 text-lg text-white"><strong> <i  class="fas fa-film text-yellow-400 mr-2.5"></i> Name : </strong> {{ movie.title }}</h2>
            <p class="m-0 text-sm text-gray-500 mt-2"><i class="far fa-calendar-alt text-yellow-400 mr-2.5"> </i><strong class="mr-1">Release Year : </strong> {{ movie.releaseYear }}</p>
            <p class="m-0 text-sm text-gray-500 mt-2"><strong><i class="fas fa-info-circle text-yellow-400 mr-2.5"></i> Descreption :</strong> {{ movie.description }}</p>
            <div class="time-genre flex flex-col">
              <div>
                <p class="m-0 text-sm text-gray-500 mt-2"><strong> <i class="far fa-clock text-yellow-400 mr-2.5"></i> Time : </strong> {{ movie.time }}</p>
              </div>
              <div>
                <p class="m-0 text-sm text-gray-500 mt-2"><strong> <i class="fas fa-tags text-yellow-400 mr-2.5"></i> Genre :</strong> {{ movie.genre }}</p>
              </div>
            </div>
          </div>
          <button class=" bg-black ml-auto px-2.5 py-3 border-none text-base rounded-md cursor-pointer  hover:bg-red-600 text-white hover:text-base" @click="removeMovie(movie.id)">Remove</button>
          <button class="bg-black  px-2.5 py-3 border-none text-base rounded-md cursor-pointer text-gray-700 mx-2.5 ml-2.5 hover:bg-yellow-400 hover:text-black hover:font-bold" @click="watchMovie(movie.id)">Watch</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { imageBaseURL, imageSize } from '../constants/imageAPI';

  
  const movies = ref([
    {
      id: 1,
      poster: "../assets/images/alex.jpg",
      title: "The Covenant",
      releaseYear: 2023,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      time: "2h 30min",
      genre: "War"
    },
    {
      id: 2,
      poster: "../assets/img/LastOfUsbg.jpg",
      title: "The LastofUs",
      releaseYear: 2023,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      time: "11 episodes",
      genre: "Drama"
    },
    {
      id: 3,
      poster: "../assets/img/breakingbad.jpg",
      title: "BreakingBad",
      releaseYear: 2007,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      time: "7 seasons",
      genre: "Drama"
    },
    {
      id: 4,
      poster: "../assets/img/Friends.jpg",
      title: "Friends",
      releaseYear: 2011,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      time: "5 seasons",
      genre: "Fun"
    }
  ]);
  
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
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,600&display=swap');

@font-face {
    font-family: RegularEnglish ;
    src: url(../assets/fonts/Nunito-Regular.ttf);
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', 'Trebuchet MS',sans-serif;
    font-family: RegularEnglish;
    text-decoration: none;
    list-style:none;
    scroll-behavior: smooth;
}
::selection{
    color: #020307;
    background-color: #fff;
}
html::-webkit-scrollbar{
    width: 0.5rem;
    background-color:var(--bg-color);
}
html::-webkit-scrollbar-thumb{
    background-color: var(--main-color);
    border-radius: 5;
}


:root{
    --main-color:#F5C518;
    --text-color:#fff;
    --bg-color:#020307;
}

body{
    background-color: var(--bg-color);
}







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
      /* margin-left: 5%; */
    }
    .time-genre{
        display: flex;
        flex-direction: row;
    }
    
    li button {
      width: 100%;
      margin: 10px 0;
    }
  }
  </style>
  