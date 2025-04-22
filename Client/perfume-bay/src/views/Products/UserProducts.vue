<script setup lang="ts">
import ProductCard from '@/components/shared/ProductCard.vue'
import ProductListSkeleton from '@/components/shared/ProductListSkeleton.vue'
import { type PRODUCT } from '@/models/Products.DTO'
import Button from 'primevue/button'
import router from '@/router'
import { nextTick, onMounted, ref } from 'vue'
import { getProductForUser } from '@/services/productService'

const products = ref<PRODUCT[]>([])

onMounted(() => {
  getProductForUser()
    .then((result) => {
      if (result?.data?.getProductForUser) {
        products.value = result?.data?.getProductForUser
      }
    })
    .catch((error) => {
      console.error('Error creating product:', error)
      throw error
    })
})

const goToAddProducts = async () => {
  await nextTick()

  router.push('/products/add')
}
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center gap-y-5 mb-12">
    <div class="text-4xl font-bold mb-2 flex justify-between w-3/5">
      <span> My Products </span>
      <Button
        class="text-white! bg-emerald-600! border-emerald-600! min-w-10! min-h-10!"
        icon="pi pi-plus-circle"
        label="Add Product"
        @click="goToAddProducts()"
      />
    </div>

    <div v-if="products.length" class="flex flex-col items-center gap-y-5 w-3/5">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
    <ProductListSkeleton v-else />
  </div>
</template>
