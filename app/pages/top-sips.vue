<script setup lang="ts">
import { demoUserId, coffeeEntries } from "~/composables/useMockData";

const topSips = coffeeEntries
  .filter((entry) => entry.userId === demoUserId && entry.favorite)
  .sort((a, b) => b.rating - a.rating);

type TopSipsContent = {
  title: string;
  empty: string;
};

const fallbackContent: TopSipsContent = {
  title: "Top Sips",
  empty: "Your Top Sips will show up here.",
};

const { data: topSipsData } = await useAsyncData("top-sips-content", () =>
  queryCollection("content").where("stem", "=", "top-sips/index").first()
);

const content = computed(() => (topSipsData.value as TopSipsContent | null) ?? fallbackContent);
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-semibold tracking-tight">{{ content.title }}</h1>
    <template v-if="topSips.length">
      <div v-for="(sip, index) in topSips" :key="sip.id" class="flex items-start gap-4">
        <span
          class="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-semibold text-amber-900"
        >
          {{ index + 1 }}
        </span>
        <div class="flex-1">
          <EntryCard :entry="sip" />
        </div>
      </div>
    </template>
    <p v-else class="text-stone-600">{{ content.empty }}</p>
  </div>
</template>
