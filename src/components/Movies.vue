<template>
    <section id="coming" class="movies">
      <h2 class="heading">Movie</h2>
  
      <div class="movie-container">
        <div v-for="(movie, index) in movieList" :key="index" class="box">
          <div class="box-img" @click="openMoviePage(movie)">
            <img :src="movie.image" :alt="movie.title">
          </div>
          <h3>{{ movie.title }}</h3>
          <span>{{ movie.info }}</span>
        </div>
      </div>
      <MoviePage v-if="showMoviePage" :movie="selectedMovie" @close="closeMoviePage" />
    </section>
</template>

<script setup>
    import godfather from '../assets/images/godfather.jpg';
    import breakingbad from '../assets/images/breakingbad.jpg';
    import goodfellas from '../assets/images/goodfellas.jpg';
    import pussinBoots from '../assets/images/pussinBoots.jpg';
    import alex from '../assets/images/alex.jpg';
    import bradpit from '../assets/images/bradpit.jpg';
    import darasalim from '../assets/images/darsalim.jpg';
    import MoviePage from './MoviePage.vue';
    import { ref } from 'vue';
    const showMoviePage = ref(false);
    const selectedMovie = ref(null);
    const openMoviePage = (movie) => {
    selectedMovie.value = movie;
    showMoviePage.value = true;
  };
  const closeMoviePage = () => {
    showMoviePage.value = false;
  };
    const movieList = [
  {
    title: 'The Godfather',
    image: godfather,
    info: '175 | Action',
    descreption : 'The Godfather is a 1972 American crime film directed by Francis Ford Coppola, who co-wrote the screenplay with Mario Puzo, based on Puzo s best-selling 1969 novel of the same name. The film stars Marlon Brando, Al Pacino, James Caan, Richard Castellano, Robert Duvall, Sterling Hayden, John Marley, Richard Conte, and Diane Keaton. It is the first installment in The Godfather trilogy. The story, spanning from 1945 to 1955, chronicles the Corleone family under patriarch Vito Corleone (Brando), focusing on the transformation of one of his sons, Michael Corleone (Pacino), from reluctant family outsider to ruthless mafia boss.',
    actors : [
      {
        name: 'Marlon Brando',
        image: alex
      },
      {
        name: 'Brad pit',
        image: bradpit
      },]
  },
  {
    title: 'The Covenant',
    image: breakingbad,
    info: '123min | War',
    descreption : 'The covenant is a 2006 American supernatural horror film written by J. S. Cardone, directed by Renny Harlin, and starring Steven Strait, Taylor Kitsch, Toby Hemingway, Chace Crawford, Sebastian Stan, Laura Ramsey, and Jessica Lucas. The film, despite receiving very negative reviews, was a moderate box office success.',
    actors : [
      {
        name: 'Marlon Brando',
        image: alex
      },
      {
        name: 'Brad pit',
        image: bradpit
      },]
  },
  {
    title: 'Goodfellas',
    image: goodfellas,
    info: '145min | Action',
    descreption: 'Goodfellas (stylized GoodFellas) is a 1990 American crime film directed by Martin Scorsese, produced by Irwin Winkler and distributed by Warner Bros. It is an adaptation of the 1985 non-fiction book Wiseguy by Nicholas Pileggi, who co-wrote the screenplay with Scorsese. The film stars Robert De Niro, Ray Liotta, Joe Pesci, Lorraine Bracco and Paul Sorvino. It narrates the rise and fall of mob associate Henry Hill and his friends and family from 1955 to 1980.',
    actors : [
      {
        name: 'Marlon Brando',
        image: alex
      },
      {
        name: 'Brad pit',
        image: bradpit
      },]
  },
  {
    title: 'Puss in boots',
    image: pussinBoots,
    info: '144min | Animation',
    descreption : "  Puss in boots is a proud and honorable fighter. He can come across as somewhat silly and has a lot of traits associated with cats but is also a smooth-talking, suave, kind-hearted, charming, and heroic character. He is also a  cat (similar to a ladies' man). He likes to tell stories and sing and dance.",
    actors : [
      {
        name: 'Marlon Brando',
        image: alex
      },
      {
        name: 'Brad pit',
        image: bradpit
      },]
  }
  ];
</script>