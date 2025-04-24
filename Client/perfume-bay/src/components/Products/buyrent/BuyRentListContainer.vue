<script setup lang="ts">
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import { useQuery } from '@vue/apollo-composable'
import { GetUserPurchases } from '@/services/productService'
import { ref } from 'vue'
import type { PRODUCT } from '@/models/Products.DTO'
import ProductCard from '@/components/shared/ProductCard.vue'
import ProductListSkeleton from '@/components/shared/ProductListSkeleton.vue'

const products = ref<PRODUCT[] | undefined>()

const { onResult, loading } = useQuery(GetUserPurchases, {
  fetchPolicy: 'cache-first',
})

onResult((res) => {
  if (res?.data?.getUserPurchases) products.value = res?.data?.getUserPurchases
})
</script>
<template>
  <div class="">
    <Tabs value="0">
      <TabList>
        <Tab value="0">Bought</Tab>
        <Tab value="1">Sold</Tab>
        <Tab value="2">Borrowed</Tab>
        <Tab value="3">Lent</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <div v-if="!loading" class="w-full flex justify-center">
            <div class="flex flex-col items-center gap-y-5 w-3/5">
              <ProductCard v-for="product in products" :key="product.id" :product="product" />
            </div>
          </div>
          <div v-else class="w-full flex flex-col items-center gap-y-5">
            <ProductListSkeleton v-for="num in [1, 2, 3]" :key="num" />
          </div>
        </TabPanel>
        <TabPanel value="1"> Sold Products </TabPanel>
        <TabPanel value="2"> Borrowed Products </TabPanel>
        <TabPanel value="3"> Lent Products</TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
