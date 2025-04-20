<script setup lang="ts">
import type { PRODUCT } from '@/models/Products.DTO'
import Button from 'primevue/button'

const emit = defineEmits(['back', 'submit'])
interface Props {
  productInfo: PRODUCT
}
const props = defineProps<Props>()
</script>
<template>
  <div class="h-[65vh] flex flex-col justify-center items-center gap-y-8 mb-12 w-2/5">
    <div class="text-3xl font-bold mb-2 flex justify-between text-center">Summary</div>

    <div class="w-full flex flex-col items-start gap-y-2 text-lg">
      <div><b>Title:</b> {{ props.productInfo.title }}</div>
      <div>
        <b> Categories: </b>
        <span v-for="(cat, index) in props.productInfo.categories" :key="cat">
          {{ cat }}
          <span v-if="index < props.productInfo.categories.length - 1">, </span>
        </span>
      </div>
      <div><b> Description: </b>{{ props.productInfo.description }}</div>
      <div>
        <b> Price: </b> {{ props.productInfo.purchasePrice }} <b> To rent: </b>
        {{ props.productInfo.rentPrice }} {{ props.productInfo.rentDuration }}
      </div>
    </div>

    <div class="w-full flex justify-between">
      <Button
        class="text-white! bg-emerald-600! border-emerald-600! min-w-10! min-h-10!"
        icon="pi pi-chevron-left"
        label="Back"
        icon-pos="left"
        @click="emit('back')"
      />

      <Button
        class="text-white! bg-emerald-600! border-emerald-600! min-w-10! min-h-10!"
        icon="pi pi-send"
        label="Submit"
        icon-pos="right"
        @click="emit('submit')"
      />
    </div>
  </div>
</template>
