<template>
    <header class="w-full bg-white flex-col fixed backdrop-blur bg-white/80 z-50">
        <nav class="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
            <!-- Logo -->
            <router-link to="/" class="text-lg font-semibold text-gray-900 tracking-tight">
                MyTechBlog
            </router-link>

            <!-- Mobile menu button -->
            <button @click="isOpen = !isOpen" class="md:hidden focus:outline-none">
                <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                    <path v-if="!isOpen" d="M4 6h16M4 12h16M4 18h16" />
                    <path v-else d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <!-- Desktop links -->
            <div class="hidden md:flex items-center gap-4">
                <router-link to="/blog" class="text-gray-700 hover:text-black text-sm font-medium transition-colors">
                    Blog
                </router-link>

                <router-link to="/login"
                    class="text-sm font-medium text-gray-700 hover:text-[#16a34a] transition-colors">
                    Login
                </router-link>

                <router-link to="/signup"
                    class="bg-[#16a34a] text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-[#15803d] transition-all">
                    Sign Up
                </router-link>
            </div>
        </nav>

        <!-- Mobile dropdown -->
        <div v-if="isOpen" class="md:hidden px-6 pb-4 flex flex-col gap-2">
            <router-link to="/blog" class="text-gray-700 hover:text-black text-sm font-medium transition-colors">
                Blog
            </router-link>
            <router-link to="/login" class="text-sm font-medium text-gray-700 hover:text-[#16a34a] transition-colors">
                Login
            </router-link>
            <router-link to="/signup"
                class="bg-[#16a34a] text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-[#15803d] transition-all w-fit">
                Sign Up
            </router-link>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
</script>