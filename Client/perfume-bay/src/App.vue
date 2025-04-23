<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/shared/NavBar.vue'
import Toast from 'primevue/toast'
</script>

<template>
  <Toast />

  <header>
    <NavBar />
  </header>

  <RouterView />
</template>
