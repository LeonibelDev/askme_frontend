<template>
    <header class="w-full bg-white flex-col fixed backdrop-blur bg-white/80 z-50">
        <nav class="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
            <!-- Logo -->
            <router-link to="/blog" class="text-lg font-semibold text-gray-900 tracking-tight">
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

                <router-link to="/blog/new"
                    class="text-sm font-medium text-gray-700 hover:text-[#16a34a] transition-colors">
                    New Post
                </router-link>

                <router-link to="/profile" class="text-sm font-medium text-gray-700 hover:text-black transition-colors">
                    My Profile
                </router-link>

                <button @click="logout"
                    class="bg-red-500 text-white text-sm px-3 py-2 rounded-full hover:bg-red-600 transition-all">
                    <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
                </button>
            </div>
        </nav>

        <!-- Mobile menu dropdown -->
        <div v-if="isOpen" class="md:hidden px-6 pb-4 flex flex-col gap-2">
            <router-link to="/blog" class="text-gray-700 hover:text-black text-sm font-medium transition-colors">
                Blog
            </router-link>
            <router-link to="/blog/new"
                class="text-sm font-medium text-gray-700 hover:text-[#16a34a] transition-colors">
                New Post
            </router-link>
            <router-link to="/profile" class="text-sm font-medium text-gray-700 hover:text-black transition-colors">
                My Profile
            </router-link>
            <button @click="logout" class="text-white text-sm px-3 py-2 rounded-full transition-all">
                <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
            </button>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faRightFromBracket)

const isOpen = ref(false)

const logout = () => {
    if (confirm("Are you sure you want to log out?")) {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
}
</script>

<script>
</script>