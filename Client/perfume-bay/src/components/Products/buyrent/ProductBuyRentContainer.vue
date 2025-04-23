<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { GetProductById } from '@/services/productService'
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import type { PRODUCT } from '@/models/Products.DTO'
import { ref } from 'vue'
import Button from 'primevue/button'
import router from '@/router'

const toast = useToast()
const product = ref<PRODUCT | undefined>()

const { onResult, loading } = useQuery(
  GetProductById,
  {
    id: useRoute().params.id as string,
  },
  {
    fetchPolicy: 'cache-first',
  },
)
onResult((res) => {
  if (res?.data?.getProductById) product.value = res?.data?.getProductById
})

const back = () => {
  router.back()
}
</script>
<template>
  <div v-if="!loading" class="flex flex-col items-center justify-center gap-y-5 w-3/5 h-[65vh]">
    <div class="text-4xl font-semibold flex justify-between items-center w-full">
      <span> {{ product?.title }} </span>
    </div>
    <div class="w-full text-xl">
      Categories:
      <span v-for="(cat, index) in product?.categories" :key="cat">
        {{ cat }}<span v-if="index < (product?.categories ?? []).length - 1">, </span></span
      >
    </div>
    <div class="w-full text-xl">
      <b> Price:</b> BDT {{ product?.purchasePrice }} | <b>Rent:</b> BDT {{ product?.rentPrice }}
      {{ product?.rentDuration }}
    </div>

    <div class="text-justify w-full my-4 text-xl">
      {{ product?.description }}
    </div>

    <div class="flex justify-between items-center w-full">
      <Button
        class="text-white! bg-sky-600! border-sky-600! min-w-10! min-h-10!"
        label="Back"
        severity="danger"
        @click="back"
      />
      <span class="">
        <Button
          class="text-white! bg-sky-600! border-sky-600! min-w-10! min-h-10! mr-2"
          label="Rent"
          severity="danger"
        />
        <Button
          class="text-white! bg-sky-600! border-sky-600! min-w-10! min-h-10!"
          label="Buy"
          severity="danger"
        />
      </span>
    </div>
  </div>
</template>
