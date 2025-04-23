<script setup lang="ts">
import Button from 'primevue/button'
import { goToAllProducts, goToMyProducts, handleLogOut } from '@/services/authService'
import { useRoute } from 'vue-router'

const logout = () => {
  handleLogOut()
}
const toAllProducts = () => {
  goToAllProducts()
}
const toMyProducts = () => {
  goToMyProducts()
}

const route = useRoute()
</script>

<template>
  <div class="flex justify-end m-2 mb-5 gap-x-2">
    <Button
      v-if="route.fullPath === '/products/my'"
      class="text-lg! bg-sky-600! border-sky-900! text-white! font-bold"
      @click="toAllProducts"
    >
      All Products
    </Button>
    <Button
      v-if="route.fullPath === '/products/all'"
      class="text-lg! bg-sky-600! border-sky-900! text-white! font-bold"
      @click="toMyProducts"
    >
      My Products
    </Button>
    <Button
      v-if="route.fullPath !== '/login' && route.fullPath !== '/register'"
      type="submit"
      class="text-lg! bg-red-600! border-red-900! text-white! font-bold"
      @click="logout"
    >
      LOGOUT
    </Button>
  </div>
</template>
