<template>
    <section id="movies" class="movies">
      <h2 class="heading">Series</h2>
  
      <div class="movie-container">
        <div v-for="(series, index) in seriesList" :key="index" class="box">
          <div class="box-img">
            <img :src="series.image" :alt="series.title">
          </div>
          <h3>{{ series.title }}</h3>
          <span>{{ series.info }}</span>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
    import breakingbad from '../assets/images/breakingbad.jpg';
    import friends from '../assets/images/Friends.jpg';
    import moneyheist from '../assets/images/moneyheist.jpg';
    import walkingdead from '../assets/images/walkingdead.jpg';
    import got from '../assets/images/GameofThrons.jpg';
    import rickandmorty from '../assets/images/rickandmorty.jpg';
    import motaham from '../assets/images/motaham.jpg';
    import chernobyl from '../assets/images/chernobyl-ka-1920.jpg';


  const seriesList = [
    {
      title: 'Breaking Bad',
      image: breakingbad,
      info: '5 Season | Drama'
    },
    {
      title: 'Friends',
      image: friends,
      info: '10 Season | Fun'
    },
    {
      title: 'Money Heist',
      image: moneyheist,
      info: '5 Season | Adventure'
    },
    {
      title: 'Walking Dead',
      image: walkingdead,
      info: '11 Season | Action'
    },
    {
      title: 'Game of Thrones',
      image: got,
      info: '8 Series | Action'
    },
    {
      title: 'Rick and Morty',
      image: rickandmorty,
      info: '6 Season | Drama'
    },
    {
      title: 'Motaham Gorikht',
      image:motaham,
      info: '20 episodes | Comedy (suggestion)'
    },
    {
      title: 'Chernobyl',
      image: chernobyl,
      info: '1 Season | Action'
    }
  ];
  </script>