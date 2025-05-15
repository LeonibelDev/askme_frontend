<template>
    <footer class=" text-gray-700">
        <div class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Logo & Tagline -->
            <div class="space-y-4">
                <h2 class="text-xl font-bold text-[#16a34a]">TechPulse</h2>
                <p class="text-sm">
                    Empowering developers and tech professionals with curated insights and resources.
                </p>
            </div>

            <!-- Navigation -->
            <div class="space-y-2">
                <h3 class="text-sm font-semibold text-gray-800">Navigation</h3>
                <ul class="space-y-1 text-sm">
                    <li>
                        <RouterLink to="/" class="hover:underline">Home</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/blog" class="hover:underline">Blog</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/about" class="hover:underline">About</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/contact" class="hover:underline">Contact</RouterLink>
                    </li>
                </ul>
            </div>

            <!-- Social & Newsletter -->
            <div class="space-y-4">
                <h3 class="text-sm font-semibold text-gray-800">Stay Connected</h3>
                <div class="flex gap-4 text-[#16a34a]">
                    <a href="#" class="hover:text-[#15803d]"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="hover:text-[#15803d]"><i class="fab fa-github"></i></a>
                    <a href="#" class="hover:text-[#15803d]"><i class="fab fa-linkedin"></i></a>
                </div>
                <p class="text-xs text-gray-500">Subscribe to our newsletter for weekly updates.</p>
            </div>
        </div>

        <div class="text-center text-xs text-gray-400 py-4">
            &copy; {{ new Date().getFullYear() }} TechPulse. All rights reserved.
        </div>
    </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>