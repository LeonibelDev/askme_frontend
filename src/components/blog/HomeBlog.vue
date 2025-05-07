<template>
    <main class="flex min-h-screen flex-col bg-white">
        <!-- Blog List Section -->
        <section class="max-w-3xl mx-auto px-6 py-[40px] space-y-5">
            <div v-if="posts && posts.length === 0 && isLoading == false"
                class="flex flex-col items-center justify-center text-gray-500 py-24 space-y-4">
                <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.5"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                </svg>
                <p class="text-lg font-medium">No posts yet</p>
                <p class="text-sm text-gray-400">New posts will appear here when available.</p>
                <router-link to="/blog"
                    class="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-7 rounded-full transition duration-300 text-sm">
                    Back to Home
                </router-link>
            </div>


            <div v-for="post in posts" :key="post.id"
                class="flex flex-col md:flex-row items-start gap-8 pb-10 last:pb-0">

                <!-- Image -->
                <img v-if="post.cover" :src="post.cover" alt="Cover Image"
                    class="w-full md:w-44 h-32 object-cover rounded-lg shadow-sm" loading="lazy" />

                <!-- Texts -->
                <div class="flex-1 space-y-4">
                    <!-- Texts -->
                    <div class="flex-1 space-y-2">
                        <!-- Author and Date -->
                        <div class="text-xs text-gray-500 flex items-center gap-2">
                            <span class="text-gray-700 font-medium">{{ getUsername(post.author) }}</span>
                            <span>•</span>
                            <span>{{ formatDate(post.date) }}</span>
                        </div>

                        <!-- Title -->
                        <router-link :to="`/blog/${post.id}`">
                            <h2
                                class="text-[1.4rem] md:text-[1.6rem] font-extrabold text-black leading-tight hover:underline">
                                {{ post.title }}
                            </h2>
                        </router-link>

                        <!-- Excerpt -->
                        <p class="text-gray-700 text-base leading-snug">
                            <span v-if="post.sections && post.sections.length > 0">
                                {{ getExcerpt(post.sections[0].content) }}
                            </span>
                        </p>
                    </div>

                    <!-- Tags -->
                    <div class="flex flex-wrap gap-2 pt-2">
                        <span v-for="tag in post.tags" :key="tag"
                            class="bg-[#f0fdf4] text-[#15803d] px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                            {{ tag }}
                        </span>
                    </div>

                </div>
            </div>


            <!-- Skeleton Loader -->
            <div v-if="isLoading" class="space-y-10">
                <div v-for="i in 3" :key="i" class="animate-pulse flex flex-col md:flex-row gap-8">
                    <!-- Skeleton Image -->
                    <div class="w-full md:w-44 h-32 bg-gray-200 rounded-lg"></div>
                    <!-- Skeleton Texts -->
                    <div class="flex-1 space-y-3">
                        <div class="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div class="h-6 bg-gray-300 rounded w-3/4"></div>
                        <div class="h-4 bg-gray-200 rounded w-full"></div>
                        <div class="flex gap-2 pt-2">
                            <div class="h-6 w-16 bg-gray-200 rounded-full"></div>
                            <div class="h-6 w-16 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pagination (UI Only) -->
            <div class="flex justify-center items-center gap-2 pb-20">
                <router-link :to="`/blog?offset=${offset - 5}`" :disabled="offset === 0"
                    class="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700">
                    Previous
                </router-link>

                <div v-for="i in 3" :key="i">
                    <router-link :to="`/blog?offset=${(i - 1) * 5}`" :class="[
                        'px-4 py-2 rounded-full text-sm font-medium',
                        offset === (i - 1) * 5 ? 'bg-[#16a34a] text-white' : 'bg-gray-100 text-black'
                    ]">
                        {{ i }}
                    </router-link>
                </div>

                <button :class="[
                    'px-4 py-2 rounded-full text-sm font-medium',
                    offset > 10 ? 'bg-[#16a34a] text-white' : 'bg-gray-100 text-black'
                ]">
                    ...
                </button>

                <router-link :to="`/blog?offset=${offset + 5}`" :disabled="offset === 0"
                    class="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700">
                    Next
                </router-link>
            </div>

        </section>
    </main>
</template>


<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { API_URL } from '@/config'

const posts = ref([])

const route = useRoute()
const offset = computed(() => parseInt(route.query.offset) || 0)
let isLoading = ref(true)

async function fetchPosts() {
    isLoading = true
    try {
        const { data } = await axios.get(`${API_URL}/blog/all?offset=${offset.value}`)
        posts.value = Array.isArray(data.posts) ? data.posts : []
    } catch (error) {
        console.error('Error fetching posts:', error)
        posts.value = []
    }
    finally {
        isLoading = false
    }
}

function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-EN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

function getUsername(email) {
    return email.split('@')[0]
}

function getExcerpt(content) {
    return content.length > 150 ? content.substring(0, 150) + '...' : content
}

onMounted(() => {
    fetchPosts()
})

watch(() => route.query.offset, fetchPosts, { immediate: true })

</script>

<style scoped>
/* Agrega transición suave a las tags */
span[class*='rounded-full'] {
    transition: all 0.2s ease;
}

span[class*='rounded-full']:hover {
    transform: scale(1.05);
}
</style>