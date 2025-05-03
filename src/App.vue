<template>
  <GuestNavbar />
  <div class="pt-20">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import GuestNavbar from './components/assets/GuestNavbar.vue';
</script>

<style scoped></style>
