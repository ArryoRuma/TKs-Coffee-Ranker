<script setup lang="ts">
import type { List } from "~/utils/types";

const props = defineProps<{
  initialLists: List[];
  userId: string;
  copy?: {
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
}>();

const copy = computed(() =>
  props.copy ?? {
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
  }
);

const lists = ref<List[]>([...props.initialLists]);
const showForm = ref(false);
const title = ref("");
const description = ref("");
const isPublic = ref(true);

let nextId = 100;

function createList() {
  if (!title.value.trim()) return;
  const newList: List = {
    id: `l${nextId++}`,
    userId: props.userId,
    title: title.value.trim(),
    description: description.value.trim(),
    isPublic: isPublic.value,
    entryIds: [],
  };
  lists.value.unshift(newList);
  title.value = "";
  description.value = "";
  isPublic.value = true;
  showForm.value = false;
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold tracking-tight">{{ copy.title }}</h1>
      <UButton variant="outline" @click="showForm = !showForm">
        <UIcon name="i-lucide-plus" class="mr-1.5 size-4" />
        {{ showForm ? copy.actions.cancel : copy.actions.create }}
      </UButton>
    </div>

    <UCard v-if="showForm">
      <div class="space-y-3">
        <h2 class="text-base font-semibold">{{ copy.form.title }}</h2>
        <UInput v-model="title" :placeholder="copy.form.listName" />
        <UTextarea v-model="description" :placeholder="copy.form.description" />
        <label class="flex items-center gap-2 text-sm text-stone-600">
          <input v-model="isPublic" type="checkbox" />
          {{ copy.form.makePublic }}
        </label>
        <UButton :disabled="!title.trim()" @click="createList">{{ copy.form.submit }}</UButton>
      </div>
    </UCard>

    <div v-if="lists.length" class="space-y-3">
      <NuxtLink v-for="list in lists" :key="list.id" :to="`/lists/${list.id}`" class="block">
        <UCard class="transition hover:border-stone-300">
          <div class="space-y-1">
            <div class="flex items-start justify-between gap-4">
              <h3 class="font-semibold text-stone-900">{{ list.title }}</h3>
              <span class="flex shrink-0 items-center gap-1 text-xs text-stone-500">
                <UIcon :name="list.isPublic ? 'i-lucide-globe' : 'i-lucide-lock'" class="size-3" />
                {{ list.isPublic ? copy.labels.public : copy.labels.private }}
              </span>
            </div>
            <p v-if="list.description" class="text-sm text-stone-500">{{ list.description }}</p>
            <p class="text-xs text-stone-400">
              {{ list.entryIds.length }}
              {{ list.entryIds.length === 1 ? copy.labels.sipSingular : copy.labels.sipPlural }}
            </p>
          </div>
        </UCard>
      </NuxtLink>
    </div>
    <p v-else class="text-stone-600">{{ copy.empty }}</p>
  </div>
</template>
