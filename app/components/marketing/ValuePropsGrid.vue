<script setup lang="ts">
defineProps<{
  valueProps: Array<{ title: string; body: string }>;
}>();
</script>

<template>
  <section class="grid gap-4 md:grid-cols-2">
    <UCard v-for="prop in valueProps" :key="prop.title">
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold tracking-tight">{{ prop.title }}</h2>
        <p class="text-sm text-stone-600">{{ prop.body }}</p>
      </div>
    </UCard>
  </section>
</template>
