<script setup lang="ts">
import type { CoffeeEntry } from "~/utils/types";

defineProps<{
  entry: CoffeeEntry;
}>();
</script>

<template>
  <UCard>
    <div class="space-y-3">
      <div class="flex items-start justify-between gap-4">
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <h3 class="text-lg font-semibold text-stone-900">
              <NuxtLink :to="`/entries/${entry.id}`" class="hover:underline">
                {{ entry.title }}
              </NuxtLink>
            </h3>
            <UIcon
              v-if="entry.favorite"
              name="i-lucide-heart"
              class="size-4 shrink-0 text-amber-600"
              aria-label="Top sip"
            />
          </div>
          <p class="text-sm text-stone-500">
            {{ entry.cafe }} &bull; {{ entry.roaster }} &bull; {{ entry.location }}
          </p>
          <p class="mt-0.5 text-xs text-stone-400">{{ entry.dateConsumed }}</p>
        </div>
        <div class="flex shrink-0 items-center gap-2">
          <UBadge color="primary" variant="subtle">Sip Score {{ entry.rating }}/10</UBadge>
          <NuxtLink
            :to="`/entries/${entry.id}/edit`"
            aria-label="Edit entry"
            class="rounded p-1 text-stone-400 hover:text-stone-700"
          >
            <UIcon name="i-lucide-pencil" class="size-3.5" />
          </NuxtLink>
        </div>
      </div>

      <p class="text-sm text-stone-700">{{ entry.reviewBody }}</p>

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
    </div>
  </UCard>
</template>
