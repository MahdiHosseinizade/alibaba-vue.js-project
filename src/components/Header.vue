<template>
    <header>
        <a href="" class="headerLogo">
            <i class='bx bxs-movie'></i>IMDB
        </a>

        <ul class="navbar">
            <li><a href="#home">Home</a></li>
            <li><RouterLink to="watchlist">Watchlist</RouterLink></li>
            <li><RouterLink to="profile">Profile</RouterLink></li>
            <li><RouterLink to="search">Search</RouterLink></li>
        </ul>
        <div class="cc">
            <div v-if="!user">
                <RouterLink  to="login" class="signInbtn">Sign In</RouterLink>
            </div>
            <div v-else class="flex ml-8 items-center space-x-4">
                <RouterLink  to="profile">
                    <span class="bg-yellow-100 text-black text-sm font-medium mr-2 px-2.5 py-1 rounded dark:bg-yellow-400 dark:text-balck hover:cursor-pointer" >{{ user && user.username ? user.username : '' }}</span>
                </RouterLink>
            </div>
        </div>

        <div class="menuBurger" ref="menuBurgerRef">
            <ul>
                <li><a class="fas fa-times close-hamburger"></a></li>
                <li v-if="!user">
                    <RouterLink to="login">Sign In</RouterLink>
                </li>
                <div v-else>
                    <li><a>Profile</a></li>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#movies">Series</a></li>
                    <li><a href="#coming">Movie</a></li>
                    <li><a href="#search">Search</a></li>
                </div>
            </ul>
        </div>
    </header>
</template>

<script setup>
import { inject, ref } from 'vue';
import { RouterLink } from 'vue-router';
const user = inject('user');
const menuBurgerRef = ref(null);




const openMenu = () => {
    menuBurgerRef.value.style.display = 'block';
};

</script>

<style scoped></style>
