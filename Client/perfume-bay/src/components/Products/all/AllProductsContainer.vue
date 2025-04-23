<script setup lang="ts">
import type { PRODUCT } from '@/models/Products.DTO'
import { GetAllProducts } from '@/services/productService'
import { useQuery } from '@vue/apollo-composable'
import { ref } from 'vue'
import ProductCard from '@/components/shared/ProductCard.vue'
import ProductListSkeleton from '@/components/shared/ProductListSkeleton.vue'

const products = ref<PRODUCT[]>([])
const { onResult, loading } = useQuery(GetAllProducts)

onResult((res) => {
  if (res?.data?.getAllProducts) products.value = res?.data?.getAllProducts
})
</script>
<template>
  <div class="h-full flex flex-col justify-center items-center mb-5">
    <div v-if="!loading" class="flex flex-col items-center gap-y-5 w-3/5">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
    <ProductListSkeleton v-else />
  </div>
</template>
