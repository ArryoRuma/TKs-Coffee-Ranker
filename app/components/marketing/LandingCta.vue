<script setup lang="ts">
defineProps<{
  title: string;
  body: string;
  button: { label: string; to: string };
}>();
</script>

<template>
  <section class="space-y-4 rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center shadow-sm">
    <h2 class="text-3xl font-semibold tracking-tight text-stone-900">{{ title }}</h2>
    <p class="text-stone-700">{{ body }}</p>
    <div>
      <UButton :to="button.to" size="lg">{{ button.label }}</UButton>
    </div>
  </section>
</template>
