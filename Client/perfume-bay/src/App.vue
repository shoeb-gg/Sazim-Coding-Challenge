<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import NavBar from './components/shared/NavBar.vue'
import Toast from 'primevue/toast'

const route = useRoute()
</script>

<template>
  <Toast />

  <header>
    <NavBar v-if="route.fullPath !== '/login' && route.fullPath !== '/register'" />
  </header>

  <RouterView />
</template>
