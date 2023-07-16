<template>
    <header>
        <a href="" class="headerLogo">
            <i class='bx bxs-movie'></i>IMDB
        </a>

        <ul class="navbar">
            <li><a href="#home">Home</a></li>
            <li><a href="#movies">Series</a></li>
            <li><a href="#coming">Movie</a></li>
            <li><a href="#search">Search</a></li> 
        </ul>
        <div class="cc">
           <RouterLink v-if="!user || !user.value || !user.value.id" to="login" class="signInbtn">Sign In</RouterLink>
           <h3 v-else >Profile</h3>
           <div class="icon" @click="openMenu">
              <span class="fas fa-bars"></span>
            </div>
        </div>

        <div class="menuBurger" ref="menuBurgerRef">
            <ul>
                <li><a class="fas fa-times close-hamburger"></a></li>
                <li v-if="!user || !user.value || !user.value.id"><RouterLink to="login">Sign In</RouterLink></li>
                <li v-else ><h3>Profile</h3></li>
                <li><a href="#home">Home</a></li>
                <li><a href="#movies">Series</a></li>
                <li><a href="#coming">Movie</a></li>
                <li><a href="#search">Search</a></li>
            </ul>
        </div>
    </header>
</template>

<script setup>
import { inject, ref } from 'vue';
import { RouterLink } from 'vue-router';
const user = inject('user');
console.log(user);
const menuBurgerRef = ref(null);




const openMenu = () =>{
    menuBurgerRef.value.style.display = 'block';
};

</script>

<style scoped>
</style>
