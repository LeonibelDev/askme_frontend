<template>
  <NavbarOptions />
  <div class="pt-20">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavbarOptions from './components/assets/NavbarOptions.vue';
</script>

<style scoped></style>
