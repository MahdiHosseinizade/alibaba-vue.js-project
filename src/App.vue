


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
  </div>
</template>

<script setup>
  import Header from './components/Header.vue';
  import Home from './components/Home.vue';
</script>