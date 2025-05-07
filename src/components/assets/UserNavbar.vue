<template>
    <header class="w-full bg-white flex-col fixed backdrop-blur bg-white/80 z-50">
        <nav class="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
            <!-- Logo -->
            <router-link to="/blog" class="text-lg font-semibold text-gray-900 tracking-tight">
                MyTechBlog
            </router-link>

            <!-- Links for logged-in users -->
            <div class="flex items-center gap-4">
                <router-link to="/blog" class="text-gray-700 hover:text-black text-sm font-medium transition-colors">
                    Blog
                </router-link>

                <router-link to="/blog/new"
                    class="text-sm font-medium text-gray-700 hover:text-[#16a34a] transition-colors">
                    New Post
                </router-link>

                <router-link to="/profile" class="text-sm font-medium text-gray-700 hover:text-black transition-colors">
                    My Profile
                </router-link>

                <button @click="logout"
                    class="bg-red-500 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-red-600 transition-all">
                    Log Out
                </button>
            </div>
        </nav>
    </header>
</template>

<script setup>
const logout = () => {
    // Your logout logic goes here
    // Example: clear token and redirect
    localStorage.removeItem("token");
    window.location.href = "/login";
};
</script>