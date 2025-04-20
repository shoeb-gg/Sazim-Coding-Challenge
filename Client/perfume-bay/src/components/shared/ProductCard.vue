<script setup lang="ts">
import Button from 'primevue/button'
</script>

<template>
  <div class="flex flex-col gap-3 border-2 p-8 w-3/5 border-gray-500 rounded-lg">
    <div class="text-2xl font-semibold flex justify-between items-center">
      <span> Crciket kit </span>
      <Button
        class="text-white! bg-red-500! border-red-500! min-w-10! min-h-10!"
        icon="pi pi-trash"
        severity="danger"
      />
    </div>
    <div class="">Categories: Sporting, Outdor</div>
    <div class="">Prce: $500 | Rent: $100 daily</div>

    <div class="font-medium text-justify">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur reiciendis, et sed cum
      doloribus deserunt corrupti, beatae quis, minima voluptatem architecto hic repellat alias
      dolorem reprehenderit ratione? Doloribus, velit nam. Lorem ipsum dolor sit amet consectetur,
      adipisicing elit. Error fuga est voluptatibus. Praesentium dignissimos delectus vero veritatis
      quaerat possimus dolor omnis eum ipsam corrupti, dolores, necessitatibus est inventore
      blanditiis ducimus.
    </div>

    <div class="text-sm">Date Posted: 2023-10-01</div>
  </div>
</template>
