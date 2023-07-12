<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">
    <link rel="icon" type="image/x-icon" href="../assets/img/imdb.png">
    <title>InternalPage</title>
    <header>
        <RouterLink to="/">
            <i class="bx bxs-movie"></i>IMDB
        </RouterLink>
    </header>
    <main>
        <section class="information">
            <img :src="`${imageBaseURL}${imageSize}${movieDetail.poster_path}`" :alt="movieDetail.title">
            <div class="title">
                <h1 >{{ movieDetail.title }}</h1>
                <h4>{{ movieDetail.release_date }} , IMDB : {{ movieDetail.vote_average }}</h4>
                <!-- <h4>04/21/2023 (US). Action, Drama, War. 2h 3m</h4> -->
                <div class="icons">
                    <div data-text="Login to add this movie to your watchlist" class="icon">
                        <i  class="fas fa-save"></i>
                    </div>
                    <div data-text="Login to add this movie to your favorite list" class="icon">
                        <i class="fas fa-heart"></i>
                    </div>
                    <div data-text="Login to rate this movie" class="icon">
                        <i class="fas fa-star"></i>
                    </div>
                </div>
                <h3>Overview</h3>
                <p>{{ movieDetail.overview }}</p>
            </div>
        </section>
        
    </main>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import {ACCESS_TOKEN,BASEURL} from '../constants/apiConstants';
