<template id="post">
  <div v-if="post" class="max-w-3xl mx-auto px-6 py-12">

    <!-- Tags -->
    <div class="flex flex-wrap items-center justify-center gap-3 text-gray-600 text-sm mb-6">
      <div v-for="(tag, index) in post.tags" :key="index" class="test-sm bold px-3">
        {{ tag }}
      </div>
    </div>

    <!-- Title -->
    <h1 class="text-4xl md:text-5xl font-extrabold text-center mb-6 leading-tight title">
      {{ post.title }}
    </h1>

    <!-- Tags and Date -->
    <div class="flex flex-wrap items-center justify-center gap-3 text-gray-600 text-sm mb-6">

      <!-- Avatar + Name -->
      <div class="flex items-center gap-2">
        <div v-if="post.authorAvatar"
          class="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          <img :src="post.authorAvatar" alt="author avatar" class="w-full h-full object-cover" />
        </div>

        <!-- Si no hay imagen, mostrar inicial -->
        <div v-else
          class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">
          {{ post.fullname.charAt(0).toUpperCase() }}
        </div>

        <span class="font-medium text-gray-800">{{ post.fullname }}</span>
      </div>

      <!-- Divider & Metadata -->
      <div class="flex items-center gap-2 text-gray-500 text-xs">
        <span>{{ GetReadTime() }}</span>
        <span>•</span>
        <span>{{ formattedDate }}</span>
      </div>

    </div>

    <!-- Cover Image -->
    <div class="overflow-hidden mb-12 text-center">
      <img :src="post.cover" alt="Cover" class="w-full object-cover rounded-2xl" />

      <span class="text-sm text-gray-400">from {{ ImageSource(post.cover) }}</span>
    </div>

    <!-- Sections -->
    <div class="space-y-12" v-if="post.sections">
      <div v-for="section in sortedSections" :key="section.position">

        <!-- Normal Text -->
        <p v-if="section.Type === 'text'"
          class="text-lg leading-8 text-gray-800 mb-6 whitespace-pre-line justify-text text">
          {{ section.content }}
        </p>

        <!-- Subtitles -->
        <h3 v-else-if="section.Type === 'subtitle'" class="text-2xl font-bold text-black mb-4 subtitle">
          {{ section.content }}
        </h3>

        <!-- Video -->
        <iframe v-else-if="section.Type === 'youtube'" width="100%" height="480" :src="youtubeEmbedUrl(section.content)"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen class="rounded-xl"></iframe>

        <a v-if="section.Type === 'youtube'" :href="youtubeEmbedUrl(section.content)" target="_blank"
          rel="noopener noreferrer" class="block text-sm text-gray-500 text-center hover:text-blue-600 transition">
          Watch this video on YouTube
        </a>

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

        <!-- URL -->
        <div v-else-if="section.Type === 'url'" class="p-5 bg-white rounded-xl border border-neutral-200
         hover:border-neutral-300 transition-all duration-200
         shadow-sm flex items-start">
          <a :href="section.content" target="_blank" rel="noopener noreferrer" class="text-blue-800 hover:text-blue-600 
            decoration-neutral-300 hover:decoration-neutral-400
           underline-offset-4 break-words block leading-relaxed">
            {{ section.content }}
          </a>
        </div>


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
  <div v-else class="max-w-3xl mx-auto px-4 py-12 space-y-8 animate-pulse mt-12">
    <div class="flex flex-wrap items-center justify-center gap-3 text-gray-600 text-sm mb-6">
      <div class="h-6 w-20 bg-gray-200 rounded-full"></div>
      <div class="h-6 w-24 bg-gray-200 rounded-full"></div>
    </div>

    <!-- Title -->
    <div class="h-10 bg-gray-300 rounded w-3/4 mx-auto"></div>

    <!-- Tags and Date -->
    <div class="flex items-center justify-center flex-wrap gap-2">
      <div class="h-6 w-20 bg-gray-200 rounded-full"></div>
      <div class="h-6 w-24 bg-gray-200 rounded-full"></div>
    </div>

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

function GetReadTime() {


  if (!post.value || !post.value.sections) return '0 min read'

  let totalWords = 0
  const textWpm = 200
  const codeWpm = 100

  post.value.sections.forEach(section => {
    const content = section.content || ''
    const words = (String(content).match(/\S+/g) || []).length

    if (section.Type === 'code') {
      // treat code as slower to read
      totalWords += words * (codeWpm / textWpm)
    } else if (section.Type === 'image' || section.Type === 'youtube') {
      // small weight for non-text media
      totalWords += 15
    } else {
      // text, subtitle, etc.
      totalWords += words
    }
  })

  const minutes = Math.max(1, Math.ceil(totalWords / textWpm))
  return `${minutes} min read`
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

pre {
  background-color: #262626;
  background-color: #F9F9F9;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  color: white;
}

code {
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  word-wrap: break-word;
}

pre {
  word-wrap: normal;
}

.justify-text {
  text-align: left;
  text-justify: inter-word;
}

/* Selección global */
::selection {
  background: #fff176;
  /* amarillo suave tipo resaltador */
  color: inherit;
  /* mantiene el color del texto */
}

/* Firefox necesita su propio prefijo */
::-moz-selection {
  background: #fff176;
  color: inherit;
}
</style>
