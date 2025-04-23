<script setup lang="ts">
import ProductCard from '@/components/shared/ProductCard.vue'
import ProductListSkeleton from '@/components/shared/ProductListSkeleton.vue'
import { type PRODUCT } from '@/models/Products.DTO'
import Button from 'primevue/button'
import router from '@/router'
import { computed, nextTick, type Ref } from 'vue'
import { GetProductForUser } from '@/services/productService'
import { useQuery } from '@vue/apollo-composable'

const { result, loading } = useQuery(GetProductForUser)
const products: Ref<PRODUCT[]> = computed(() => result.value?.getProductForUser ?? [])

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

    <div v-if="!loading" class="flex flex-col items-center gap-y-5 w-3/5">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
    <div v-else class="w-full flex flex-col items-center gap-y-5">
      <ProductListSkeleton v-for="num in [1, 2, 3]" :key="num" />
    </div>
  </div>
</template>
