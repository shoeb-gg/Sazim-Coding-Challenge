<script setup lang="ts">
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import type { Rent_Duration } from '@/models/Products.DTO'
import { ref, watch } from 'vue'

const emit = defineEmits([
  'back',
  'next',
  'update:purchasePrice',
  'update:rentPrice',
  'update:rentDuration',
])

const props = defineProps({
  purchasePrice: Number,
  rentPrice: Number,
  rentDuration: String,
})

const purchasePriceValue = ref<number | null>(props.purchasePrice ?? null)
const rentPriceValue = ref<number | null>(props.rentPrice ?? null)
const rentDurationValue = ref<string>(props.rentDuration ?? '')
watch(
  () => props.purchasePrice,
  (newVal) => {
    purchasePriceValue.value = newVal ?? null
  },
)
watch(
  () => props.rentPrice,
  (newVal) => {
    rentPriceValue.value = newVal ?? null
  },
)
watch(
  () => props.rentDuration,
  (newVal) => {
    rentDurationValue.value = newVal ?? ''
  },
)

const onInputPurchasePrice = (val: number) => {
  purchasePriceValue.value = val
  emit('update:purchasePrice', val)
}
const onInputRentPrice = (val: number) => {
  rentPriceValue.value = val
  emit('update:rentPrice', val)
}
const onInputRentDuration = (val: string) => {
  rentDurationValue.value = val
  emit('update:rentDuration', val)
}

const rentDurationOptions: Rent_Duration[] = ['per day', 'per week', 'per month']
</script>
<template>
  <div class="h-[65vh] flex flex-col justify-center items-center gap-y-5 mb-12 w-2/5">
    <div class="text-2xl font-bold mb-2 flex justify-between text-center">Set the Price</div>

    <InputNumber
      placeholder="Purchase price"
      mode="currency"
      currency="BDT"
      v-model="purchasePriceValue"
      :minFractionDigits="2"
      :maxFractionDigits="5"
      fluid
      variant="filled"
      @update:modelValue="onInputPurchasePrice"
    />

    <div class="text-xl font-semibold text-start w-full">Rent</div>

    <div class="flex w-full gap-x-5">
      <InputNumber
        placeholder="Rent price"
        mode="currency"
        currency="BDT"
        v-model="rentPriceValue"
        :minFractionDigits="2"
        :maxFractionDigits="5"
        fluid
        variant="filled"
        @update:modelValue="onInputRentPrice"
      />
      <Select
        v-model="rentDurationValue"
        :options="rentDurationOptions"
        placeholder="Select duration"
        class="w-full"
        variant="filled"
        @update:modelValue="onInputRentDuration"
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
