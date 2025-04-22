<script setup lang="ts">
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import { ProductCategory, type Rent_Duration } from '@/models/Products.DTO'
import type { PRODUCT } from '@/models/Products.DTO'
import Button from 'primevue/button'

interface Props {
  product: PRODUCT | undefined
}
const props = defineProps<Props>()
const emit = defineEmits(['update:updatedProduct', 'submit'])

const categoryOptions = Object.values(ProductCategory)
const rentDurationOptions: Rent_Duration[] = ['per day', 'per week', 'per month']
</script>
<template>
  <div v-if="props.product" class="w-3/5 flex flex-col justify-center gap-y-5 h-[60vh]">
    <InputText
      :model-value="props.product?.title"
      placeholder="Enter a title"
      class="w-full"
      type="text"
      variant="filled"
      @update:modelValue="emit('update:updatedProduct', { ...props.product, title: $event })"
    />
    <MultiSelect
      :model-value="props.product?.categories"
      :options="categoryOptions"
      variant="filled"
      filter
      placeholder="Select a category"
      :maxSelectedLabels="3"
      class="w-full"
      @update:modelValue="emit('update:updatedProduct', { ...props.product, categories: $event })"
    />
    <Textarea
      class="w-full"
      variant="filled"
      rows="5"
      cols="30"
      :model-value="props.product?.description"
      @update:modelValue="emit('update:updatedProduct', { ...props.product, description: $event })"
    />

    <div class="flex gap-x-5">
      <span>
        <div class="mb-2 font-semibold">Price</div>
        <div>
          <InputNumber
            :model-value="props.product?.purchasePrice"
            placeholder="Purchase price"
            mode="currency"
            currency="BDT"
            :minFractionDigits="2"
            :maxFractionDigits="5"
            fluid
            variant="filled"
            @update:modelValue="
              emit('update:updatedProduct', { ...props.product, purchasePrice: $event })
            "
          />
        </div>
      </span>
      <span>
        <div class="mb-2 font-semibold">Rent</div>
        <div>
          <InputNumber
            :model-value="props.product?.rentPrice"
            placeholder="Purchase rent"
            mode="currency"
            currency="BDT"
            :minFractionDigits="2"
            :maxFractionDigits="5"
            fluid
            variant="filled"
            @update:modelValue="
              emit('update:updatedProduct', { ...props.product, rentPrice: $event })
            "
          />
        </div>
      </span>
      <span>
        <div class="mb-2 opacity-0">halum</div>
        <div>
          <Select
            :model-value="props.product?.rentDuration"
            :options="rentDurationOptions"
            placeholder="Select duration"
            class="w-full"
            variant="filled"
            @update:modelValue="
              emit('update:updatedProduct', { ...props.product, rentDuration: $event })
            "
          />
        </div>
      </span>
    </div>
    <div class="flex justify-end">
      <Button
        class="text-white! bg-emerald-600! border-emerald-600! min-w-20 font-semibold text-lg!"
        icon="pi pi-send"
        icon-pos="right"
        label="Edit"
        @click.prevent="emit('submit')"
      />
    </div>
  </div>
</template>
