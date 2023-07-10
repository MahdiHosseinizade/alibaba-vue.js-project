<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup>
  import Header from './components/Header.vue';
  import Home from './components/Home.vue';
  import Search from './components/Search.vue'
  import Series from './components/Series.vue';
  import Movies from './components/Movies.vue';
  import Footer from './components/Footer.vue';
</script>