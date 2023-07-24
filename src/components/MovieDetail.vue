<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">
  <link rel="icon" type="image/x-icon" href="../assets/img/imdb.png">
  <title>InternalPage</title>
  <header>
    <RouterLink to="/" class="logo">
      <i class='bx bxs-movie'></i>IMDB
    </RouterLink>
  </header>
  <main>
    <section :style="{ backgroundImage: `url(${imageBaseURL}${imageSize}${movieDetail.poster_path})` }"
      class="information">
      <img :src="`${imageBaseURL}${imageSize}${movieDetail.poster_path}`" :alt="movieDetail.title">
      <div class="title">
        <h1>{{ movieDetail.title }}</h1>
        <h4>{{ movieDetail.release_date }} , IMDB : {{ movieDetail.vote_average }}</h4>
        <div class="icons">
          <template v-if="user && user.id">
            <div v-for="item in iconItems" :key="item.text" :data-text="item.text" class="icon">
              <i :class="item.iconClass"></i>
            </div>
          </template>
          <template v-else>
            <div v-for="(item,index) in iconItems" :key="item.text" :data-text="loginText[index]" class="icon">
              <RouterLink to="/login">
                <i :class="item.iconClass"></i>
              </RouterLink>
            </div>
          </template>
        </div>

        <h3>Overview</h3>
        <p>{{ movieDetail.overview }}</p>
      </div>
    </section>
    <section class="list">
      <div class="category">
        <div class="actors">
          <h2>Actors</h2>
          <div class="scroll">
            <section v-for="(actor, index) in cast" :key="index" class="casr-card">
              <img :src="`${imageBaseURL}${imageSize}${actor.profile_path}`" />
              <h4>{{ actor.name }}</h4>
            </section>
          </div>
        </div>
        <section class="reviews">
          <h2 v-if="comments.length">Reviews</h2>
          <div class="scroll">
            <div v-for="(comment, index) in comments" :key="index" class="review">
              <div class="user">
                <img :src="imageComment[index]" />
                <h4>{{ comment.author_details.username }}</h4>
              </div>
              <p>
                {{ comment.content }}
              </p>
            </div>
          </div>
        </section>
      </div>
      <div class="side">
        <h2>More Information</h2>
        <section class="social_links">
          <div class="social">
            <i class="fab fa-facebook-f"></i>
          </div>
          <div class="social">
            <i class="fab fa-twitter"></i>
          </div>
          <div class="social">
            <i class="fab fa-instagram"></i>
          </div>
          <div class="social">
            <i class="fab fa-youtube"></i>
          </div>
        </section>

        <article class="information_side">
          <div class="grid">
            <div>
              <strong><bdi>Status</bdi></strong>
            </div>
            <div>{{ movieDetail.status }}</div>
            <div>
              <strong><bdi>Original Language</bdi></strong>
            </div>
            <div>{{ movieDetail.original_language }}</div>
            <div>
              <strong><bdi>runtime</bdi></strong>
            </div>
            <div>{{ movieDetail.runtime }}</div>
            <div>
              <strong><bdi>revenue</bdi></strong>
            </div>
            <div>{{ movieDetail.revenue }}</div>
          </div>
        </article>
        <section class="keywords_side">
          <h4>Keywords</h4>
          <ul v-for="(genre, index) in movieDetail.genres" :key="index">
            <li>{{ genre.name }}</li>
          </ul>
        </section>
      </div>
    </section>

  </main>
</template>

<script setup>
import { onMounted, ref, inject, computed } from 'vue';
import { useRoute } from 'vue-router';
import { API_READ_ACCESS_TOKEN, BASEURL } from '@/constants/apiConstants';
import { imageBaseURL, imageSize } from '@/constants/imageAPI';
import defaultImage from '@/assets/images/defaultImage.png'

const route = useRoute();
const movieId = ref(route.params.id);
const movieDetail = ref([]);
const user = inject('user');
console.log(user.value);
const cast = ref([]);
const crew = ref([]);
const comments = ref([]);
const imageComment = ref([])

const iconItems = [
  { text: "Add this movie to your watchlist", iconClass: "fas fa-bookmark" },
  { text: "Add this movie to your favorite list", iconClass: "fas fa-heart" },
  { text: "Rate this movie", iconClass: "fas fa-star" }
];

