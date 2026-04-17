<script setup lang="ts">
import { lists as allLists, coffeeEntries } from "~/composables/useMockData";

const route = useRoute();
const id = route.params.id as string;
const list = allLists.find((l) => l.id === id);

type ListsDetailContent = {
  backLabel: string;
  empty: string;
  labels: {
    public: string;
    private: string;
    sipSingular: string;
    sipPlural: string;
  };
};

const fallbackContent: ListsDetailContent = {
  backLabel: "Back to Lists",
  empty: "This list has no entries yet.",
  labels: {
    public: "Public",
    private: "Private",
    sipSingular: "sip",
    sipPlural: "sips",
  },
};

const { data: listsDetailData } = await useAsyncData("lists-detail-content", () =>
  queryCollection("content").where("stem", "=", "lists/detail").first()
);

const content = computed(() => (listsDetailData.value as ListsDetailContent | null) ?? fallbackContent);

if (!list) {
  throw createError({ statusCode: 404, statusMessage: "List not found" });
}

const entries = coffeeEntries.filter((e) => list.entryIds.includes(e.id));
</script>

<template>
  <div class="space-y-6">
    <div>
      <NuxtLink to="/lists" class="text-sm text-stone-500 hover:text-stone-800">
        ← {{ content.backLabel }}
      </NuxtLink>
    </div>

    <UCard>
      <div class="space-y-2">
        <div class="flex items-start justify-between gap-4">
          <h1 class="font-semibold text-stone-900">{{ list.title }}</h1>
          <span class="flex shrink-0 items-center gap-1 text-xs text-stone-500">
            <UIcon :name="list.isPublic ? 'i-lucide-globe' : 'i-lucide-lock'" class="size-3" />
            {{ list.isPublic ? content.labels.public : content.labels.private }}
          </span>
        </div>
        <p v-if="list.description" class="text-sm text-stone-500">{{ list.description }}</p>
        <p class="text-xs text-stone-400">
          {{ entries.length }}
          {{ entries.length === 1 ? content.labels.sipSingular : content.labels.sipPlural }}
        </p>
      </div>
    </UCard>

    <div v-if="entries.length" class="space-y-4">
      <EntryCard v-for="entry in entries" :key="entry.id" :entry="entry" />
    </div>
    <p v-else class="text-stone-600">{{ content.empty }}</p>
  </div>
</template>
