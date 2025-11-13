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
            <div>
                <input v-model="newPost.cover" type="text" placeholder="Paste the cover image URL..."
                    class="w-full text-lg placeholder-gray-400 bg-transparent focus:outline-none py-2" />
                <img :src="newPost.cover" class="rounded-lg w-full h-auto object-contain" />
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
                        <input v-model="section.tempImageUrl" type="text" placeholder="Paste image URL..."
                            @input="autoRenderImage(index)" @keydown.enter.prevent
                            class="w-full bg-transparent focus:outline-none py-2 placeholder-gray-400" />

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
    if (url && url.startsWith('http')) {
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


function submitPost() {
    const sectionsFormatted = newPost.value.sections.map(section => {
        if (section.Type === 'image' || section.Type === 'youtube') {
            return {
                ...section,
                content: section.content
            }
        }
        return section
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
            'Authorization': localStorage.getItem('token')
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
