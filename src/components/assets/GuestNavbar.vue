<template>
    <header class="w-full bg-white flex-col bg-white fixed backdrop-blur bg-white/80">
        <nav class="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
            <!-- Logo -->
            <router-link to="/" class="text-lg font-semibold text-gray-900 tracking-tight">
                MyTechBlog
            </router-link>

            <!-- Links -->
            <div class="flex items-center gap-4">
                <router-link to="/blog" class="text-gray-700 hover:text-black text-sm font-medium transition-colors">
                    Blog
                </router-link>

                <router-link to="/login"
                    class="text-sm font-medium text-gray-700 hover:text-[#16a34a] transition-colors">
                    Login
                </router-link>

                <router-link to="/signup"
                    class="bg-[#16a34a] text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-[#15803d] transition-all">
                    Sign Up
                </router-link>
            </div>
        </nav>
    </header>
</template>