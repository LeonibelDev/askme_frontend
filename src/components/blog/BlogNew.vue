<template>
    <div class="max-w-3xl mx-auto px-4 py-12 relative">
        <form @submit.prevent="submitPost" class="space-y-10">

            <!-- Tags Input -->
            <div>
                <input v-model="newPost.tagsInput" type="text" placeholder="Enter tags separated by spaces"
                    @input="updateTags"
                    class="w-full text-2xl font-medium placeholder-gray-400 bg-transparent focus:outline-none py-2" />
                <div class="flex flex-wrap gap-2 mt-2">
                    <span v-for="(tag, index) in newPost.tags" :key="index"
                        class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {{ tag }}
                    </span>
                </div>
            </div>

            <!-- Title (Centered) -->
            <div class="text-center">
                <input v-model="newPost.title" type="text" placeholder="Write a catchy title..."
                    class="w-full text-4xl font-bold placeholder-gray-400 bg-transparent focus:outline-none py-3" />
            </div>

            <!-- Cover Image Input -->
            <!-- Cover Image Input + Unsplash Button -->
            <div>
                <div class="flex gap-2 items-center">
                    <input v-model="newPost.cover" type="text" placeholder="Paste the cover image URL..."
                        class="w-full text-lg placeholder-gray-400 bg-transparent focus:outline-none py-2" />

                    <button type="button" @click="openCoverUnsplash"
                        class="px-4 py-2 text-sm bg-green-500 text-white rounded-full hover:bg-green-600 transition">
                        Buscar en Unsplash
                    </button>
                </div>

                <img v-if="newPost.cover" :src="newPost.cover" class="rounded-lg w-full h-auto object-contain mt-2" />
            </div>


            <!-- Sections -->
            <div class="pt-8 space-y-12">
                <h2 class="text-2xl font-semibold text-gray-800">Content</h2>

                <div v-for="(section, index) in newPost.sections" :key="index" class="space-y-4">

                    <!-- Section Type -->
                    <select v-model="section.Type" class="w-full bg-transparent focus:outline-none py-2 text-gray-700">
                        <option value="text">Text</option>
                        <option value="subtitle">Subtitle</option>
                        <option value="image">Image</option>
                        <option value="code">Code</option>
                        <option value="youtube">YouTube</option>
                        <option value="url">URL</option>
                    </select>

                    <!-- Subtitle with h3 -->
                    <div v-if="section.Type === 'subtitle'">
                        <h3 class="text-2xl font-bold text-gray-700">
                            <input v-model="section.content" type="text" placeholder="Write a subtitle..."
                                class="w-full bg-transparent focus:outline-none py-2 placeholder-gray-400" />
                        </h3>
                    </div>

                    <!-- Text and Code -->
                    <div v-else-if="section.Type === 'text' || section.Type === 'code'">
                        <textarea v-model="section.content" :placeholder="sectionPlaceholder(section.Type)"
                            class="w-full bg-transparent focus:outline-none py-2 placeholder-gray-400" :rows="11" />
                    </div>

                    <!-- Image Section -->
                    <div v-else-if="section.Type === 'image'" class="space-y-4">
                        <div class="flex gap-2 items-center">
                            <input v-model="section.tempImageUrl" type="text" placeholder="Paste image URL..."
                                @input="autoRenderImage(index)" @keydown.enter.prevent
                                class="w-full bg-transparent focus:outline-none py-2 placeholder-gray-400" />
                            <button type="button" @click="openUnsplash(index)"
                                class="px-4 py-2 text-sm bg-green-500 text-white rounded-full hover:bg-green-600 transition">
                                Buscar en Unsplash
                            </button>
                        </div>

                        <div v-if="section.content" class="flex flex-col items-center space-y-2">
                            <img :src="section.content" alt="Section Image"
                                class="rounded-lg w-full h-auto object-contain" />
                        </div>
                    </div>

                    <!-- YouTube Section -->
                    <div v-else-if="section.Type === 'youtube'" class="space-y-4">
                        <input v-model="section.content" type="text" placeholder="Paste YouTube URL..."
                            class="w-full bg-transparent focus:outline-none py-2 placeholder-gray-400" />

                        <div v-if="section.content" class="aspect-video">
                            <iframe class="w-full h-full rounded-lg" :src="youtubeEmbedUrl(section.content)"
                                frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>

                    <!-- URL Section -->
                    <div v-else-if="section.Type === 'url'">
                        <input v-model="section.content" type="text" placeholder="Paste URL..."
                            class="w-full bg-transparent focus:outline-none py-2 placeholder-gray-400" />
                    </div>

                    <!-- Remove Section Button -->
                    <div class="flex justify-end">
                        <button type="button" @click="removeSection(index)"
                            class="text-red-500 text-sm hover:underline">
                            Remove Section
                        </button>
                    </div>

                </div>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-center pt-12">
                <button type="submit"
                    class="bg-gray-900 hover:bg-black text-white font-semibold py-3 px-8 rounded-full transition duration-300">
                    Publish
                </button>
            </div>

        </form>

        <!-- Floating Add Section Button -->
        <button @click="addSection" type="button"
            class="text-2xl fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white rounded-full py-2 px-4 shadow-lg transition duration-300">
            +
        </button>

        <!-- Unsplash Modal -->
        <div v-if="showUnsplashModal"
            class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-2xl shadow-lg p-6 w-full max-w-3xl space-y-4">

                <div class="flex items-center gap-3">
                    <h2 class="text-xl font-semibold flex-1">Buscar imágenes en Unsplash</h2>
                    <button @click="showUnsplashModal = false" class="px-3 py-1 rounded-md border">Cerrar</button>
                </div>

                <div class="flex gap-2">
                    <input v-model="unsplashQuery" @keydown.enter.prevent="searchUnsplash" type="text"
                        placeholder="Busca por ejemplo: mountains, coffee, computer..."
                        class="w-full border rounded-lg px-4 py-2" />
                    <button @click="searchUnsplash"
                        class="px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-black transition">Buscar</button>
                </div>

                <div class="flex items-center justify-between text-sm text-gray-600">
                    <div>Resultados: {{ unsplashResults.length }}</div>
                    <div v-if="unsplashLoading">Cargando...</div>
                    <div v-if="unsplashError" class="text-red-500">Error al buscar imágenes</div>
                </div>

                <div class="grid grid-cols-3 gap-3 max-h-80 overflow-y-auto mt-2">
                    <div v-for="img in unsplashResults" :key="img.id" class="cursor-pointer group">
                        <div @click="selectUnsplashImage(img.urls.regular, currentSectionIndex)"
                            class="rounded-lg overflow-hidden border group-hover:scale-105 transition-transform">
                            <img :src="img.urls.small" alt="" class="w-full h-32 object-cover" />
                        </div>
                        <div class="text-xs mt-1 text-gray-500">{{ img.user.name }}</div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { API_URL } from '@/config'
