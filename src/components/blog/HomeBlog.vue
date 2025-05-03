<template>
    <main class="flex min-h-screen flex-col bg-white">
        <!-- Blog List Section -->
        <section class="max-w-5xl mx-auto px-6 py-20 space-y-16">
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
                        <p class="text-gray-700 text-base md:text-lg leading-snug">
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

            <!-- Pagination (UI Only) -->
            <div class="flex justify-center items-center gap-2 pb-20">
                <button :disabled="page === 0"
                    class="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700">
                    Previous
                </button>

                <div v-for="i in 3" :key="i">
                    <router-link :to="`/blog?offset=${(i - 1) * 5}`" :class="[
                        'px-4 py-2 rounded-full text-sm font-medium',
                        offset === (i - 1) * 5 ? 'bg-[#16a34a] text-white' : 'bg-gray-100 text-black'
                    ]">
                        {{ i }}
                    </router-link>
                </div>


                <button class="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700">
                    Next
                </button>
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

async function fetchPosts() {
    try {
        const { data } = await axios.get(`${API_URL}/blog/all?offset=${offset.value}`)
        posts.value = data.posts
    } catch (error) {
        console.error('Error fetching posts:', error)
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