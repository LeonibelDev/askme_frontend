<template>
    <main class="flex min-h-screen flex-col bg-white">
        <!-- Profile Section -->
        <section class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
            <!-- Username + Joined Date -->
            <div class="flex items-center justify-center flex-wrap gap-2 text-gray-500 text-sm mb-4">
                <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                    @{{ profile.username }}
                </span>
                <span>Joined {{ profile.joined }}</span>
            </div>

            <!-- Fullname + Verified -->
            <h1
                class="text-4xl md:text-5xl font-extrabold text-center mb-6 leading-tight flex items-center justify-center gap-2">
                {{ profile.fullname }}
                <CheckCircle v-if="profile.verified" class="w-8 h-8 text-blue-500" title="Verificado" />
            </h1>

            <!-- Avatar -->
            <div class="flex justify-center mb-4">
                <img v-if="profile.avatar" :src="profile.avatar" alt="Avatar"
                    class="w-40 h-40 rounded-full object-cover border-4 border-gray-100 shadow-md" />
                <div v-else
                    class="w-40 h-40 rounded-full bg-gray-800 text-white flex items-center justify-center text-5xl font-bold">
                    {{ profile.fullname.charAt(0).toUpperCase() }}
                </div>
            </div>

            <!-- Bio -->
            <p class="text-lg leading-8 text-gray-800 text-center mb-6 whitespace-pre-line">
                {{ profile.bio }}
            </p>

            <!-- Stats -->
            <div class="flex justify-center gap-8 mb-6">
                <div class="text-center">
                    <span class="block text-lg font-bold">{{ stats.posts }}</span>
                    <span class="text-gray-500 text-sm">Posts</span>
                </div>
                <div class="text-center">
                    <span class="block text-lg font-bold">{{ stats.followers }}</span>
                    <span class="text-gray-500 text-sm">Followers</span>
                </div>
                <div class="text-center">
                    <span class="block text-lg font-bold">{{ stats.following }}</span>
                    <span class="text-gray-500 text-sm">Following</span>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-center gap-4 mb-8">
                <button
                    class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition">
                    Follow
                </button>
                <button
                    class="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-100 transition">
                    Message
                </button>
            </div>

            <!-- Social Links -->
            <div class="flex justify-center gap-6 mb-12">
                <a v-if="profile.twitter" :href="profile.twitter" target="_blank" class="hover:scale-110 transition">
                    <Twitter class="w-6 h-6 text-gray-500" />
                </a>
                <a v-if="profile.github" :href="profile.github" target="_blank" class="hover:scale-110 transition">
                    <Github class="w-6 h-6 text-gray-500" />
                </a>
                <a v-if="profile.instagram" :href="profile.instagram" target="_blank"
                    class="hover:scale-110 transition">
                    <Instagram class="w-6 h-6 text-gray-500" />
                </a>
                <a v-if="profile.external" :href="profile.external" target="_blank" class="hover:scale-110 transition">
                    <ExternalLink class="w-6 h-6 text-gray-500" />
                </a>
            </div>
        </section>

        <!-- Posts Section -->
        <section class="max-w-3xl mx-auto px-4 sm:px-6 py-[40px] space-y-5">
            <router-link v-for="post in posts" :key="post.id" :to="`/blog/${post.id}`"
                class="flex flex-col md:flex-row items-center md:items-start gap-8 pb-10 last:pb-0 hover:bg-gray-50 rounded-lg transition">
                <!-- Cover Image -->
                <img v-if="post.cover" :src="post.cover" alt="Cover Image"
                    class="w-full md:w-44 h-32 object-cover object-center rounded-lg shadow-sm mx-auto md:mx-0"
                    loading="eager" />

                <!-- Texts -->
                <div class="flex-1 space-y-4">
                    <div class="space-y-2">
                        <!-- Author + Date -->
                        <div class="text-xs text-gray-500 flex items-center gap-2 justify-center md:justify-start">
                            <span class="text-gray-700 font-medium">{{ post.fullname }}</span>
                            <span>•</span>
                            <span>{{ formatDate(post.date) }}</span>
                        </div>

                        <!-- Title -->
                        <h2
                            class="text-[1.4rem] md:text-[1.6rem] font-extrabold text-black leading-tight hover:underline text-center md:text-left title">
                            {{ post.title }}
                        </h2>

                        <!-- Excerpt -->
                        <p class="text-gray-700 text-base leading-snug text-center md:text-left text">
                            {{ getExcerpt(post.excerpt, 100) }}
                        </p>
                    </div>

                    <!-- Tags + Bookmark -->
                    <div class="flex flex-wrap gap-2 pt-2 justify-center md:justify-start items-center">
                        <div class="flex flex-wrap gap-2">
                            <span v-for="tag in post.tags" :key="tag"
                                class="bg-[#f0fdf4] text-[#15803d] px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                                {{ tag }}
                            </span>
                        </div>

                        <button @click.stop="toggleBookmark(post)" class="flex items-center justify-center">
                            <Bookmark class="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                </div>
            </router-link>
        </section>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { API_URL } from '@/config'
import { Twitter, Github, Instagram, ExternalLink, Bookmark, CheckCircle } from 'lucide-vue-next'

const profile = ref({
    fullname: 'Leonibel Segura',
    username: 'leonibeldev',
    avatar: 'https://i.pravatar.cc/150?img=2',
    bio: "Soy un desarrollador fullstack apasionado por Vue.js, Tailwind CSS y la tecnología en general.",
    twitter: 'https://twitter.com/leonibeldev',
    github: 'https://github.com/leonibeldev',
    instagram: 'https://instagram.com/leonibeldev',
    external: 'https://leonibel.dev',
    joined: 'March 10, 2023',
    verified: true
})

const stats = ref({
    posts: 34,
    followers: '1.2k',
    following: 98
})

const posts = ref([
    {
        id: 1,
        title: 'Mi primer post en el blog',
        fullname: profile.value.fullname,
        date: '2025-10-01',
        excerpt: 'Este es un resumen corto del primer post del blog, mostrando cómo se vería en la lista.',
        tags: ['Vue', 'JavaScript'],
        cover: 'https://source.unsplash.com/400x200/?tech'
    },
    {
        id: 2,
        title: 'Aprendiendo Tailwind CSS',
        fullname: profile.value.fullname,
        date: '2025-09-20',
        excerpt: 'Tailwind CSS facilita la creación de interfaces rápidas y responsivas sin escribir mucho CSS.',
        tags: ['CSS', 'UI', 'Tailwind'],
        cover: 'https://source.unsplash.com/400x200/?coding'
    },
    {
        id: 3,
        title: 'Cómo usar Axios en Vue',
        fullname: profile.value.fullname,
        date: '2025-09-10',
        excerpt: 'Explicación básica de cómo consumir APIs en Vue usando Axios y manejar la información.',
        tags: ['API', 'Vue', 'JavaScript'],
        cover: 'https://source.unsplash.com/400x200/?programming'
    }
])

function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' })
}

function getExcerpt(content, length) {
    return content.length > length ? content.substring(0, length) + '...' : content
}

function toggleBookmark(post) {
    alert(`Post "${post.title}" bookmarked!`)
}

async function getUserInformation() {
    try {
        const { data } = await axios.get(`${API_URL}/admin/user`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        if (profile.value) Object.assign(profile.value, data.user)
        else profile.value = data.user
    } catch (error) {
        console.error('Error loading request:', error)
    }
}

onMounted(() => {
    getUserInformation()
})
</script>
