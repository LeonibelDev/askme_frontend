<template>
  <div v-if="post" class="max-w-3xl mx-auto px-4 py-12">
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
    <div class="overflow-hidden mb-12 text-center">
      <img :src="post.cover" alt="Cover" class="w-full object-cover rounded-2xl" />

      <span class="text-sm text-gray-400">from {{ ImageSource(post.cover) }}</span>
    </div>

    <!-- Sections -->
    <div class="space-y-12" v-if="post.sections">
      <div v-for="section in sortedSections" :key="section.position">
        <!-- Normal Text -->
        <p v-if="section.Type === 'text'" class="text-lg leading-8 text-gray-800 mb-6 whitespace-pre-line">
          {{ section.content }}
        </p>

        <!-- Subtitles -->
        <h3 v-else-if="section.Type === 'subtitle'" class="text-2xl font-bold text-black mb-4">
          {{ section.content }}
        </h3>

        <!-- Video -->
        <iframe v-else-if="section.Type === 'youtube'" width="100%" height="480" :src="youtubeEmbedUrl(section.content)"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen class="rounded-xl"></iframe>

        <!-- Images -->
        <img v-if="section.Type === 'image'" :src="section.content" alt="Section Image"
          class="w-full rounded-xl mx-auto" loading="lazy" />

        <div v-if="section.Type === 'image'" class="text-center">
          <span class="text-sm text-gray-400">from {{
            ImageSource(section.content)
          }}</span>
        </div>

        <!-- Code -->
        <pre v-else-if="section.Type === 'code'" class="rounded-xl overflow-x-auto">
<code class="language-javascript">{{ section.content }}</code>
        </pre>
      </div>
    </div>

    <!-- Go Back Button -->
    <div class="flex justify-center mt-16">
      <button @click="GoBack()"
        class="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-full transition duration-300">
        Go Back
      </button>
    </div>

    <NewsLetter class="mt-16" />
  </div>

  <!-- Skeleton Loader -->
  <div v-else class="max-w-3xl mx-auto px-4 py-12 space-y-8 animate-pulse">
    <!-- Tags and Date -->
    <div class="flex items-center justify-center flex-wrap gap-2">
      <div class="h-6 w-20 bg-gray-200 rounded-full"></div>
      <div class="h-6 w-24 bg-gray-200 rounded-full"></div>
    </div>

    <!-- Title -->
    <div class="h-10 bg-gray-300 rounded w-3/4 mx-auto"></div>

    <!-- Cover Image -->
    <div class="w-full h-64 bg-gray-200 rounded-2xl"></div>
    <div class="h-4 w-24 bg-gray-300 mx-auto rounded"></div>

    <!-- Content Sections -->
    <div class="space-y-6">
      <div class="h-6 bg-gray-200 rounded w-5/6"></div>
      <div class="h-6 bg-gray-200 rounded w-4/6"></div>
      <div class="h-6 bg-gray-200 rounded w-3/6"></div>
    </div>

    <!-- Button -->
    <div class="flex justify-center mt-16">
      <div class="h-10 w-32 bg-gray-300 rounded-full"></div>
    </div>

    <!-- Newsletter Skeleton -->
    <div class="h-32 bg-gray-100 rounded-lg"></div>
  </div>

</template>

<script setup>
import NewsLetter from '../assets/NewsLetter.vue'
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import Prism from 'prismjs'
import { API_URL } from '@/config'

const route = useRoute()
const router = useRouter()
const post = ref(null)
const prevUrl = ref('')

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
  prevUrl.value = document.referrer
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

function youtubeEmbedUrl(url) {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]{11})/
  const match = url?.match(regex)
  if (match && match[1]?.length === 11) {
    return `https://www.youtube.com/embed/${match[1]}`
  }
  return ''
}

function ImageSource(url) {
  return url.split('/')[2]
}

function GoBack() {
  router.back()
}

const sortedSections = computed(() => {
  if (!post.value) return []
  return [...post.value.sections].sort((a, b) => a.position - b.position)
})
</script>

<style scoped>
pre {
  background-color: #262626;
  background-color: #F9F9F9;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  color: white;
}

code {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  line-height: 1.5;
  word-wrap: break-word;
}

pre {
  word-wrap: normal;
}
</style>
