<template>
    <div class="min-h-screen flex items-center justify-center bg-white px-4">
        <div class="w-full max-w-md">
            <!-- Card -->
            <div class="p-8 rounded-3xl shadow-sm border border-gray-200 bg-white">
                <!-- Header -->
                <div class="text-center mb-10">
                    <h1 class="text-3xl font-semibold">Create Account</h1>
                    <p class="text-gray-500 mt-2 text-sm">Sign up to get started</p>
                </div>

                <!-- Form -->
                <form @submit.prevent="handleSignup" class="space-y-6">
                    <div>
                        <input v-model="username" type="text" placeholder="Username" required
                            class="w-full text-sm px-0 py-3 border-b border-gray-300 focus:outline-none focus:border-black placeholder-gray-400 bg-transparent" />
                    </div>
                    <div>
                        <input v-model="email" type="email" placeholder="Email" required
                            class="w-full text-sm px-0 py-3 border-b border-gray-300 focus:outline-none focus:border-black placeholder-gray-400 bg-transparent" />
                    </div>
                    <div>
                        <input v-model="password" type="password" placeholder="Password" required
                            class="w-full text-sm px-0 py-3 border-b border-gray-300 focus:outline-none focus:border-black placeholder-gray-400 bg-transparent" />
                    </div>

                    <!-- Button -->
                    <div class="pt-2">
                        <button type="submit"
                            class="w-full bg-black text-white py-3 rounded-full text-sm font-medium hover:bg-gray-900 transition">
                            Sign Up
                        </button>
                    </div>
                </form>

                <!-- Link -->
                <div class="text-center mt-6">
                    <router-link to="/login" class="text-sm text-gray-500 hover:underline">
                        Already have an account? <span class="text-black">Login</span>
                    </router-link>
                </div>
            </div>
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
        console.log('Signing up:', username.value, email.value, password.value)
        alert('Signup successful!')
        router.push('/')
    } catch (error) {
        console.error('Signup failed:', error)
        alert('Signup failed. Try again.')
    }
}
</script>