import { imageBaseURL, imageSize } from '../constants/imageAPI';
const route = useRoute();
const movieId = ref(route.params.id);
const movieDetail = ref([]);
// console.log(movieId.value);
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN} `
  }
};

const getMovieDetaile =  async () => {
    const response = await fetch (`${BASEURL}/3/movie/${movieId.value}?language=en-US`,options);
    const data = await response.json();
    movieDetail.value = data;
    console.log(movieDetail.value);
}
onMounted(getMovieDetaile)
</script>












<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,600&display=swap');

@font-face {
    font-family: RegularEnglish ;
    src: url(../assets/fonts/Nunito-Regular.ttf);
}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', 'Trebuchet MS',sans-serif;
  font-family: RegularEnglish;
    text-decoration: none;
    list-style:none;
    scroll-behavior: smooth;
}
::selection{
    color: #020307;
    background-color: #fff;
}
html::-webkit-scrollbar{
    width: 0.5rem;
    background-color:var(--bg-color);
}
html::-webkit-scrollbar-thumb{
    background-color: var(--main-color);
    border-radius: 5;
}


:root{
    --main-color:#F5C518;
    --text-color:#fff;
    --bg-color:#020307;
}

header {
  background-color: var(--main-color);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  /* border-radius: 10px; */
  width: 100%;
}

.logo {
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
  color: var(--text-color);
  padding: 8px 10px;
  border-radius: 10px;
  background-color: var(--bg-color);
}

.logo i {
  font-size: 2.5rem;
  margin-right: 10px;
}
html,body{
    margin: 0;
    box-sizing: border-box;
    padding: 0;
}

::selection{
  color: #020307;
  background-color: #fff;
}
.information{
  background-color: var(--bg-color);
    position: relative;
    width:100%;
    min-height: 550px;
    height: auto;
    background-position-x: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('../assets/img/bg.jpg');
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.information::before{
    content: " ";
    background-color: rgba(199.5, 199.5, 157.5, 0.84);
    opacity: 0.9;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  }
  .information>img{
    width: 300px;
    height: 450px;
    border-radius: 10px;
    z-index: 1000;
  }
  .information>div{
    min-width: 400px;
    margin-left: 60px;
    z-index: 1000;
    width:800px
  }
  .title>h1{
    margin: 6px 0;
  }
  .title>h4{
    margin-bottom: 20px;
    font-size: 12px;
  }
  .title>h3{
    margin: 25px 0px;
  }
  .icons{
    display: flex;
    width:200px;
    justify-content: space-between;
  }
  .icon{
    width:46px;
    height: 46px;
    background-color: var(--bg-color);
    color: var(--main-color);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative; 
  }
  .icon:hover{
    color: var(--bg-color);
    background-color: var(--main-color);
  }
  .icons .icon:hover::before {
    content: attr(data-text);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #000;
    color: #fff;
    padding: 5px;
    font-size: 14px;
    white-space: nowrap;
    border-radius: 10px;
  }
  

  .actors,.reviews{
    padding:30px;
    align-self: center;
  }
  .scroll{
   
    white-space: nowrap;
    overflow-y: scroll;

  }.scroll::-webkit-scrollbar{
    
  }
  .scroll section{
    width: 225px;
    display: inline-block;
    flex-direction: column;
    align-items: center;
    
  }
  .scroll img{
    /* width: 100%; */
    width: 225px;
    position: relative;
    /* min-width:140px;
    min-height: 210px; */
    border-radius: 10px;
    background-color: blueviolet;
    margin: 10px 20px 0 0;
    height: 300px;

  }

  .scroll h4{
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-right: 12%;
  }
  
  .user{
    display: flex;
     align-items: center;
     margin-bottom: 10px;
  }
  .user>h4{
    margin-left: 20px;
  }
  .list{
    display: flex;
    width: 100%;
  }
  .side h2{
    margin: 20px 0;
    text-align: center;
    font-weight: 500;
  }
  .side {
    min-width: 360px;
    height: fit-content;
    background-color: var(--text-color);
    box-shadow:  -20px 0px 8px -8px rgba(117, 117, 117, 0.1);
    
  }
  
  .social_links{
    display: flex;
    justify-content: space-around;
  }
  .social_links .social{
    width: 40px;
    height: 40px;
    background-color: #dadada;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .information_side .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 10px;
    margin-top: 5%;
  }
  
  .information_side .grid div {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  .keywords_side{
    margin-top: 30px;
    margin-left: 10px;
    margin-bottom: 1px solid var(--bg-color);
    margin-bottom: 30px;
  }
  .keywords_side h4{
    font-size: 1.1em;
    font-weight: 400;
    margin-bottom: 10px;
  }
  .keywords_side ul{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 30px;
    justify-content: flex-start;
  }
  .keywords_side ul li{
    margin-right: 5px;
    margin-bottom: 10px;
    line-height: 24px;
    box-sizing: border-box;
    white-space: nowrap;
    font-size: 0.9em;
    background-color: var(--bg-color);
    border: 1px solid var(--bg-color);
    color: var(--text-color);
    padding: 5px 10px;
    border-radius: 5px;
  }
  bdi{
    margin-left: 8%;
  }
  .category{
    width: calc(100vw - 380px);
  }
  .review{
    padding: 20px;
    min-width:360px;
    height: 190px;
    border-radius: 10px;
    background-color: #ffffff;
    margin:30px 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .scroll>img::after{
    content: " ";
    width:100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    background-color: black;
    opacity:0.8;
  }
  .scroll::-webkit-scrollbar{
    display: none;
  }
  .review img{
    width:60px;
    height: 60px;
    background-color: #032541;
    border-radius: 50%;
  }
  .review p{
    display: -webkit-box;
    overflow : hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical; 
  }
  @media screen and (max-width:1000px) {
    
    .list{
      flex-direction: column;
    }
    .category{
      width: 100%;
    }
  }
  @media only screen and (max-width:800px) {
    /* .side{
        display: none;
    } */
    .category{
        width: 100%;
    }
    .scroll{
        justify-content: start;
    }
    .title{
        margin-top: 30px;
    }
    .information{
        padding: 30px 0;
    }
  }
  @media only screen and (max-width:500px) {
    
    .information{
        justify-content: center;
    }
    .title>h1{
        font-size: 20px;
    }
    .information>div{
        min-width: 300px;
        width: 380px;
        padding: 10px;
    }
    .title>h3{
        margin-left: 0;
    }
  }
</style>