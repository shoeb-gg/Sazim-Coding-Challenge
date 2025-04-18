<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
</script>

<template>
  <div class="flex flex-col gap-6 border-2 p-12 w-3/5 border-gray-500 rounded-lg">
    <InputText class="w-full" type="text" placeholder="Email" />

    <Password :feedback="false" placeholder="Password" toggleMask />
    <Button class="text-xl! bg-sky-600! border-sky-600! text-white! font-semibold" severity="info">
      LOGIN
    </Button>

    <div class="text-center text-lg">
      Don't have an account? <a href="/register" class="text-sky-400">Signup</a>
    </div>
  </div>
</template>

<style scoped></style>
