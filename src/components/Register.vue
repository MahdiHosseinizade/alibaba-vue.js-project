<template>
  <div>
    <header class="header-register">
      <RouterLink to="/" class="logo">
        <i class='bx bxs-movie'></i>IMDB
      </RouterLink>
    </header>
    <main class="registerHeader">
      <header class="header_form">
        <nav class="navBar">
          <ul>
            <li>
              <RouterLink to="login">
                SignIn
              </RouterLink>
            </li>
            <li>
              <RouterLink to="register" class="active">
                Create Account
              </RouterLink>
            </li>
          </ul>
        </nav>
      </header>
      <section class="registerForm">
        <div style="text-align: center;">
          <h2>Register on The Movie DB</h2>
          <p>To register on the site you should create an account on the Movie DB</p>
          <a href="https://www.themoviedb.org/signup" class="registerButton">Register</a>
        </div>
        <p style="text-align: center; margin-top: 40px;">
            <RouterLink to="login">Already have an account ?</RouterLink>
        </p>
      </section>
    </main>
  </div>
</template>


<script setup>

</script>

<style scoped>
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

.header-register {
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

.registerHeader {
  width: 500px;
  background-color: var(--bg-color);
  padding: 30px;
  border-radius: 10px;
  color: var(--text-color);
  margin: 0 auto;
  margin-top: 50px;
}
.registerButton{
  margin-top: 20px;
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

.registerForm {
  width: 100%;
  margin-top: 50px;
}

.registerForm p {
  margin-top: 25px;
}

.registerForm a {
  color: var(--main-color);
}

@media screen and (max-width: 557px) {
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


  .registerHeader {
    width: 90%;
    padding: 20px;
    margin-top: 30px;
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