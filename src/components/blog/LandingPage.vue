<template>
    <main class="flex min-h-screen flex-col bg-white relative overflow-hidden">
        <!-- Fondo de patrón de puntos -->
        <div class="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none"></div>

        <!-- Hero Section with Floating Tags -->
        <section class="flex flex-col items-center justify-center px-4 py-20 md:py-32 relative overflow-hidden">
            <!-- Floating Tags (desktop) -->
            <span v-for="tag in tags" :key="tag.id"
                class="absolute hidden md:inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold floating-tag"
                :style="{
                    top: tag.top,
                    left: tag.left,
                    right: tag.right,
                    animationDuration: tag.animationDuration,
                    animationDelay: tag.animationDelay,
                }">
                {{ tag.name }}
            </span>

            <div class="w-full max-w-3xl text-center space-y-6 relative z-10">
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                    <span class="text-[#16a34a]">Stay ahead</span> with insights that
                    <span class="text-[#16a34a]"> transform</span> your tech journey
                </h1>

                <p class="text-lg text-gray-600 max-w-xl mx-auto">
                    Join thousands of tech professionals who rely on our curated content to stay at the cutting edge.
                </p>

                <!-- Mobile-only Tags -->
                <div class="flex flex-wrap justify-center gap-2 pt-2 md:hidden">
                    <span v-for="tag in tags" :key="tag.id"
                        class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {{ tag.name }}
                    </span>
                </div>

                <div class="pt-6">
                    <RouterLink to="/blog">
                        <button
                            class="rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white font-medium px-8 py-6 text-lg group inline-flex items-center transition-all">
                            View Publications
                            <ArrowRight class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </button>
                    </RouterLink>
                </div>
            </div>
        </section>

        <!-- Newsletter Section -->
        <NewsLetter />
    </main>
</template>

<script setup>
import NewsLetter from '../assets/NewsLetter.vue'
import { ArrowRight } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const tags = [
    { id: 1, name: "AI", top: "15%", left: "10%", animationDuration: "15s", animationDelay: "0s" },
    { id: 2, name: "Machine Learning", top: "20%", right: "15%", animationDuration: "18s", animationDelay: "1s" },
    { id: 3, name: "Web Development", top: "65%", left: "20%", animationDuration: "20s", animationDelay: "2s" },
    { id: 4, name: "Cloud Computing", top: "70%", right: "25%", animationDuration: "17s", animationDelay: "0.5s" },
    { id: 5, name: "Cybersecurity", top: "40%", left: "5%", animationDuration: "19s", animationDelay: "1.5s" },
    { id: 6, name: "DevOps", top: "30%", right: "8%", animationDuration: "16s", animationDelay: "2.5s" },
    { id: 7, name: "Blockchain", top: "55%", right: "12%", animationDuration: "21s", animationDelay: "0.7s" },
]
</script>

<style scoped>
.bg-dot-pattern {
    background-image: radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 1px);
    background-size: 24px 24px;
    z-index: 1;
}

@keyframes float {
    0% {
        transform: translate(0, 0) rotate(0deg);
    }

    25% {
        transform: translate(5px, 10px) rotate(2deg);
    }

    50% {
        transform: translate(0, 15px) rotate(0deg);
    }

    75% {
        transform: translate(-5px, 8px) rotate(-2deg);
    }

    100% {
        transform: translate(0, 0) rotate(0deg);
    }
}

.floating-tag {
    animation-name: float;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    opacity: 0.8;
    transition: opacity 0.3s ease;
}

.floating-tag:hover {
    opacity: 1;
}
</style>
