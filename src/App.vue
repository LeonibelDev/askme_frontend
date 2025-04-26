<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <nav class="">
      <div class="max-w-4xl mx-auto px-8 py-8 flex justify-between items-center">
        <!-- Mobile Menu Button -->
        <button @click="isOpen = !isOpen" class="md:hidden text-black focus:outline-none">
          Menu
        </button>
        <!-- Desktop Links -->
        <div class="hidden md:flex space-x-6">
          <RouterLink to="/blog" class="text-black hover:text-gray-700 transition">Home</RouterLink>
          <RouterLink to="/blog/new" class="text-black hover:text-gray-700 transition">New</RouterLink>
        </div>
        <!-- Desktop Buttons -->
        <div class="hidden md:flex space-x-4">
          <RouterLink to="/login"
            class="px-4 py-2 rounded-full border border-black text-black font-medium hover:bg-gray-100 transition">
            Login
          </RouterLink>
          <RouterLink to="/signup"
            class="px-4 py-2 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition">
            Sign Up
          </RouterLink>
        </div>
      </div>
      <!-- Mobile Menu Dropdown -->
      <div v-if="isOpen" class="md:hidden bg-white px-8 pb-4 flex flex-col space-y-4">
        <RouterLink to="/" class="text-black hover:text-gray-700 transition">Home</RouterLink>
        <RouterLink to="/about" class="text-black hover:text-gray-700 transition">About</RouterLink>
        <RouterLink to="/blog" class="text-black hover:text-gray-700 transition">Blog</RouterLink>
        <RouterLink to="/contact" class="text-black hover:text-gray-700 transition">Contact</RouterLink>
        <div class="flex space-x-4 pt-2">
          <RouterLink to="/login"
            class="px-4 py-2 rounded-full border border-black text-black font-medium hover:bg-gray-100 transition">
            Login
          </RouterLink>
          <RouterLink to="/signup"
            class="px-4 py-2 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition">
            Sign Up
          </RouterLink>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-1 p-6">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const isOpen = ref(false)
</script>

<style scoped></style>
