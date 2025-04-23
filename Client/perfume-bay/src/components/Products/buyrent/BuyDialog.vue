<script setup lang="ts">
import Button from 'primevue/button'

defineEmits(['update:visible'])
</script>
<template>
  <div class="flex justify-end mt-5 gap-x-2">
    <Button
      @click="$emit('update:visible', false)"
      label="No"
      class="text-white! bg-red-700! border-red-600! min-w-10! min-h-10! mr-2"
    />
    <Button label="Yes" class="text-white! bg-sky-600! border-sky-600! min-w-10! min-h-10! mr-2" />
  </div>
</template>
