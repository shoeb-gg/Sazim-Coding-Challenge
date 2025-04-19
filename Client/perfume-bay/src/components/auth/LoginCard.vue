<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { RouterLink } from 'vue-router'

import { getUserById } from '../../services/authService'
import { onMounted, ref } from 'vue'
import type { USER } from '@/models/User.DTO'

const user = ref<USER | null>(null)

onMounted(async () => {
  getUser()
})

const getUser = async () => {
  try {
    const { data } = await getUserById('1ea3f39a-959a-462d-b545-942e8b263915')
    user.value = data.getUser
  } catch (error) {
    console.error('Failed to fetch user:', error)
  }
}
</script>

<template>
  <div class="flex flex-col gap-6 border-2 p-12 w-3/5 border-gray-500 rounded-lg">
    <InputText class="w-full" type="text" placeholder="Email" />

    <Password :feedback="false" placeholder="Password" toggleMask />
    <Button class="text-xl! bg-sky-600! border-sky-600! text-white! font-semibold" severity="info">
      LOGIN
    </Button>

    <div class="text-center text-lg">
      Don't have an account? <RouterLink to="/register" class="text-sky-400">Signup</RouterLink>
    </div>

    <div v-if="user">{{ user.firstName }}</div>
  </div>
</template>

<style scoped></style>
