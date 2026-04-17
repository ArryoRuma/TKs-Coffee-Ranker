<script setup lang="ts">
type DemoEntry = {
  id: string;
  name: string;
  cafe: string;
  score: number;
  notes: string;
};

const runtimeConfig = useRuntimeConfig();
const demoMode = runtimeConfig.public.demoMode;

const { data: entries } = await useFetch<DemoEntry[]>("/api/entries");
</script>

<template>
  <div class="space-y-4">
    <UAlert
      v-if="demoMode"
      color="info"
      variant="subtle"
      title="Demo mode is enabled"
      description="Supabase wiring is configured, and this page currently renders local demo data."
    />

    <UCard v-for="entry in entries ?? []" :key="entry.id">
      <template #header>
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="font-semibold">{{ entry.name }}</p>
            <p class="text-sm text-muted">{{ entry.cafe }}</p>
          </div>
          <UBadge color="primary" variant="subtle"> {{ entry.score }}/10 </UBadge>
        </div>
      </template>

      <p class="text-sm">{{ entry.notes }}</p>
    </UCard>
  </div>
</template>
