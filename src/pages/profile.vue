<template>
    <header class="bg-yellow-400 text-white flex justify-between items-center p-2 w-full">
      <RouterLink class="text-3xl font-bold no-underline text-white px-2 py-2.5 rounded-lg bg-black" to="/">
        <i  class="text-l mr-2.5 bx bxs-movie"></i>IMDB
      </RouterLink>
    </header>
    <section class="w-full bg-cyan-700 h-64 flex items-center">
  <section class="flex">
    <img src="../assets/images/bandofbrothers.jpg" alt="Profile Image" class="w-20 h-20 rounded-full mr-4">
  </section>
  <section class="flex flex-col">
    <article class="mb-4">
      <h3 class="text-white text-2xl font-bold">MahdiHosseini</h3>
      <h5 class="text-white text-sm">Member since July 2023</h5>
    </article>
    <article class="flex">
      <div class="mr-4">
        <h4 class="text-white text-lg font-bold">Average Movie Score</h4>
        <div class="bg-white w-8 h-8 rounded-full flex items-center justify-center">
          <span class="text-black text-xs">85%</span>
        </div>
      </div>
      <div>
        <h4 class="text-white text-lg font-bold">Average TV Score</h4>
        <div class="bg-white w-8 h-8 rounded-full flex items-center justify-center">
          <span class="text-black text-xs">92%</span>
        </div>
      </div>
    </article>
  </section>
</section>

</template>