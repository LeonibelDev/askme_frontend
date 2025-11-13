<template>
    <div class="min-h-screen flex items-center justify-center  px-4">
        <div class="w-full max-w-md">
            <!-- Card -->
            <div class="p-8 rounded-3xl shadow-lg border border-gray-100 bg-white">
                <!-- Header -->
                <div class="text-center mb-8">
                    <h1 class="text-3xl font-bold tracking-tight text-gray-900">
                        MyTechBlog<span class="text-sm text-gray-400">.dev</span>

                    </h1>
                    <p class="text-gray-500 mt-2 text-sm">Sign in to continue exploring</p>
                </div>

                <!-- Error Message -->
                <div v-if="errorMessage" class="mb-4" role="alert" aria-live="assertive">
                    <div class="text-sm text-red-700 bg-red-50 border border-red-100 p-3 rounded-md">
                        {{ errorMessage }}
                    </div>
                </div>

                <!-- Form -->
                <form @submit.prevent="handleLogin" class="space-y-5" autocomplete="on">
                    <!-- Email -->
                    <div class="relative">
                        <Mail class="w-4 h-4 absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input v-model="email" type="email" placeholder="Email address" required autocomplete="on"
                            autocorrect="off" autocapitalize="off" spellcheck="false"
                            class="w-full pl-6 text-sm py-3 border-b border-gray-300 focus:outline-none focus:border-black placeholder-gray-400 bg-transparent" />
                    </div>

                    <!-- Password -->
                    <div class="relative">
                        <Lock class="w-4 h-4 absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Password"
                            required autocomplete="on" autocorrect="off" autocapitalize="off" spellcheck="false"
                            class="w-full pl-6 text-sm py-3 border-b border-gray-300 focus:outline-none focus:border-black placeholder-gray-400 bg-transparent pr-10" />
                        <button type="button" @click="showPassword = !showPassword"
                            class="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
                            {{ showPassword ? 'Hide' : 'Show' }}
                        </button>
                    </div>

                    <!-- Remember me / Forgot -->
                    <div class="flex items-center justify-between text-sm">
                        <label class="inline-flex items-center gap-2">
                            <input type="checkbox" v-model="remember" class="form-checkbox h-4 w-4 text-black" />
                            <span class="text-gray-600">Remember me</span>
                        </label>
                        <router-link to="/forgot" class="text-gray-600 hover:underline">Forgot password?</router-link>
                    </div>

                    <!-- Button -->
                    <button type="submit" :disabled="loading"
                        class="w-full bg-black text-white py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-900 transition disabled:opacity-60">
                        <Loader2 v-if="loading" class="animate-spin w-4 h-4" />
                        <span>{{ loading ? 'Signing in...' : 'Sign in' }}</span>
                    </button>
                </form>

                <!-- Divider -->
                <div class="flex items-center my-6">
                    <div class="flex-1 h-px bg-gray-200"></div>
                    <span class="px-3 text-xs text-gray-400">OR</span>
                    <div class="flex-1 h-px bg-gray-200"></div>
                </div>

                <!-- Social buttons -->
                <div class="grid grid-cols-2 gap-3">
                    <button @click="socialLogin('google')" :disabled="loading"
                        class="flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-4 h-4" />
                        Google
                    </button>
                    <button @click="socialLogin('github')" :disabled="loading"
                        class="flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                        <Github class="w-4 h-4" />
                        GitHub
                    </button>
                </div>

                <!-- Signup link -->
                <div class="text-center mt-8 text-sm text-gray-500">
                    Don’t have an account?
                    <router-link to="/signup" class="text-black font-medium hover:underline">Register</router-link>
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
import { Mail, Lock, Loader2, Github } from 'lucide-vue-next'

const router = useRouter()
const email = ref('')
const password = ref('')
const remember = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
    loading.value = true
    errorMessage.value = ''

    try {
        const res = await axios.post(`${API_URL}/auth/login`, {
            email: email.value,
            password: password.value,
        })

        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', res.data.user)
        if (remember.value) localStorage.setItem('remember', '1')
        router.push('/blog')
    } catch (err) {
        console.error(err)
        errorMessage.value = err.response?.data?.message || 'Invalid credentials, please try again.'
    } finally {
        loading.value = false
    }
}

function socialLogin(provider) {
    alert(`Social login with ${provider} (coming soon)`)
}
</script>
