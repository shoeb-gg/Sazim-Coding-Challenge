<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'

import NavBar from './components/shared/NavBar.vue'

const route = useRoute()
</script>

<template>
  <header>
    <NavBar v-if="route.fullPath !== '/login' && route.fullPath !== '/register'" />
  </header>

  <RouterView />
</template>
