<template>
  <div v-if="post" class="max-w-4xl mx-auto px-4 py-12">
    <!-- Tags and Date -->
    <div class="flex items-center justify-center flex-wrap gap-2 text-gray-500 text-sm mb-6">
      <span v-for="tag in post.tags" :key="tag"
        class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
        {{ tag }}
      </span>

      <span>{{ formattedDate }}</span>
    </div>

    <!-- Title -->
    <h1 class="text-4xl md:text-5xl font-extrabold text-center mb-6 leading-tight">
      {{ post.title }}
    </h1>

    <!-- Cover Image -->
    <div class="overflow-hidden rounded-2xl mb-12">
      <img :src="post.cover" alt="Cover" class="w-full object-cover" />
    </div>

    <!-- Sections -->
    <div class="space-y-12">
      <div v-for="section in sortedSections" :key="section.position">
        <!-- Normal Text -->
        <p v-if="section.Type === 'text'" class="text-lg leading-8 text-gray-800 mb-6">
          {{ section.content }}
        </p>

        <!-- Subtitles -->
        <h3 v-else-if="section.Type === 'subtitle'" class="text-2xl font-bold text-black mb-4">
          {{ section.content }}
        </h3>

        <!-- Video -->
        <iframe v-else-if="section.Type === 'youtube'" width="100%" height="480" :src="section.content" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen class="rounded-xl"></iframe>

        <!-- Images -->
        <img v-else-if="section.Type === 'image'" :src="section.content" alt="Section Image"
          class="w-full rounded-xl mx-auto mb-8" loading="lazy" />

        <!-- Code -->
        <pre v-else-if="section.Type === 'code'" class="rounded-xl overflow-x-auto">
<code class="language-javascript">{{ section.content }}</code>
        </pre>
      </div>
    </div>

    <!-- Go Back Button -->
    <div class="flex justify-center mt-16">
      <router-link :to="'/blog'"
        class="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-full transition duration-300">
        ← Go Back
      </router-link>
    </div>
  </div>

  <div v-else class="text-center py-20 text-gray-400">
    Loading post...
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Prism from 'prismjs'
import { API_URL } from '@/config'

const route = useRoute()
const post = ref(null)

async function getPost() {
  try {
    const UUID = route.params.uuid
    const { data } = await axios.get(`${API_URL}/blog/${UUID}`, {
      headers: {
      }
    })
    console.log('Received data:', data)
    post.value = data.post
    document.title = post.value.title

    await nextTick()
    Prism.highlightAll()
  } catch (error) {
    console.error('Error loading post:', error)
  }
}

onMounted(() => {
  getPost()
})

const formattedDate = computed(() => {
  if (!post.value) return ''
  const date = new Date(post.value.date)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const sortedSections = computed(() => {
  if (!post.value) return []
  return [...post.value.sections].sort((a, b) => a.position - b.position)
})
</script>

<style scoped>
pre {
  background-color: #262626;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  color: white;
}

code {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  line-height: 1.5;
  word-wrap: normal;
}
</style>
