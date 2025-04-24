<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { BuyProduct, GetProductById } from '@/services/productService'
import { useRoute } from 'vue-router'
import { useMutation, useQuery } from '@vue/apollo-composable'
import type { PRODUCT } from '@/models/Products.DTO'
import { nextTick, ref } from 'vue'
import Button from 'primevue/button'
import router from '@/router'
import Dialog from 'primevue/dialog'
import RentDialog from './RentDialog.vue'
import BuyDialog from './BuyDialog.vue'

const toast = useToast()
const product = ref<PRODUCT | undefined>()
const rentDialogVisible = ref(false)
const buyDialogVisible = ref(false)
const route = useRoute()
const { onResult, loading } = useQuery(
  GetProductById,
  {
    id: route.params.id as string,
  },
  {
    fetchPolicy: 'cache-first',
  },
)
const { mutate: buyProductMutation } = useMutation(BuyProduct)

onResult((res) => {
  if (res?.data?.getProductById) product.value = res?.data?.getProductById
})

const back = () => {
  router.back()
}

const showSuccessToast = () => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Product Bought successfully !',
    life: 3000,
  })
}
const showErrorToast = () => {
  toast.add({
    severity: 'danger',
    summary: 'Error',
    detail: 'Error buying product',
    life: 3000,
  })
}

const buyProduct = async () => {
  try {
    const { data } = await buyProductMutation({
      id: route.params.id as string,
    })

    if (data?.buyProduct) {
      showSuccessToast()
      rentDialogVisible.value = true
      await nextTick()
      router.back()
    } else {
      showErrorToast()
      rentDialogVisible.value = false
    }
  } catch (error) {
    showErrorToast()
    console.error('Error creating product:', error)
    throw error
  }
}
</script>
<template>
  <div v-if="!loading" class="flex flex-col items-center justify-center gap-y-5 w-3/5 h-[65vh]">
    <div class="text-4xl font-semibold flex justify-between items-center w-full">
      <span> {{ product?.title }} </span>
    </div>
    <div class="w-full text-xl">
      Categories:
      <span v-for="(cat, index) in product?.categories" :key="cat">
        {{ cat }}<span v-if="index < (product?.categories ?? []).length - 1">, </span></span
      >
    </div>
    <div class="w-full text-xl">
      <b> Price:</b> BDT {{ product?.purchasePrice }} | <b>Rent:</b> BDT {{ product?.rentPrice }}
      {{ product?.rentDuration }}
    </div>

    <div class="text-justify w-full my-4 text-xl">
      {{ product?.description }}
    </div>

    <div class="flex justify-between items-center w-full">
      <Button
        class="text-white! bg-sky-600! border-sky-600! min-w-10! min-h-10!"
        label="Back"
        severity="danger"
        @click="back"
      />
      <span class="">
        <Button
          class="text-white! bg-sky-600! border-sky-600! min-w-10! min-h-10! mr-2"
          label="Rent"
          severity="danger"
          @click="rentDialogVisible = true"
        />
        <Button
          class="text-white! bg-sky-600! border-sky-600! min-w-10! min-h-10!"
          label="Buy"
          severity="danger"
          @click="buyDialogVisible = true"
        />
      </span>
    </div>
  </div>

  <Dialog
    v-model:visible="rentDialogVisible"
    dismissableMask
    modal
    header="Rental Period"
    :style="{ width: '50vw' }"
  >
    <RentDialog v-model:visible="rentDialogVisible" />
  </Dialog>

  <Dialog
    v-model:visible="buyDialogVisible"
    dismissableMask
    modal
    header="Are you sure you want to buy this product?"
    :style="{ width: '50vw' }"
  >
    <BuyDialog v-model:visible="buyDialogVisible" @confirm="buyProduct" />
  </Dialog>
</template>
