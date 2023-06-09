<template>
    <section id="coming" class="movies">
      <h2 class="heading">Movie</h2>
  
      <div class="movie-container">
        <div v-for="(movie, index) in movieList" :key="index" class="box">
          <div class="box-img">
            <img :src="movie.image" :alt="movie.title">
          </div>
          <h3>{{ movie.title }}</h3>
          <span>{{ movie.info }}</span>
        </div>
      </div>
    </section>
</template>

<script setup>
    import godfather from '../assets/images/godfather.jpg';
    import breakingbad from '../assets/images/breakingbad.jpg';
    import goodfellas from '../assets/images/goodfellas.jpg';
    import pussinBoots from '../assets/images/pussinBoots.jpg';
   const movieList = [
  {
    title: 'The Godfather',
    image: godfather,
    info: '175 | Action'
  },
  {
    title: 'The Covenant',
    image: breakingbad,
    info: '123min | War'
  },
  {
    title: 'Goodfellas',
    image: goodfellas,
    info: '145min | Action'
  },
  {
    title: 'Puss in boots',
    image: pussinBoots,
    info: '144min | Animation'
  }
];
</script>