<script setup lang="ts">
import { coffeeEntries } from "~/composables/useMockData";

const route = useRoute();
const id = route.params.id as string;
const entry = coffeeEntries.find((item) => item.id === id);

type EntryDetailContent = {
  actions: { edit: string };
  fields: {
    sipScore: string;
    saveForLater: string;
    yes: string;
    no: string;
  };
};

const fallbackContent: EntryDetailContent = {
  actions: { edit: "Edit" },
  fields: {
    sipScore: "Sip Score",
    saveForLater: "Save for Later",
    yes: "Yes",
    no: "No",
  },
};

const { data: entryDetailData } = await useAsyncData("entry-detail-content", () =>
  queryCollection("content").path("/entries/detail").first()
);

const content = computed(() => (entryDetailData.value as EntryDetailContent | null) ?? fallbackContent);

if (!entry) {
  throw createError({ statusCode: 404, statusMessage: "Entry not found" });
}
</script>

<template>
  <UCard>
    <div class="space-y-4">
      <div class="flex items-start justify-between gap-4">
        <div class="space-y-2">
          <h1 class="font-semibold text-stone-900">{{ entry.title }}</h1>
          <p class="text-sm text-stone-500">
            {{ entry.drinkType }} at {{ entry.cafe }} &bull; {{ entry.dateConsumed }}
          </p>
        </div>
        <div class="flex shrink-0 gap-2">
          <UButton :to="`/entries/${id}/edit`" variant="outline">
            <UIcon name="i-lucide-pencil" class="mr-1.5 size-3.5" />
            {{ content.actions.edit }}
          </UButton>
          <DeleteEntryButton :entry-id="id" />
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <UBadge color="primary" variant="subtle">{{ content.fields.sipScore }} {{ entry.rating }}/10</UBadge>
        <UBadge variant="subtle">{{ entry.origin }}</UBadge>
        <UBadge variant="subtle">{{ entry.brewMethod }}</UBadge>
        <UBadge variant="subtle">{{ entry.roastLevel }}</UBadge>
        <UBadge variant="subtle">{{ entry.visibility.toLowerCase() }}</UBadge>
      </div>

      <p class="text-stone-700">{{ entry.reviewBody }}</p>

      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="note in entry.tastingNotes"
          :key="note"
          color="warning"
          variant="subtle"
        >
          {{ note }}
        </UBadge>
      </div>

      <p class="text-sm text-stone-600">
        {{ content.fields.saveForLater }}: {{ entry.wouldOrderAgain ? content.fields.yes : content.fields.no }}
      </p>
    </div>
  </UCard>
</template>
