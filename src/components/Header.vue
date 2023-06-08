<template>
    <head>
        <!-- add a metatag for each componenet -->
        <!-- add a folder for each component and add style next to each vue file  -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
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
            <a href="./login.html" class="signInbtn">Sign In</a>
            <div class="icon" @click="openMenu">
                <span class="fas fa-bars"></span>
            </div>
        </div>

        <div class="menuBurger" ref="menuBurgerRef">
            <!-- <span class="fas fas fa-times"></span> -->
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
const menuBurgerRef = ref(null);

const redirectTo = (url) => {
    window.location.href = url;
};

const openMenu = () =>{
    menuBurgerRef.value.style.right = '0';
};
// const navLinks = document.querySelectorAll('.navbar a');
// navLinks.forEach(link => {
//     link.addEventListener('click', function () {
//         navLinks.forEach(link => link.classList.remove('active'));
//         this.classList.add('active');
//     });
// });

// const menuItems = document.querySelectorAll('.menuBurger li');
// menuItems.forEach(item => {
//     item.addEventListener('click', function () {
//         const menuBurger = document.querySelector('.menuBurger');
//         menuBurger.style.right = '-100%';
//     });
// });
</script>

<style scoped>
</style>
