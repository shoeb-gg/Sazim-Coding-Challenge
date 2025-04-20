<script setup lang="ts">
import ProductCard from '@/components/shared/ProductCard.vue'
import { ProductCategory, type PRODUCT } from '@/models/Products.DTO'
import Button from 'primevue/button'
import router from '@/router'
import { nextTick } from 'vue'

const products: PRODUCT[] = [
  {
    id: '1',
    title: 'Smartphone',
    categories: [ProductCategory.ELECTRONICS],
    description: 'A high-end smartphone with excellent camera and battery life.',
    purchasePrice: 999,
    rentPrice: 15,
    rentDuration: 'per day',
  },
  {
    id: '2',
    title: 'Sofa Set',
    categories: [ProductCategory.FURNITURE],
    description: 'A comfortable 3-seater sofa made with premium fabric.',
    purchasePrice: 1200,
    rentPrice: 40,
    rentDuration: 'per week',
  },
  {
    id: '3',
    title: 'Microwave Oven',
    categories: [ProductCategory.HOME_APPLIANCES],
    description: 'Compact and energy-efficient microwave with grill function.',
    purchasePrice: 250,
    rentPrice: 10,
    rentDuration: 'per week',
  },
  {
    id: '4',
    title: 'Treadmill',
    categories: [ProductCategory.SPORTING_GOODS, ProductCategory.HOME_APPLIANCES],
    description: 'Foldable treadmill with multiple speed settings and digital display.',
    purchasePrice: 800,
    rentPrice: 25,
    rentDuration: 'per month',
  },
  {
    id: '5',
    title: 'Camping Tent',
    categories: [ProductCategory.OUTDOOR],
    description: 'Waterproof 4-person tent suitable for all seasons.',
    purchasePrice: 300,
    rentPrice: 20,
    rentDuration: 'per day',
  },
]

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
    <ProductCard v-for="product in products" :key="product.id" />
  </div>
</template>
