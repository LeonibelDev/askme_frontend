<template>
    <div class="max-w-md mx-auto px-4 py-12">
        <!-- Header -->
        <div class="text-center mb-10">
            <h1 class="text-4xl font-extrabold mb-4">Create Account</h1>
            <p class="text-gray-600">Sign up to get started</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSignup" class="space-y-6">
            <!-- Username -->
            <div>
                <label class="block text-gray-700 mb-2" for="username">Username</label>
                <input v-model="username" type="text" id="username" required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none" />
            </div>

            <!-- Email -->
            <div>
                <label class="block text-gray-700 mb-2" for="email">Email</label>
                <input v-model="email" type="email" id="email" required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none" />
            </div>

            <!-- Password -->
            <div>
                <label class="block text-gray-700 mb-2" for="password">Password</label>
                <input v-model="password" type="password" id="password" required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none" />
            </div>

            <!-- Signup Button -->
            <div class="flex justify-center">
                <button type="submit"
                    class="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-full transition duration-300">
                    Sign Up
                </button>
            </div>
        </form>

        <!-- Login Link -->
        <div class="text-center mt-6">
            <router-link :to="'/login'" class="text-blue-600 hover:underline">
                Already have an account? Login
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

async function handleSignup() {
    try {
        console.log('Signing up with:', username.value, email.value, password.value)

        alert('Signup successful!')
        router.push('/')
    } catch (error) {
        console.error('Signup failed:', error)
        alert('Signup failed. Please try again.')
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
