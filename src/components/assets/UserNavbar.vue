<template>
    <header class="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/70 border-b border-gray-200 user-menu-bar">
        <nav class="max-w-6xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <!-- Logo + Nombre -->
                <router-link to="/blog" class="flex items-center gap-2 no-underline">
                    <div
                        class="w-7 h-7 flex items-center justify-center rounded-sm bg-gray-900 text-white font-semibold">
                        <!-- Play Icon -->
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4">
                            <path
                                d="M16.7519 11.1679L10.5547 7.03647C9.89015 6.59343 9 7.06982 9 7.86852V16.1315C9 16.9302 9.89015 17.4066 10.5547 16.9635L16.7519 12.8321C17.3457 12.4362 17.3457 11.5638 16.7519 11.1679Z"
                                stroke="#fff" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <!-- Nombre del blog -->
                    <div class="hidden md:flex flex-col leading-tight">
                        <span class="text-sm font-semibold text-gray-900">MyTechBlog<span
                                class="text-xs text-gray-400">.dev</span></span>
                    </div>

                </router-link>
            </div>

            <!-- Buscador Desktop -->
            <div class="flex-1 px-4 hidden md:flex justify-center">
                <div class="w-full max-w-md">
                    <label class="relative block">
                        <span class="sr-only">Search</span>
                        <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10.5" cy="10.5" r="6.5" stroke="#000000" stroke-linejoin="round" />
                                <path
                                    d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z"
                                    fill="#000000" />
                            </svg>
                        </span>
                        <input v-model="query" @keydown.enter.prevent="onSearch" type="search"
                            placeholder="Search posts, authors..."
                            class="w-full pl-10 pr-3 py-2 text-sm bg-white/60 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300" />
                    </label>
                </div>
            </div>

            <!-- Acciones -->
            <div class="flex items-center gap-3">
                <router-link to="/blog/new"
                    class="hidden md:inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 hover:shadow-sm">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    New
                </router-link>

                <!-- Botón Notificaciones -->
                <button @click="toggleQuick" class="p-2 rounded-md hover:bg-gray-100 focus:outline-none">
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button>

                <!-- Menú Usuario -->
                <div class="relative" ref="menuRef">
                    <button @click="toggleMenu"
                        class="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 focus:outline-none">
                        <img v-if="user.avatar" :src="user.avatar" alt="avatar"
                            class="w-7 h-7 rounded-sm object-cover" />
                        <div v-else
                            class="w-7 h-7 bg-gray-300 rounded-sm flex items-center justify-center text-sm text-gray-700">
                            {{ AbbName(user.name) }}
                        </div>
                        <svg class="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <div v-if="isMenuOpen"
                        class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                        <router-link to="/profile"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</router-link>
                        <router-link to="/settings"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</router-link>
                        <button @click="logout"
                            class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Log out</button>
                    </div>
                </div>

                <!-- Botón menú móvil -->
                <button @click="mobileOpen = !mobileOpen"
                    class="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none">
                    <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path v-if="!mobileOpen" d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"
                            stroke-linejoin="round" stroke-width="2" />
                        <path v-else d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2" />
                    </svg>
                </button>
            </div>
        </nav>

        <!-- Menú móvil -->
        <transition name="slide-fade">
            <div v-if="mobileOpen" class="md:hidden border-t border-gray-200 bg-white/90">
                <div class="px-4 py-3 flex flex-col gap-2">
                    <router-link to="/blog" class="py-2">Blog</router-link>
                    <router-link to="/blog/new" class="py-2">New Post</router-link>
                    <router-link to="/profile" class="py-2">Profile</router-link>
                </div>
            </div>
        </transition>
    </header>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const query = ref('')
const isMenuOpen = ref(false)
const mobileOpen = ref(false)
const user = ref({ avatar: null, name: localStorage.getItem('user') || 'U' })
const menuRef = ref(null)
const router = useRouter()

function onSearch() {
    if (!query.value) return
    router.push({ path: '/search', query: { q: query.value } })
}

function logout() {
    if (confirm('Are you sure you want to log out?')) {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }
}

function toggleQuick() {
    alert('Quick actions')
}

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
}

function AbbName() {
    if (user.value.name.length > 1) {
        return user.value.name.split(" ")[0].charAt(0).toUpperCase() + user.value.name.split(" ")[1].charAt(0).toUpperCase()
    }
    return user.value.name.charAt(0).toUpperCase()
}

function handleClickOutside(e) {
    if (menuRef.value && !menuRef.value.contains(e.target)) {
        isMenuOpen.value = false
    }
}

function onKey(e) {
    if (e.key === 'Escape') {
        isMenuOpen.value = false
        mobileOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('keydown', onKey)
})
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all .18s ease;
}

.slide-fade-enter-from {
    opacity: 0;
    transform: translateY(-6px)
}

.slide-fade-enter-to {
    opacity: 1;
    transform: translateY(0)
}

.slide-fade-leave-from {
    opacity: 1;
    transform: translateY(0)
}

.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-6px)
}
</style>