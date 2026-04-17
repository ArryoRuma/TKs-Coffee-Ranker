<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title: string;
  lead: string;
  supporting: string;
  primaryCta: { label: string; to: string };
  secondaryCta: { label: string; to: string };
}>();
</script>

<template>
  <section
    class="space-y-6 rounded-3xl border border-stone-200 bg-gradient-to-br from-white via-stone-50 to-amber-50 p-8 shadow-sm md:p-12"
  >
    <p class="text-sm font-medium uppercase tracking-[0.18em] text-amber-900">{{ eyebrow }}</p>
    <h1 class="max-w-3xl text-4xl font-semibold tracking-tight text-stone-900 md:text-6xl">
      {{ title }}
    </h1>
    <p class="max-w-2xl text-lg text-stone-600">{{ lead }}</p>
    <p class="max-w-2xl text-stone-600">{{ supporting }}</p>
    <div class="flex flex-wrap gap-3">
      <UButton :to="primaryCta.to" size="lg">{{ primaryCta.label }}</UButton>
      <UButton :to="secondaryCta.to" variant="outline" size="lg">{{ secondaryCta.label }}</UButton>
    </div>
  </section>
</template>
