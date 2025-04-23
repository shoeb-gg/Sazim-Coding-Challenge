<script setup lang="ts">
import type { PRODUCT } from '@/models/Products.DTO'
import router from '@/router'
import { useMutation } from '@vue/apollo-composable'
import Button from 'primevue/button'
import { nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { DeleteProduct, refreshProducts } from '@/services/productService'
import { useToast } from 'primevue'

const props = defineProps<{
  product: PRODUCT
}>()

const { mutate: deleteProductMutation } = useMutation(DeleteProduct)

const route = useRoute()

const toast = useToast()
const showSuccessToast = () => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Product deleted successfully !',
    life: 3000,
  })
}
const showErrorToast = () => {
  toast.add({
    severity: 'danger',
    summary: 'Error',
    detail: 'Error deleting product',
    life: 3000,
  })
}

const deleteProduct = async () => {
  try {
    const { data } = await deleteProductMutation({
      id: props.product.id,
    })

    if (data?.deleteProduct) {
      refreshProducts()
      showSuccessToast()
    } else {
      showErrorToast()
    }
  } catch (error) {
    showErrorToast()
    console.error('Error deleting product:', error)
    throw error
  }
}

const onProductClick = async () => {
  await nextTick()

  if (route.fullPath === '/products/all') router.push(`/products/buyrent/${props.product.id}`)
  else router.push(`/products/edit/${props.product.id}`)
}
</script>

<template>
  <div
    class="flex flex-col gap-3 border-2 p-8 w-full border-gray-500 rounded-lg cursor-pointer"
    @click.prevent="onProductClick()"
  >
    <div class="text-2xl font-semibold flex justify-between items-center w-full">
      <span> {{ product.title }} </span>
      <Button
        v-if="route.fullPath === '/products/my'"
        class="text-white! bg-red-500! border-red-500! min-w-10! min-h-10!"
        icon="pi pi-trash"
        severity="danger"
        @click.prevent.stop="deleteProduct"
      />
    </div>
    <div class="w-full">
      Categories:
      <span v-for="(cat, index) in product.categories" :key="cat">
        {{ cat }}<span v-if="index < product.categories.length - 1">, </span></span
      >
    </div>
    <div class="w-full">
      <b> Price:</b> BDT {{ product.purchasePrice }} | <b>Rent:</b> BDT {{ product.rentPrice }}
      {{ product.rentDuration }}
    </div>

    <div class="text-justify w-full my-4">
      {{ product.description }}
    </div>
  </div>
</template>
