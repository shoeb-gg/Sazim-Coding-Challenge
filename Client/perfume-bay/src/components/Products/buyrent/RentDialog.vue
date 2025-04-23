<script setup lang="ts">
import DatePicker from 'primevue/datepicker'
import Button from 'primevue/button'

defineEmits(['update:visible'])
</script>
<template>
  <div class="flex gap-x-5">
    <span class="flex flex-col gap-y-2">
      <div>From</div>
      <div><DatePicker v-model="date" placeholder="dd/mm/yyyy" dateFormat="dd/mm/yy" /></div>
    </span>

    <span class="flex flex-col gap-y-2">
      <div>To</div>
      <div><DatePicker v-model="date" placeholder="dd/mm/yyyy" dateFormat="dd/mm/yy" /></div>
    </span>
  </div>

  <div class="flex justify-end mt-5 gap-x-2">
    <Button
      @click="$emit('update:visible', false)"
      label="Back"
      class="text-white! bg-red-700! border-red-600! min-w-10! min-h-10! mr-2"
    />
    <Button
      label="Confirm Rent"
      class="text-white! bg-sky-600! border-sky-600! min-w-10! min-h-10! mr-2"
    />
  </div>
</template>
