


<!-- <template>
  <h1>{{ message }}</h1>
</template>

<script setup >
  const message = "AliBaba Academy"
</script> -->

<template>
  <div id="app">
    <Header />
    <Home />
    <Search />
    <Series />
  </div>
</template>

<script setup>
  import Header from './components/Header.vue';
  import Home from './components/Home.vue';
  import Search from './components/Search.vue'
  import Series from './components/Series.vue';
</script>