<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">
  <link rel="icon" type="image/x-icon" href="../assets/img/imdb.png">
  <title>InternalPage</title>
  <header class="bg-yellow-400 z-50 text-white flex justify-between items-center p-2 w-full ">
      <RouterLink to="/" class="text-3xl font-bold no-underline text-white px-2 py-2.5 bg-black rounded-xl ">
        <i class='bx bxs-movie text-4xl mr-2.5'></i>IMDB
      </RouterLink>
      <RouterLink to="/profile" class="person-icon">
        <span
          class="bg-yellow-100 text-black text-sm font-medium mr-2 px-2.5 py-1 rounded dark:bg-gray-400 dark:text-balck hover:cursor-pointer">{{
            user && user.username ? user.username : '' }}</span>
      </RouterLink>
    </header>
  <main>
    <section :style="{ backgroundImage: `url(${imageBaseURL}${imageSize}${movieDetail.poster_path})` }"
      class="information">
      <img :src="`${imageBaseURL}${imageSize}${movieDetail.poster_path}`" :alt="movieDetail.title">
      <div class="title text-black">
        <h1 class="font-bold">{{ movieDetail.title }}</h1>
        <h4>{{ movieDetail.release_date }} , IMDB : {{ movieDetail.vote_average }}</h4>
        <div class="flex w-48 justify-between icons">
          <template v-if="user && user.id">
            <div v-for="item in iconItems" :key="item.text" :data-text="item.text" class="icon">
              <i :class="item.iconClass" @click="addMovieToWatchList"></i>
            </div>
          </template>
          <template v-else>
            <div v-for="(item, index) in iconItems" :key="item.text" :data-text="loginText[index]" class="icon">
              <RouterLink to="/login" v-if="item.text === 'Add this movie to your watchlist'">
                <i :class="item.iconClass"></i>
              </RouterLink>
              <div v-else>
                <i :class="item.iconClass"></i>
              </div>
            </div>
          </template>
        </div>
        <h3 class="font-bold">Overview</h3>
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
        <h2 class="font-bold text-black text-center my-5">More Information</h2>
        <section class=" flex justify-around">
          <div
            class="social w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center cursor-pointer text-black">
            <i class="fab fa-facebook-f"></i>
          </div>
          <div
            class="social w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center cursor-pointer text-black">
            <i class="fab fa-twitter"></i>
          </div>
          <div
            class="social w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center cursor-pointer text-black">
            <i class="fab fa-instagram"></i>
          </div>
          <div
            class="social w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center cursor-pointer text-black">
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
        <section class="keywords_side mt-8 ml-2 mb-8">
          <h4 class="text-black text-lg font-normal mb-4">Keywords</h4>
          <ul class="flex flex-wrap pb-4">
            <li v-for="(genre, index) in movieDetail.genres" :key="index"
              class="mr-2 mb-4 leading-6 text-sm bg-gray-200 border border-gray-200 text-gray-700 px-2 py-1 rounded">
              {{ genre.name }}
            </li>
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
import { useToast } from 'vue-toastification';

const route = useRoute();
const movieId = ref(route.params.id);
const movieDetail = ref([]);
const user = inject('user');
const cast = ref([]);
const crew = ref([]);
const comments = ref([]);
const imageComment = ref([])


const toast = useToast();

const iconItems = [
  { text: "Add this movie to your watchlist", iconClass: "fas fa-bookmark" },
  { text: "Add this movie to your favorite list", iconClass: "fas fa-heart" },
  { text: "Rate this movie", iconClass: "fas fa-star" }
];

const loginText = computed(() => {
  return iconItems.map(item => "Login to " + item.text);
});

const addMovieToWatchList = () => {
  const session_id = sessionStorage.getItem('session_id');
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`
    },
    body: JSON.stringify({
      media_type: 'movie',
      media_id: movieId.value,
      watchlist: true
    })
  };
  fetch(`${BASEURL}/3/account/${user.value.id}/watchlist?session_id=${session_id}`, options)
    .then((response) => response.json())
    .then((data) => {
      toast.success('Movie added to watchlist successfully');
    });

}

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
    if (avatarPath) {
      if (avatarPath.includes('http')) {
        return avatarPath.substring(1);
      }
      return `${imageBaseURL}${imageSize}/${avatarPath.substring(1)}`;
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

.information {
  background-color: var(--bg-color);
  position: relative;
  width: 100%;
  min-height: 550px;
  height: auto;
  background-position-x: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  z-index:30
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
  width: 225px;
  position: relative;
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
}

.side {
  min-width: 360px;
  height: fit-content;
  background-color: var(--text-color);
  box-shadow: -20px 0px 8px -8px rgba(117, 117, 117, 0.1);

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