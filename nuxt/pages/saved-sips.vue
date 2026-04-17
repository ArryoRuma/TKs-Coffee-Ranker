<script setup lang="ts">
import { demoUserId, coffeeEntries } from "~/composables/useMockData";

const savedSips = coffeeEntries.filter(
  (entry) => entry.userId === demoUserId && entry.wouldOrderAgain
);

type SavedSipsContent = {
  title: string;
  empty: string;
};

const fallbackContent: SavedSipsContent = {
  title: "Saved Sips",
  empty: "No saved sips yet.",
};

const { data: savedSipsData } = await useAsyncData("saved-sips-content", () =>
  queryCollection("content").path("/saved-sips/index").first()
);

const content = computed(() => (savedSipsData.value as SavedSipsContent | null) ?? fallbackContent);
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-semibold tracking-tight">
      {{ content.title }}
      <span v-if="savedSips.length" class="ml-2 text-base font-normal text-stone-500">
        ({{ savedSips.length }})
      </span>
    </h1>
    <template v-if="savedSips.length">
      <EntryCard v-for="sip in savedSips" :key="sip.id" :entry="sip" />
    </template>
    <p v-else class="text-stone-600">{{ content.empty }}</p>
  </div>
</template>
