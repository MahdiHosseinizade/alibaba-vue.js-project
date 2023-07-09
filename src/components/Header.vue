<template>
    <head>
    </head>
    <header>
        <a href="" class="logo">
            <i class='bx bxs-movie'></i>IMDB
        </a>

        <ul class="navbar">
            <li><a href="#home">Home</a></li>
            <li><a href="#movies">Series</a></li>
            <li><a href="#coming">Movie</a></li>
            <li><a href="#search">Search</a></li> 
        </ul>
        <div class="cc">
           <router-link to="" class="signInbtn">Sign In</router-link>
           <div class="icon" @click="openMenu">
              <span class="fas fa-bars"></span>
            </div>
        </div>

        <div class="menuBurger" ref="menuBurgerRef">
            <ul>
                <li><a class="fas fa-times close-hamburger"></a></li>
                <li><a href="./login.html" class="">Sign In</a></li>
                <li><a href="#home">Home</a></li>
                <li><a href="#movies">Series</a></li>
                <li><a href="#coming">Movie</a></li>
                <li><a href="#search">Search</a></li>
            </ul>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const menuBurgerRef = ref(null);


const openMenu = () =>{
    menuBurgerRef.value.style.right = '0';
};

</script>

<style scoped>
</style>
