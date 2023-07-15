<template>
  <div>
    <header class="header-login">
      <RouterLink to="/" class="logo">
        <i class='bx bxs-movie'></i>IMDB
      </RouterLink>
    </header>
    <main class="loginHeader">
      <header class="header_form">
        <nav class="navBar">
          <ul>
            <li>
              <RouterLink to="login" class="active">
                SignIn
              </RouterLink>
            </li>
            <li>
              <RouterLink to="register">
                Create Account
              </RouterLink>
            </li>
          </ul>
        </nav>
      </header>
      <section class="loginForm">
        <form @submit.prevent="loginHandler">
          <div>
            <label for="username">Username or Email Address</label>
            <input v-model="username" type="text" name="username" id="username" placeholder="Enter your username or email address">
          </div>
          <div>
            <label for="password">Password</label>
            <input v-model="password" type="password" name="password" id="password" placeholder="Enter your password">
          </div>
          <div class="rememberMe">
            <input type="checkbox" name="rememberMe" id="rememberMe">
            <label for="rememberMe">Remember Me</label>
          </div>
          <button class="btn-signIn" type="submit">Log In</button>
          <p>
            <RouterLink to="register">Don't have an account?</RouterLink>
          </p>
        </form>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref,inject } from "vue";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

const login = inject("login");
const username = ref("");
const password = ref("");

async function loginHandler() {
  try {
    await login(username.value, password.value);
    router.replace("/");
  } catch (error) {
    console.log(error);
    alert(error);
  }
}



</script>


<style>
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


:root {
  
  --main-color:#F5C518;
  --text-color:#fff;
  --bg-color:#000000;
}

@font-face {
  font-family: RegularEnglish ;
  src: url(../assets/fonts/Nunito-Regular.ttf);
}
*{
  font-family: RegularEnglish;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-color);
}
::selection{
  color: #020307;
  background-color: #fff;
}

.header-login {
  background-color: var(--main-color);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.header_form{
  width: 100%;
  border-radius: 10px;
  background-color: var(--main-color);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
a{
  text-decoration: none;
}
ul{
  list-style: none;
}
.active{
  border-bottom: 3px solid var(--bg-color);
  transition: all 0.3s ease-in-out !important;
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

.loginHeader {
  width: 500px;
  background-color: var(--bg-color);
  padding: 30px;
  border-radius: 10px;
  color: var(--text-color);
  margin: 0 auto;
  margin-top: 50px;
}

.navBar{
  width: 100%;
}
.navBar ul{
  display: flex;
  flex-direction: row;
  width: 100%;
}
.navBar ul li{
  width: 100%;
  text-align: center;
}

.navBar a{
  color: var(--bg-color);
  text-decoration: none;
}
.navBar a:active{
  color: red;
  border-bottom: #b0afab;
}

.loginForm h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.loginForm form div {
  margin-bottom: 30px;
}

.loginForm label {
  display: block;
  font-size: 1.2rem;
  margin-bottom: 7px;
  text-align: center;
  margin-top: 20px;
}

.loginForm input[type="text"],
.loginForm input[type="password"] {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.rememberMe {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.rememberMe label {
  margin-left: 10px;
  font-size: 1.1rem;
}

button[type="submit"] {
  background-color: var(--bg-color);
  border: 1px solid var(--main-color);
  color: var(--main-color);
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
  margin: 0 auto;
}


button[type="submit"]:hover {
  background-color: var(--main-color);
  color: var(--bg-color);
}

.loginForm p {
  margin-top: 20px;
}

.loginForm a {
  color: var(--main-color);
}

@media screen and (max-width: 557px) {
  /* header styles */
  header {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }

  .header_form{
    width: 96%;
  }

  .logo {
    margin-bottom: 20px;
  }
  .loginForm input[type="text"],
  .loginForm input[type="password"]{
    width: 96%;
  }

  .loginHeader {
    width: 90%;
    padding: 20px;
    margin-top: 30px;
  }

  .loginForm label {
    text-align: left;
    margin-top: 10px;
  }

  .navBar ul{
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
  }

  .navBar ul li{
    margin-left: 0;
  }

}

</style>