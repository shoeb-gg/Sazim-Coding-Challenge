<script setup lang="ts">
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import type { Rent_Duration } from '@/models/Products.DTO'

const emit = defineEmits([
  'back',
  'next',
  'update:purchasePrice',
  'update:rentPrice',
  'update:rentDuration',
])

defineProps({
  purchasePrice: Number,
  rentPrice: Number,
  rentDuration: String,
})

const rentDurationOptions: Rent_Duration[] = ['per day', 'per week', 'per month']
</script>
<template>
  <div class="h-[65vh] flex flex-col justify-center items-center gap-y-5 mb-12 w-2/5">
    <div class="text-2xl font-bold mb-2 flex justify-between text-center">Set the Price</div>

    <InputNumber
      placeholder="Purchase price"
      mode="currency"
      currency="BDT"
      :v-model="purchasePrice"
      :minFractionDigits="2"
      :maxFractionDigits="5"
      fluid
      variant="filled"
      @update:modelValue="$emit('update:purchasePrice', $event)"
    />

    <div class="text-xl font-semibold text-start w-full">Rent</div>

    <div class="flex w-full gap-x-5">
      <InputNumber
        placeholder="Rent price"
        mode="currency"
        currency="BDT"
        :v-model="rentPrice"
        :minFractionDigits="2"
        :maxFractionDigits="5"
        fluid
        variant="filled"
        @update:modelValue="$emit('update:rentPrice', $event)"
      />
      <Select
        :v-model="rentDuration"
        :options="rentDurationOptions"
        placeholder="Select duration"
        class="w-full"
        variant="filled"
        @update:modelValue="$emit('update:rentDuration', $event)"
      />
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
        icon="pi pi-chevron-right"
        label="Next"
        icon-pos="right"
        @click="emit('next')"
      />
    </div>
  </div>
</template>
