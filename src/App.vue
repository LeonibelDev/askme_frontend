<template>
  <NavbarOptions />
  <div>
    <RouterView class="mt-20" />
  </div>
  <FooterComponent />

</template>

<script setup>
import { RouterView } from 'vue-router'
import NavbarOptions from './components/assets/NavbarOptions.vue'
import FooterComponent from './components/assets/FooterComponent.vue'
</script>

<style>
html,
body {
  overflow-x: hidden;
  /* evita scroll horizontal en toda la app */
}

#app {
  overflow-x: hidden;
  max-width: 100%;
}

@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

.title,
.subtitle {
  font-family: Montserrat;
  font-size: normal;
  font-weight: 600;
}

.text {
  font-family: "IBM Plex Sans";
}

.title:hover {
  text-decoration: none;
}
</style>
