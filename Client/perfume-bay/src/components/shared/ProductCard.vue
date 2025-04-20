<script setup lang="ts">
import type { PRODUCT } from '@/models/Products.DTO'
import Button from 'primevue/button'

defineProps<{
  product: PRODUCT
}>()
</script>

<template>
  <div class="flex flex-col gap-3 border-2 p-8 w-full border-gray-500 rounded-lg">
    <div class="text-2xl font-semibold flex justify-between items-center w-full">
      <span> {{ product.title }} </span>
      <Button
        class="text-white! bg-red-500! border-red-500! min-w-10! min-h-10!"
        icon="pi pi-trash"
        severity="danger"
      />
    </div>
    <div class="w-full">
      Categories:
      <span v-for="(cat, index) in product.categories" :key="cat">
        {{ cat }}<span v-if="index < product.categories.length - 1">, </span></span
      >
    </div>
    <div class="w-full">
      <b> Price:</b> BDT {{ product.purchasePrice }} | <b>Rent:</b> BDT {{ product.rentPrice }}
      {{ product.rentDuration }}
    </div>

    <div class="text-justify w-full my-4">
      {{ product.description }}
    </div>

    <div class="text-sm w-full">Date Posted: 2023-10-01</div>
  </div>
</template>