import { useRouter } from 'vue-router'

const router = useRouter()
const newPost = ref({
    title: '',
    description: '',
    cover: '',
    tagsInput: '',
    tags: [],
    sections: []
})

// Unsplash states (key embedded per your choice A)
const unsplashQuery = ref('')
const unsplashResults = ref([])
const showUnsplashModal = ref(false)
const currentSectionIndex = ref(null)
const unsplashLoading = ref(false)
const unsplashError = ref(false)
const isSelectingCover = ref(false)

// --- Post section helpers ---
function addSection() {
    newPost.value.sections.push({
        position: newPost.value.sections.length + 1,
        Type: 'text',
        content: '',
        tempImageUrl: ''
    })
}

function removeSection(index) {
    newPost.value.sections.splice(index, 1)
    newPost.value.sections.forEach((s, i) => s.position = i + 1)
}

function updateTags() {
    newPost.value.tags = newPost.value.tagsInput.split(' ').map(t => t.trim()).filter(t => t)
}

function sectionPlaceholder(type) {
    switch (type) {
        case 'text':
            return 'Write your content...'
        case 'code':
            return 'Write your code here...'
        default:
            return ''
    }
}

function autoRenderImage(index) {
    const section = newPost.value.sections[index]
    const url = section.tempImageUrl.trim()
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
        section.content = url
    }
}

function youtubeEmbedUrl(url) {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]{11})/
    const match = url?.match(regex)
    if (match && match[1]?.length === 11) {
        return `https://www.youtube.com/embed/${match[1]}`
    }
    return ''
}

// --- Unsplash functions ---
// NOTE: API key is here because elegiste la opción A.
// ⚠️ En producción lo ideal e seguro es mover esto al backend.
const UNSPLASH_CLIENT_ID = 'P9PJ8P69sjusdJtzMbjA0BX1rfwacAdFb5K6LYlLTGs'

async function searchUnsplash() {
    if (!unsplashQuery.value) return
    unsplashLoading.value = true
    unsplashError.value = false
    try {
        const res = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query: unsplashQuery.value,
                per_page: 30
            },
            headers: {
                Authorization: `Client-ID ${UNSPLASH_CLIENT_ID}`
            }
        })
        unsplashResults.value = res.data.results || []
    } catch (e) {
        console.error('Unsplash error', e)
        unsplashError.value = true
        unsplashResults.value = []
    } finally {
        unsplashLoading.value = false
    }
}

function openUnsplash(index) {
    currentSectionIndex.value = index
    unsplashQuery.value = ''
    unsplashResults.value = []
    showUnsplashModal.value = true
    unsplashError.value = false
}

function selectUnsplashImage(url, index) {
    // Si es para el cover
    if (isSelectingCover.value) {
        newPost.value.cover = url
        isSelectingCover.value = false
        showUnsplashModal.value = false
        return
    }

    // Si es para una sección normal
    const idx = (typeof index === 'object' && index !== null && 'value' in index) ? index.value : index
    if (idx === null || idx === undefined) {
        console.warn('No section index provided')
        showUnsplashModal.value = false
        return
    }

    newPost.value.sections[idx].content = url
    newPost.value.sections[idx].tempImageUrl = url
    showUnsplashModal.value = false
}

function openCoverUnsplash() {
    isSelectingCover.value = true
    currentSectionIndex.value = null
    unsplashQuery.value = ''
    unsplashResults.value = []
    showUnsplashModal.value = true
    unsplashError.value = false
}


// --- Submit ---
function submitPost() {
    const sectionsFormatted = newPost.value.sections.map(section => {
        return {
            position: section.position,
            Type: section.Type,
            content: section.content
        }
    })

    const payload = {
        title: newPost.value.title,
        cover: newPost.value.cover,
        tags: newPost.value.tags,
        sections: sectionsFormatted
    }

    console.log('New Post:', payload)

    axios.post(`${API_URL}/blog/new`, JSON.stringify(payload), {
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('Success:', response.data);
        router.push(`/blog/${response.data.postId}`)
    }).catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });
}
</script>

<style scoped>
textarea,
input,
select {
    border: none;
    background-color: transparent;
    resize: none;
    form-sizing: content;
    max-height: 4000px;
}

textarea:focus,
input:focus,
select:focus {
    outline: none;
}

::placeholder {
    color: #9ca3af;
}

button:focus {
    outline: none;
}

img {
    object-fit: contain;
}
</style>
