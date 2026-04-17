<script setup lang="ts">
type EntryNewContent = {
  title: string;
  description: string;
};

const fallbackContent: EntryNewContent = {
  title: "Log a Sip",
  description: "Add to Sip Log with a quick flavor snapshot.",
};

const { data: entryNewData } = await useAsyncData("entry-new-content", () =>
  queryCollection("content").path("/entries/new").first()
);

const content = computed(() => (entryNewData.value as EntryNewContent | null) ?? fallbackContent);
</script>

<template>
  <UCard>
    <div class="space-y-4">
      <h1 class="font-semibold text-stone-900">{{ content.title }}</h1>
      <p class="text-sm text-stone-500">{{ content.description }}</p>
      <AddEntryForm />
    </div>
  </UCard>
</template>
