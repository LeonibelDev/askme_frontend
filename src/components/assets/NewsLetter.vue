<template>
    <section class="w-full py-10 mt-[10rem] bg-white">
        <div class="max-w-2xl mx-auto px-4 text-center">
            <h2 class="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
                Get insights straight to your inbox
            </h2>

            <p class="text-gray-500 mt-4 text-base">
                Join a community of developers and makers. One email every Friday. No spam, ever.
            </p>

            <form @submit.prevent="subscribe" class="mt-8 flex flex-col sm:flex-row items-center gap-3">
                <input type="email" v-model="email" placeholder="you@example.com"
                    class="w-full sm:flex-1 rounded-full border border-gray-300 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/30 px-5 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition"
                    required />

                <button type="submit"
                    class="w-full sm:w-auto rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white px-6 py-3 text-sm font-semibold transition-all">
                    Subscribe
                </button>
            </form>

            <spam v-if="message" class="bg-green-100 text-green-700 m-4 px-3 py-1 rounded-full text-xs font-semibold">{{
                message }}
            </spam>

            <p class="text-xs text-gray-400 mt-4">
                No noise. Unsubscribe anytime with one click.
            </p>
        </div>
    </section>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { API_URL } from '@/config'

const email = ref('')
const message = ref('')

function subscribe() {
    axios.post(`${API_URL}/newsletter`, {
        email: email.value
    })
        .then(response => {
            email.value = ''

            if (response.status === 200) {
                message.value = 'subscribed'

                setTimeout(() => {
                    message.value = ''
                }, 3000)
            }
            if (response.status === 400) {

                message.value = 'user exist'

                setTimeout(() => {
                    message.value = ''
                }, 3000)

            }

        })
        .catch(err => {
            console.error(err)
        })

}
</script>