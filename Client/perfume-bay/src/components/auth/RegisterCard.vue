<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
</script>

<template>
  <div class="flex flex-col gap-6 border-2 p-12 w-3/5 border-gray-500 rounded-lg">
    <div class="flex gap-5">
      <InputText class="w-full" type="text" placeholder="First Name" />
      <InputText class="w-full" type="text" placeholder="Last Name" />
    </div>
    <InputText class="w-full" type="text" placeholder="Address" />
    <div class="flex gap-5">
      <InputText class="w-full" type="text" placeholder="Email" />
      <InputText class="w-full" type="text" placeholder="Phone Number" />
    </div>
    <Password :feedback="false" placeholder="Password" toggleMask />
    <Password :feedback="false" placeholder="Confirm Password" toggleMask />

    <Button class="text-xl! bg-sky-600! border-sky-600! text-white! font-semibold" severity="info">
      REGISTER
    </Button>

    <div class="text-center text-lg">
      Already have an account? <a href="/login" class="text-sky-400">Sign In</a>
    </div>
  </div>
</template>

<style scoped></style>
