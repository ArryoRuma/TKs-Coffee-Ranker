<script setup lang="ts">
const { lists, demoUserId } = useMockData();

type ListsIndexContent = {
  title: string;
  actions: { create: string; cancel: string };
  form: {
    title: string;
    listName: string;
    description: string;
    makePublic: string;
    submit: string;
  };
  empty: string;
  labels: {
    public: string;
    private: string;
    sipSingular: string;
    sipPlural: string;
  };
};

const fallbackContent: ListsIndexContent = {
  title: "My Lists",
  actions: { create: "New List", cancel: "Cancel" },
  form: {
    title: "Create a new list",
    listName: "List name",
    description: "Description (optional)",
    makePublic: "Make this list public",
    submit: "Create List",
  },
  empty: "No lists yet. Create one to organise your sips.",
  labels: {
    public: "Public",
    private: "Private",
    sipSingular: "sip",
    sipPlural: "sips",
  },
};

const { data: listsIndexData } = await useAsyncData("lists-index-content", () =>
  queryCollection("content").path("/lists/index").first()
);

const content = computed(() => (listsIndexData.value as ListsIndexContent | null) ?? fallbackContent);
</script>

<template>
  <ListsManager :initial-lists="lists" :user-id="demoUserId" :copy="content" />
</template>
