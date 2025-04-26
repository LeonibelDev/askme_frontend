<template>
    <div class="max-w-md mx-auto px-4 py-12">
        <!-- Header -->
        <div class="text-center mb-10">
            <h1 class="text-4xl font-extrabold mb-4">Welcome Back</h1>
            <p class="text-gray-600">Please login to your account</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Email -->
            <div>
                <label class="block text-gray-700 mb-2" for="email">Email</label>
                <input v-model="email" type="email" id="email" required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>

            <!-- Password -->
            <div>
                <label class="block text-gray-700 mb-2" for="password">Password</label>
                <input v-model="password" type="password" id="password" required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>

            <!-- Login Button -->
            <div class="flex justify-center">
                <button type="submit"
                    class="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-full transition duration-300">
                    Login
                </button>
            </div>
        </form>

        <!-- Register Link -->
        <div class="text-center mt-6">
            <router-link :to="'/register'" class="text-blue-600 hover:underline">
                Don't have an account? Register
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

async function handleLogin() {
    try {
        console.log('Logging in with:', email.value, password.value)
        alert('Login successful!')
        router.push('/')
    } catch (error) {
        console.error('Login failed:', error)
        alert('Login failed. Please check your credentials.')
    }
}
</script>

<style scoped>
input {
    background-color: #f9fafb;
}

button {
    font-size: 1.1rem;
}
</style>