const loginText = computed(() => {
  return iconItems.map(item => "Login to " + item.text);
});


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN} `
  }
};

const getMovieDetaile = async () => {
  const response = await fetch(`${BASEURL}/3/movie/${movieId.value}?language=en-US`, options);
  const data = await response.json();
  movieDetail.value = data;
}
const getActors = async () => {
  const response = await fetch(`${BASEURL}/3/movie/${movieId.value}/credits?language=en-US`, options);
  const data = await response.json();
  cast.value = data.cast;
  crew.value = data.crew;
}

const getComments = async () => {
  const response = await fetch(`${BASEURL}/3/movie/${movieId.value}/reviews?language=en-US&page=1`, options);
  const data = await response.json();
  comments.value = data.results;
  imageComment.value = comments.value.map(comment => {
    const avatarPath = comment.author_details.avatar_path;
    if (avatarPath && avatarPath !== 'null') {
      return avatarPath.substring(1);
    }
    return defaultImage;
  });
};


onMounted(
  async () => {
    await getMovieDetaile();
    await getActors();
    await getComments();
  }
)

</script>












<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,600&display=swap');

@font-face {
  font-family: RegularEnglish;
  src: url(../assets/fonts/Nunito-Regular.ttf);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', 'Trebuchet MS', sans-serif;
  font-family: RegularEnglish;
  text-decoration: none;
  list-style: none;
  scroll-behavior: smooth;
}

::selection {
  color: #020307;
  background-color: #fff;
}

html::-webkit-scrollbar {
  width: 0.5rem;
  background-color: var(--bg-color);
}

html::-webkit-scrollbar-thumb {
  background-color: var(--main-color);
  border-radius: 5;
}


:root {
  --main-color: #F5C518;
  --text-color: #fff;
  --bg-color: #020307;
}

header {
  background-color: var(--main-color);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  width: 100%;
  z-index: 10000;
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

html,
body {
  margin: 0;
  box-sizing: border-box;
  padding: 0;
}

::selection {
  color: #020307;
  background-color: #fff;
}

.information {
  background-color: var(--bg-color);
  position: relative;
  width: 100%;
  min-height: 550px;
  height: auto;
  background-position-x: center;
  background-size: cover;
  background-repeat: no-repeat;
  /* background-image: url({movieDetail.poster_path}); */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.information::before {
  content: " ";
  background-color: rgba(199.5, 199.5, 157.5, 0.84);
  opacity: 0.9;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}

.information>img {
  width: 300px;
  height: 450px;
  border-radius: 10px;
  z-index: 1000;
}

.information>div {
  min-width: 400px;
  margin-left: 60px;
  z-index: 1000;
  width: 800px
}

.title>h1 {
  margin: 6px 0;
}

.title>h4 {
  margin-bottom: 20px;
  font-size: 12px;
}

.title>h3 {
  margin: 25px 0px;
}

.icons {
  display: flex;
  width: 200px;
  justify-content: space-between;
}

.icon {
  width: 46px;
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

.icon:hover {
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


.actors {
  padding: 30px;
  align-self: center;
  color: var(--text-color-color);
}

.reviews {
  padding: 30px;
  align-self: center;
  color: var(--bg-color);
}

.reviews h2 {
  color: var(--text-color);
}

.scroll {

  white-space: nowrap;
  overflow-y: scroll;

}

.casr-card {
  margin-right: 1%;
}

.scroll::-webkit-scrollbar {}

.scroll section {
  width: 225px;
  display: inline-block;
  flex-direction: column;
  align-items: center;

}

.scroll img {
  /* width: 100%; */
  width: 225px;
  position: relative;
  /* min-width:140px;
    min-height: 210px; */
  border-radius: 10px;
  background-color: rgb(169, 166, 151);
  margin: 10px 20px 0 0;
  height: 300px;

}

.scroll h4 {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-right: 12%;
}

.user {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user>h4 {
  margin-left: 20px;
}

.list {
  display: flex;
  width: 100%;
}

.side h2 {
  margin: 20px 0;
  text-align: center;
  font-weight: 500;
  color: var(--bg-color);
}

.side {
  min-width: 360px;
  height: fit-content;
  background-color: var(--text-color);
  box-shadow: -20px 0px 8px -8px rgba(117, 117, 117, 0.1);

}

.social_links {
  display: flex;
  justify-content: space-around;
}

.social_links .social {
  width: 40px;
  height: 40px;
  background-color: #dadada;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--bg-color);
}

.information_side .grid {
  color: var(--bg-color);
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

.keywords_side {
  margin-top: 30px;
  margin-left: 10px;
  margin-bottom: 1px solid var(--bg-color);
  margin-bottom: 30px;
}

.keywords_side h4 {
  font-size: 1.1em;
  font-weight: 400;
  margin-bottom: 10px;
}

.keywords_side ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 10px;
  justify-content: flex-start;
}

.keywords_side ul li {
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

bdi {
  margin-left: 8%;
}

.category {
  width: calc(100vw - 380px);
}

.review {
  padding: 20px;
  min-width: 360px;
  height: 190px;
  border-radius: 10px;
  background-color: #ffffff;
  margin: 30px 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.scroll>img::after {
  content: " ";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.8;
}

.scroll::-webkit-scrollbar {
  display: none;
}

.review img {
  width: 60px;
  height: 60px;
  background-color: #032541;
  border-radius: 50%;
}

.review p {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
}

@media screen and (max-width:1000px) {

  .list {
    flex-direction: column;
  }

  .category {
    width: 100%;
  }
}

@media only screen and (max-width:800px) {

  /* .side{
        display: none;
    } */
  .category {
    width: 100%;
  }

  .scroll {
    justify-content: start;
  }

  .title {
    margin-top: 30px;
  }

  .information {
    padding: 30px 0;
  }
}

@media only screen and (max-width:500px) {

  .information {
    justify-content: center;
  }

  .title>h1 {
    font-size: 20px;
  }

  .information>div {
    min-width: 300px;
    width: 380px;
    padding: 10px;
  }

  .title>h3 {
    margin-left: 0;
  }
}
</style>