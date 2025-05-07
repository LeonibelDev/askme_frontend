<template>
    <div>
        <GuestNavbar v-if="!token" />
        <UserNavbar v-else />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import GuestNavbar from './GuestNavbar.vue'
import UserNavbar from './UserNavbar.vue'

const token = ref('')

if (typeof window !== 'undefined') {
    token.value = localStorage.getItem('token') || ''
}

watch(token, (newToken) => {
    if (newToken) {
        localStorage.setItem('token', newToken)
    } else {
        localStorage.removeItem('token')
    }
})
</script>

<style></style>
