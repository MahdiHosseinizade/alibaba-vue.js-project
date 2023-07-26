<template>
    <Header/>
    <section class="home" id="home">
        <div class="container">
            <img src="@/assets/images/the-last-of-us-hbo-series-character-guide_tyck.jpg" alt="BackGround Image" id="backGroundImg">
            <div class="home-text">
                <span>
                    Movie Website
                    <h1>
                        The <br> last of us
                    </h1>
                    
                    <a href="#" class="btn">Watch Now</a>
                    <a href="#" class="play">
                        <i class="bx bx-play"></i>
                    </a>
                </span>
            </div>
        </div>
    </section>
    <!-- <Search /> -->
    <Series />
    <Movies />
    <Footer />
</template>

<script setup>
    // import Search from '@/components/Search.vue';
    import Header from '@/components/Header.vue';
    import Movies from '@/components/Movies.vue';
    import Series from '@/components/Series.vue';
    import Footer from '@/components/Footer.vue';
</script>