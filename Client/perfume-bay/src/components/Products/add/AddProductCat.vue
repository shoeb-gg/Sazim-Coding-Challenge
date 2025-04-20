<script setup lang="ts">
import { type PropType } from 'vue'
import Button from 'primevue/button'
import MultiSelect from 'primevue/multiselect'
import { ProductCategory } from '@/models/Products.DTO'

const emit = defineEmits(['back', 'next', 'update:categories'])
const categoryOptions = Object.values(ProductCategory)

defineProps({
  categories: Array as PropType<string[]>,
  default: () => [],
})
</script>
<template>
  <div class="h-[65vh] flex flex-col justify-center items-center gap-y-8 mb-12 w-2/5">
    <div class="text-2xl font-bold mb-2 flex justify-between text-center">Select categories</div>

    <MultiSelect
      :v-model="categories"
      :options="categoryOptions"
      variant="filled"
      filter
      placeholder="Select a category"
      :maxSelectedLabels="3"
      class="w-full"
      @update:modelValue="$emit('update:categories', $event)"
    />

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
        icon="pi pi-chevron-right"
        label="Next"
        icon-pos="right"
        @click="emit('next')"
      />
    </div>
  </div>
</template>
