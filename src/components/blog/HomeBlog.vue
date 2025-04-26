<template>
    <div class="max-w-4xl mx-auto py-20 px-6 space-y-14">
        <div v-for="post in posts" :key="post.id" class="flex flex-col md:flex-row gap-6">

            <!-- Texts -->
            <div class="flex-1 space-y-3">
                <div class="text-sm text-gray-600 flex items-center gap-2">
                    <span class="font-medium">{{ getUsername(post.author) }}</span>
                    <span>•</span>
                    <span>{{ formatDate(post.date) }}</span>
                </div>

                <router-link :to="`/blog/${post.id}`">
                    <h2 class="text-xl font-bold text-gray-900 hover:underline leading-snug">
                        {{ post.title }}
                    </h2>
                </router-link>

                <p class="text-gray-600 text-base">
                    <!-- Check if there are sections and display the first section's content -->
                    <span v-if="post.sections && post.sections.length > 0">
                        {{ getExcerpt(post.sections[0].content) }}
                    </span>
                </p>

                <div class="flex items-center flex-wrap gap-2 text-sm text-gray-500 mt-3">
                    <div class="flex gap-2">
                        <span v-for="tag in post.tags" :key="tag"
                            class="bg-gray-100 text-gray-600 rounded-full px-2 py-1 text-xs">
                            {{ tag }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Image -->
            <img v-if="post.cover" :src="post.cover" alt="Cover Image"
                class="w-44 h-32 object-cover rounded-lg shrink-0" loading="lazy" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { API_URL } from '@/config'

const posts = ref([])

async function fetchPosts() {
    try {
        const response = await axios.get(`${API_URL}/blog/all`, {
            headers: {
            }
        })
        posts.value = response.data.posts
    } catch (error) {
        console.error('Error fetching posts:', error)
    }
}

function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

function getUsername(email) {
    return email.split('@')[0]
}

// You can improve this function for a real summary
function getExcerpt(body) {
    return body.substring(0, 150) + "..."
}

onMounted(() => {
    fetchPosts()
})
</script>

<style scoped></style>
