<script setup lang="ts">
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import { ref, watch } from 'vue'

const emit = defineEmits(['back', 'next', 'update:description'])

const props = defineProps({
  description: String,
})

const descriptionValue = ref<string>(props.description ?? '')
watch(
  () => props.description,
  (newVal) => {
    descriptionValue.value = newVal ?? ''
  },
)

const onInput = (val: string) => {
  descriptionValue.value = val
  emit('update:description', val)
}
</script>
<template>
  <div class="h-[65vh] flex flex-col justify-center items-center gap-y-8 mb-12 w-2/5">
    <div class="text-2xl font-bold mb-2 flex justify-between text-center">Add the description</div>

    <Textarea
      class="w-full"
      v-model="descriptionValue"
      @input="onInput($event.target.value)"
      variant="filled"
      rows="5"
      cols="30"
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
