<script setup lang="ts">
import type { WantToTryItem } from "~/utils/types";

const props = defineProps<{
  initialItems: WantToTryItem[];
  copy?: {
    title: string;
    form: {
      title: string;
      drinkPlaceholder: string;
      cafePlaceholder: string;
      cityPlaceholder: string;
      submit: string;
    };
    empty: string;
  };
}>();

const copy = computed(() =>
  props.copy ?? {
    title: "Wanna Sip",
    form: {
      title: "Add to your wishlist",
      drinkPlaceholder: "Drink (e.g. Geisha V60)",
      cafePlaceholder: "Cafe",
      cityPlaceholder: "City (optional)",
      submit: "Add to Wanna Sip",
    },
    empty: "Nothing in Wanna Sip yet. Save coffees you want to try next.",
  }
);

const items = ref<WantToTryItem[]>([...props.initialItems]);
const drink = ref("");
const cafe = ref("");
const city = ref("");

let nextId = 100;

function addItem() {
  if (!drink.value.trim() || !cafe.value.trim()) return;
  items.value.unshift({
    id: `w${nextId++}`,
    cafe: cafe.value.trim(),
    drink: drink.value.trim(),
    city: city.value.trim(),
  });
  drink.value = "";
  cafe.value = "";
  city.value = "";
}

function removeItem(id: string) {
  items.value = items.value.filter((item) => item.id !== id);
}
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-semibold tracking-tight">{{ copy.title }}</h1>

    <UCard>
      <div class="space-y-3">
        <h2 class="text-base font-semibold">{{ copy.form.title }}</h2>
        <div class="grid gap-3 sm:grid-cols-3">
          <UInput v-model="drink" :placeholder="copy.form.drinkPlaceholder" />
          <UInput v-model="cafe" :placeholder="copy.form.cafePlaceholder" />
          <UInput v-model="city" :placeholder="copy.form.cityPlaceholder" />
        </div>
        <UButton :disabled="!drink.trim() || !cafe.trim()" @click="addItem">
          {{ copy.form.submit }}
        </UButton>
      </div>
    </UCard>

    <div v-if="items.length" class="space-y-3">
      <UCard v-for="sip in items" :key="sip.id">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3 class="font-semibold text-stone-900">{{ sip.drink }}</h3>
            <p class="text-sm text-stone-500">
              {{ sip.cafe }}{{ sip.city ? ` • ${sip.city}` : "" }}
            </p>
          </div>
          <button
            aria-label="Remove from wishlist"
            class="mt-0.5 shrink-0 rounded p-1 text-stone-400 hover:text-red-500"
            @click="removeItem(sip.id)"
          >
            <UIcon name="i-lucide-trash-2" class="size-4" />
          </button>
        </div>
      </UCard>
    </div>
    <p v-else class="text-stone-600">{{ copy.empty }}</p>
  </div>
</template>
