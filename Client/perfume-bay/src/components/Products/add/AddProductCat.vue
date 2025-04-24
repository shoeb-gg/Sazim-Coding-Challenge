<script setup lang="ts">
import { ref, watch, type PropType } from 'vue'
import Button from 'primevue/button'
import MultiSelect from 'primevue/multiselect'
import { ProductCategory } from '@/models/Products.DTO'

const emit = defineEmits(['back', 'next', 'update:categories'])
const categoryOptions = Object.values(ProductCategory)

const props = defineProps({
  categories: Array as PropType<string[]>,
  default: () => [],
})

const categoriesValue = ref<string[]>(props.categories ?? [])
watch(
  () => props.categories,
  (newVal) => {
    categoriesValue.value = newVal ?? []
  },
)

const onInput = (val: string[]) => {
  categoriesValue.value = val
  emit('update:categories', val)
}
</script>
<template>
  <div class="h-[65vh] flex flex-col justify-center items-center gap-y-8 mb-12 w-2/5">
    <div class="text-2xl font-bold mb-2 flex justify-between text-center">Select categories</div>

    <MultiSelect
      v-model="categoriesValue"
      :options="categoryOptions"
      variant="filled"
      placeholder="Select a category"
      :maxSelectedLabels="3"
      class="w-full"
      @update:modelValue="onInput"
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
