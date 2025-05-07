<template>
    <div class="min-h-screen flex items-center justify-center bg-white px-4">
        <div class="w-full max-w-md">
            <!-- Card -->
            <div class="p-8 rounded-3xl shadow-sm border border-gray-200 bg-white">
                <!-- Header -->
                <div class="text-center mb-10">
                    <h1 class="text-3xl font-semibold">Welcome back</h1>
                    <p class="text-gray-500 mt-2 text-sm">Log in to continue</p>
                </div>

                <!-- Form -->
                <form @submit.prevent="handleLogin" class="space-y-6">
                    <div>
                        <input v-model="email" type="email" placeholder="Email" required
                            class="w-full text-sm px-0 py-3 border-b border-gray-300 focus:outline-none focus:border-black placeholder-gray-400 bg-transparent" />
                    </div>
                    <div>
                        <input v-model="password" type="password" placeholder="Password" autocomplete="off" required
                            class="w-full text-sm px-0 py-3 border-b border-gray-300 focus:outline-none focus:border-black placeholder-gray-400 bg-transparent" />
                    </div>

                    <!-- Button -->
                    <div class="pt-2">
                        <button type="submit"
                            class="w-full bg-black text-white py-3 rounded-full text-sm font-medium hover:bg-gray-900 transition">
                            Login
                        </button>
                    </div>
                </form>

                <!-- Register Link -->
                <div class="text-center mt-6">
                    <router-link to="/signup" class="text-sm text-gray-500 hover:underline">
                        Don’t have an account? <span class="text-black">Register</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { API_URL } from '@/config'

const email = ref('')
const password = ref('')
const router = useRouter()

async function handleLogin() {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email: email.value,
            password: password.value
        })

        localStorage.setItem('token', response.data.token)
        router.push('/blog')
    } catch (error) {
        console.error('Login failed:', error)
        alert(error.response.data.message)
    }
}
</script>