<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { ref, watch } from 'vue'

const emit = defineEmits(['back', 'next', 'update:title'])

const props = defineProps({
  title: String,
})

const titleValue = ref<string>(props.title ?? '')
watch(
  () => props.title,
  (newVal) => {
    titleValue.value = newVal ?? ''
  },
)

const onInput = (val: string) => {
  titleValue.value = val
  emit('update:title', val)
}
</script>
<template>
  <div class="h-[65vh] flex flex-col justify-center items-center gap-y-8 mb-12 w-2/5">
    <div class="text-2xl font-bold mb-2 flex justify-between text-center">
      Select a title for your product
    </div>

    <InputText
      class="w-full"
      type="text"
      variant="filled"
      v-model="titleValue"
      @input="onInput($event.target.value)"
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
