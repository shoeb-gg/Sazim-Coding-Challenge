<script setup lang="ts">
import Button from 'primevue/button'
import { handleLogOut } from '@/services/authService'

const logout = () => {
  handleLogOut()
}
</script>

<template>
  <div class="flex justify-end m-2">
    <Button
      type="submit"
      class="text-lg! bg-red-700! border-red-900! text-white! font-bold"
      @click="logout()"
    >
      LOGOUT
    </Button>
  </div>
</template>
