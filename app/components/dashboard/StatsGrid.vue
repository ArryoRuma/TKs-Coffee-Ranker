<script setup lang="ts">
defineProps<{
  stats: Array<{ key: string; label: string; icon: string }>;
  values: Record<string, string | number>;
}>();
</script>

<template>
  <section class="grid gap-4 md:grid-cols-3">
    <UCard v-for="stat in stats" :key="stat.key">
      <div class="space-y-2">
        <UIcon :name="stat.icon" class="size-4 text-amber-700" />
        <p class="font-semibold text-stone-900">{{ values[stat.key] }}</p>
        <p class="text-sm text-stone-500">{{ stat.label }}</p>
      </div>
    </UCard>
  </section>
</template>
