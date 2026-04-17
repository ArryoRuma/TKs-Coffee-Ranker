<script setup lang="ts">
const { userEntries } = useMockData();
const entries = [...userEntries].sort((a, b) => b.dateConsumed.localeCompare(a.dateConsumed));

type DiaryContent = {
  title: string;
  empty: { title: string; body: string };
};

const fallbackContent: DiaryContent = {
  title: "Sip Log",
  empty: {
    title: "No sips logged yet.",
    body: "Start your Sip Log with your first great cup.",
  },
};

const { data: diaryData } = await useAsyncData("diary-content", () =>
  queryCollection("content").where("stem", "=", "diary/index").first()
);

const content = computed(() => (diaryData.value as DiaryContent | null) ?? fallbackContent);
</script>

<template>
  <div>
    <h1 class="mb-5 text-2xl font-semibold tracking-tight">{{ content.title }}</h1>
    <div class="space-y-4">
      <template v-if="entries.length">
        <EntryCard v-for="entry in entries" :key="entry.id" :entry="entry" />
      </template>
      <div v-else class="space-y-2 rounded-xl border border-dashed border-stone-300 bg-white p-6">
        <p class="font-medium text-stone-800">{{ content.empty.title }}</p>
        <p class="text-sm text-stone-600">{{ content.empty.body }}</p>
      </div>
    </div>
  </div>
</template>
