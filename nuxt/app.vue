<script setup lang="ts">
useHead({
  title: "TK's Coffee Ranker",
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
});
</script>

<template>
  <UApp>
    <UContainer class="py-8">
      <UPageHero
        title="TK's Coffee Ranker"
        description="Nuxt 4 + Nuxt UI + Supabase (demo mode)"
      />
      <NuxtPage />
    </UContainer>
  </UApp>
</template>
