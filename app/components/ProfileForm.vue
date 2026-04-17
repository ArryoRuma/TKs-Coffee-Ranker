<script setup lang="ts">
import type { AppUser, CoffeeEntry } from "~/utils/types";

const props = defineProps<{
  user: AppUser;
  entries: CoffeeEntry[];
  copy?: {
    tasteIdentityTitle: string;
    favoriteDrinkLabel: string;
    actions: { edit: string; save: string; cancel: string };
    placeholders: {
      displayName: string;
      homeCity: string;
      favoriteDrink: string;
      bio: string;
    };
  };
}>();

const copy = computed(() =>
  props.copy ?? {
    tasteIdentityTitle: "Taste identity",
    favoriteDrinkLabel: "Favourite drink",
    actions: { edit: "Edit", save: "Save", cancel: "Cancel" },
    placeholders: {
      displayName: "Display name",
      homeCity: "Home city",
      favoriteDrink: "Favourite drink",
      bio: "Bio",
    },
  }
);

const editing = ref(false);
const user = ref({ ...props.user });
const draft = ref({ ...props.user });

function startEdit() {
  draft.value = { ...user.value };
  editing.value = true;
}

function saveEdit() {
  user.value = { ...draft.value };
  editing.value = false;
  // TODO: call server API to persist profile
}

function cancelEdit() {
  draft.value = { ...user.value };
  editing.value = false;
}
</script>

<template>
  <div class="space-y-4">
    <UCard>
      <div class="space-y-3">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="font-semibold text-stone-900">{{ user.name }}</h2>
            <p class="text-sm text-stone-500">{{ user.handle }} &bull; {{ user.homeCity }}</p>
            <p v-if="!editing" class="mt-1.5 text-sm text-stone-700">{{ user.bio }}</p>
          </div>
          <UButton v-if="!editing" variant="outline" @click="startEdit">
            <UIcon name="i-lucide-pencil" class="mr-1.5 size-3.5" />
            {{ copy.actions.edit }}
          </UButton>
        </div>

        <div v-if="editing" class="space-y-3 border-t border-stone-100 pt-3">
          <div class="grid gap-3 sm:grid-cols-2">
            <UInput v-model="draft.name" :placeholder="copy.placeholders.displayName" />
            <UInput v-model="draft.homeCity" :placeholder="copy.placeholders.homeCity" />
            <UInput v-model="draft.favoriteDrink" :placeholder="copy.placeholders.favoriteDrink" />
          </div>
          <UTextarea v-model="draft.bio" :placeholder="copy.placeholders.bio" />
          <div class="flex gap-2">
            <UButton @click="saveEdit">{{ copy.actions.save }}</UButton>
            <UButton variant="ghost" @click="cancelEdit">{{ copy.actions.cancel }}</UButton>
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <div class="space-y-2">
        <h3 class="font-semibold text-stone-900">{{ copy.tasteIdentityTitle }}</h3>
        <p class="text-sm text-stone-500">
          {{ entries.length }} sip{{ entries.length !== 1 ? "s" : "" }} &bull;
          {{ entries.filter((e) => e.favorite).length }} top pick{{
            entries.filter((e) => e.favorite).length !== 1 ? "s" : ""
          }}
        </p>
        <p v-if="user.favoriteDrink" class="text-sm text-stone-700">
          {{ copy.favoriteDrinkLabel }}: {{ user.favoriteDrink }}
        </p>
      </div>
    </UCard>
  </div>
</template>
