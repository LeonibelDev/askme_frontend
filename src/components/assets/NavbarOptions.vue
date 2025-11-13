<template>
    <div>
        <GuestNavbar v-if="!token" />
        <UserNavbar v-else />
    </div>
</template>

<script setup>
import GuestNavbar from './GuestNavbar.vue'
import UserNavbar from './UserNavbar.vue'

const token = localStorage.getItem("token")
</script>

<style></style>
