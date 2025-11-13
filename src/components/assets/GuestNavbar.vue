<template>
    <header ref="headerRef" class="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/70 border-b border-gray-200">
        <nav class="max-w-6xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
            <!-- Left: logo -->
            <div class="flex items-center gap-4">
                <router-link to="/" class="flex items-center gap-2 no-underline">
                    <div
                        class="w-7 h-7 flex items-center justify-center rounded-sm bg-gray-900 text-white font-semibold">
                        M
                    </div>
                    <div class="hidden md:flex flex-col leading-tight">
                        <span class="text-sm font-semibold text-gray-900">
                            MyTechBlog<span class="text-xs text-gray-400">.dev</span>
                        </span>
                    </div>
                </router-link>
            </div>

            <!-- Center (placeholder) -->
            <div class="flex-1 px-4 hidden md:flex justify-center"></div>

            <!-- Right: acciones -->
            <div class="flex items-center gap-3">
                <div class="hidden md:flex items-center gap-4">
                    <router-link to="/blog"
                        class="text-gray-700 hover:text-[#16a34a] text-sm font-medium transition-colors">Blog</router-link>

                    <router-link to="/login"
                        class="border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 px-5 py-2 rounded-full text-sm font-medium transition-all">Login</router-link>

                    <router-link to="/signup"
                        class="bg-[#16a34a] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[#15803d] transition-all shadow-md hover:shadow-lg">Get
                        Started</router-link>
                </div>

                <!-- Mobile menu button -->
                <button @click="mobileOpen = !mobileOpen"
                    class="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none">
                    <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path v-if="!mobileOpen" d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"
                            stroke-linejoin="round" stroke-width="2" />
                        <path v-else d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2" />
                    </svg>
                </button>
            </div>
        </nav>

        <!-- Mobile panel -->
        <transition name="fade">
            <div v-if="mobileOpen" class="md:hidden border-t border-gray-200 bg-white/90">
                <div class="px-4 py-3 flex flex-col gap-2">
                    <router-link @click="closeMobile" to="/blog"
                        class="py-2 text-gray-700 hover:text-[#16a34a]">Blog</router-link>
                    <router-link @click="closeMobile" to="/login"
                        class="py-2 text-gray-700 hover:text-[#16a34a]">Login</router-link>
                    <router-link @click="closeMobile" to="/signup" class="py-2">
                        <span
                            class="inline-block bg-[#16a34a] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#15803d]">Get
                            Started</span>
                    </router-link>
                </div>
            </div>
        </transition>
    </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const mobileOpen = ref(false);
const headerRef = ref(null);

function closeMobile() {
    mobileOpen.value = false;
}

function handleClickOutside(e) {
    if (headerRef.value && !headerRef.value.contains(e.target) && mobileOpen.value) {
        mobileOpen.value = false;
    }
}

function onKey(e) {
    if (e.key === "Escape") mobileOpen.value = false;
}

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", onKey);
});

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
    document.removeEventListener("keydown", onKey);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
