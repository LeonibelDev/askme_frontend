<template>
    <div v-if="profile" class="max-w-3xl mx-auto px-4 py-12">
        <!-- Username and Date -->
        <div class="flex items-center justify-center flex-wrap gap-2 text-gray-500 text-sm mb-6">
            <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                @{{ profile.username }}
            </span>
            <span>{{ formattedDate }}</span>
        </div>

        <!-- Name -->
        <h1 class="text-4xl md:text-5xl font-extrabold text-center mb-6 leading-tight">
            {{ profile.name }}
        </h1>

        <!-- Avatar (Initial Icon) -->
        <div class="flex justify-center mb-8">
            <div v-if="!profile.avatar"
                class="w-40 h-40 rounded-full bg-gray-800 text-white flex items-center justify-center text-5xl font-bold">
                {{ profile.name.charAt(0).toUpperCase() }}
            </div>
            <img v-else :src="profile.avatar" alt="Avatar" class="w-40 h-40 rounded-full object-cover" />
        </div>

        <!-- Bio -->
        <p class="text-lg leading-8 text-gray-800 text-center mb-12 whitespace-pre-line">
            {{ profile.bio }}
        </p>

        <!-- Social Links -->
        <div v-if="profile.socials" class="flex justify-center gap-4 mb-12">
            <a v-for="(url, platform) in profile.socials" :key="platform" :href="url" target="_blank"
                class="text-sm font-semibold text-blue-600 hover:underline capitalize">
                {{ platform }}
            </a>
        </div>

        <!-- Secciones -->
        <div class="space-y-12" v-if="profile.sections">
            <div v-for="section in sortedSections" :key="section.position">
                <h3 v-if="section.Type === 'subtitle'" class="text-2xl font-bold text-black mb-4">
                    {{ section.content }}
                </h3>
                <p v-else-if="section.Type === 'text'" class="text-lg leading-8 text-gray-800 mb-6 whitespace-pre-line">
                    {{ section.content }}
                </p>
                <img v-if="section.Type === 'image'" :src="section.content" alt="Section Image"
                    class="w-full rounded-xl mx-auto" loading="lazy" />
                <div v-if="section.Type === 'image'" class="text-center">
                    <span class="text-sm text-gray-400">from {{ ImageSource(section.content) }}</span>
                </div>
            </div>
        </div>

        <!-- Go Back -->
        <div class="flex justify-center mt-16">
            <button @click="GoBack"
                class="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-full transition duration-300">
                Go Back
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const profile = ref(null)

onMounted(() => {
    profile.value = {
        username: 'theadmin',
        name: 'Leonibel Segura',
        avatar: null, // o pon una URL aquí si quieres ver una imagen
        bio: `Full-stack developer and tech writer. \nLover of clean code and good coffee.`,
        createdAt: '2023-04-12T12:00:00Z',
        socials: {
            twitter: 'https://twitter.com/janedoe',
            instagram: 'https://instagram.com/janedoe',
            github: 'https://github.com/janedoe'
        },
        sections: [
            { Type: 'subtitle', content: 'About Me', position: 1 },
            {
                Type: 'text',
                content: 'I am a software engineer based in Berlin. I write clean and efficient code, and enjoy sharing what I learn.',
                position: 2
            },
            { Type: 'image', content: 'https://source.unsplash.com/random/800x400', position: 3 }
        ]
    }
})

const formattedDate = computed(() => {
    if (!profile.value?.createdAt) return ''
    const date = new Date(profile.value.createdAt)
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
})

function GoBack() {
    router.back()
}

function ImageSource(url) {
    return url.split('/')[2]
}

const sortedSections = computed(() => {
    if (!profile.value) return []
    return [...profile.value.sections].sort((a, b) => a.position - b.position)
})
</script>