<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { RouterLink } from 'vue-router'

import { loginQuery, loginSuccess } from '../../services/authService'
import { onMounted, ref } from 'vue'

const email = ref<string>('')
const password = ref<string>('')

onMounted(async () => {})

const login = async () => {
  try {
    const { data } = await loginQuery(email.value, password.value)
    if (data?.login?.success) {
      await loginSuccess(data.login.access_token)
    } else {
      console.error('Login failed:', data.login.message)
    }
  } catch (error) {
    console.error('Failed to fetch user:', error)
  }
}
</script>

<template>
  <form
    class="flex flex-col gap-6 border-2 p-12 w-3/5 border-gray-500 rounded-lg"
    @submit.prevent="login()"
  >
    <InputText v-model="email" class="w-full" type="text" placeholder="Email" />

    <Password v-model="password" :feedback="false" placeholder="Password" toggleMask />
    <Button
      type="submit"
      class="text-xl! bg-sky-600! border-sky-600! text-white! font-semibold"
      severity="info"
    >
      LOGIN
    </Button>

    <div class="text-center text-lg">
      Don't have an account? <RouterLink to="/register" class="text-sky-400">Signup</RouterLink>
    </div>
  </form>
</template>

<style scoped></style>
