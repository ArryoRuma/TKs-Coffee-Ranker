<script setup lang="ts">
defineProps<{
  title: string;
  columns?: "2" | "3";
  cards: Array<{ title: string; body: string }>;
}>();
</script>

<template>
  <section class="space-y-4">
    <h2 class="text-3xl font-semibold tracking-tight text-stone-900">{{ title }}</h2>
    <div :class="columns === '3' ? 'grid gap-4 md:grid-cols-3' : 'grid gap-4 md:grid-cols-2'">
      <UCard v-for="card in cards" :key="card.title">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold">{{ card.title }}</h3>
          <p class="text-sm text-stone-600">{{ card.body }}</p>
        </div>
      </UCard>
    </div>
  </section>
</template>
