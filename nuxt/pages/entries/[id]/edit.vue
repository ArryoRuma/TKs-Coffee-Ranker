<script setup lang="ts">
import { coffeeEntries } from "~/composables/useMockData";

const route = useRoute();
const id = route.params.id as string;
const entry = coffeeEntries.find((item) => item.id === id);

type EntryEditContent = {
  backLabel: string;
  title: string;
};

const fallbackContent: EntryEditContent = {
  backLabel: "Back to entry",
  title: "Edit Sip",
};

const { data: entryEditData } = await useAsyncData("entry-edit-content", () =>
  queryCollection("content").path("/entries/edit").first()
);

const content = computed(() => (entryEditData.value as EntryEditContent | null) ?? fallbackContent);

if (!entry) {
  throw createError({ statusCode: 404, statusMessage: "Entry not found" });
}

const initialValues = {
  title: entry.title,
  drinkType: entry.drinkType,
  cafe: entry.cafe,
  roaster: entry.roaster,
  rating: String(entry.rating),
  reviewBody: entry.reviewBody,
  dateConsumed: entry.dateConsumed,
  wouldOrderAgain: entry.wouldOrderAgain,
  visibility: entry.visibility,
  origin: entry.origin,
  roastLevel: entry.roastLevel,
  brewMethod: entry.brewMethod,
  tastingNotes: entry.tastingNotes,
};
</script>

<template>
  <div>
    <div class="mb-4">
      <NuxtLink :to="`/entries/${id}`" class="text-sm text-stone-500 hover:text-stone-800">
        ← {{ content.backLabel }}
      </NuxtLink>
    </div>
    <UCard>
      <div class="space-y-4">
        <h1 class="font-semibold text-stone-900">{{ content.title }}</h1>
        <AddEntryForm :initial-values="initialValues" />
      </div>
    </UCard>
  </div>
</template>
