<script setup lang="ts">
import { coffeeEntrySchema, ROAST_LEVELS, BREW_METHODS } from "~/utils/validation";
import type { Visibility } from "~/utils/types";

type EntryFormState = {
  title: string;
  drinkType: string;
  cafe: string;
  roaster: string;
  rating: string;
  reviewBody: string;
  dateConsumed: string;
  wouldOrderAgain: boolean;
  visibility: Visibility;
  origin: string;
  roastLevel: string;
  brewMethod: string;
  tastingNotes: string[];
};

const props = withDefaults(
  defineProps<{ initialValues?: Partial<EntryFormState> }>(),
  { initialValues: () => ({}) }
);

const defaults: EntryFormState = {
  title: "",
  drinkType: "",
  cafe: "",
  roaster: "",
  rating: "8",
  reviewBody: "",
  dateConsumed: "",
  wouldOrderAgain: false,
  visibility: "PUBLIC",
  origin: "",
  roastLevel: "",
  brewMethod: "",
  tastingNotes: [],
};

const form = reactive<EntryFormState>({ ...defaults, ...props.initialValues });
const tagInput = ref("");
const error = ref<string | null>(null);

function addTag() {
  const tag = tagInput.value.trim().toLowerCase();
  if (tag && !form.tastingNotes.includes(tag)) {
    form.tastingNotes.push(tag);
  }
  tagInput.value = "";
}

function removeTag(tag: string) {
  form.tastingNotes = form.tastingNotes.filter((t) => t !== tag);
}

function onTagKeyDown(e: KeyboardEvent) {
  if (e.key === "Enter") {
    e.preventDefault();
    addTag();
  }
}

function onSubmit() {
  const result = coffeeEntrySchema.safeParse({
    ...form,
    rating: Number(form.rating),
    roastLevel: form.roastLevel || undefined,
    brewMethod: form.brewMethod || undefined,
    origin: form.origin || undefined,
    tastingNotes: form.tastingNotes.length ? form.tastingNotes : undefined,
  });

  if (!result.success) {
    error.value = result.error.issues[0]?.message ?? "Please fix form errors.";
    return;
  }

  error.value = null;
  // TODO: call server API to persist entry
  navigateTo("/diary");
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="onSubmit">
    <div class="grid gap-4 md:grid-cols-2">
      <UInput v-model="form.title" placeholder="Sip title" />
      <UInput v-model="form.drinkType" placeholder="Drink type (e.g. Flat White)" />
      <UInput v-model="form.cafe" placeholder="Cafe" />
      <UInput v-model="form.roaster" placeholder="Roaster" />
      <UInput
        v-model="form.rating"
        type="number"
        :min="1"
        :max="10"
        aria-label="Sip Score"
      />
      <UInput v-model="form.dateConsumed" type="date" />
      <UInput v-model="form.origin" placeholder="Origin (e.g. Ethiopia Yirgacheffe)" />
      <select
        v-model="form.roastLevel"
        aria-label="Roast level"
        class="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-600"
      >
        <option value="">Roast level (optional)</option>
        <option v-for="level in ROAST_LEVELS" :key="level" :value="level">{{ level }}</option>
      </select>
      <select
        v-model="form.brewMethod"
        aria-label="Brew method"
        class="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-600"
      >
        <option value="">Brew method (optional)</option>
        <option v-for="method in BREW_METHODS" :key="method" :value="method">{{ method }}</option>
      </select>
    </div>

    <!-- Tasting notes tag input -->
    <div class="space-y-2">
      <div class="flex gap-2">
        <UInput
          v-model="tagInput"
          placeholder="Add tasting note and press Enter"
          class="flex-1"
          @keydown="onTagKeyDown"
        />
        <UButton type="button" variant="outline" @click="addTag">Add</UButton>
      </div>
      <div v-if="form.tastingNotes.length" class="flex flex-wrap gap-2">
        <button
          v-for="note in form.tastingNotes"
          :key="note"
          type="button"
          class="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-900 hover:bg-amber-100"
          @click="removeTag(note)"
        >
          {{ note }}
          <UIcon name="i-lucide-x" class="size-2.5" />
        </button>
      </div>
    </div>

    <UTextarea
      v-model="form.reviewBody"
      placeholder="How did it taste?"
    />

    <div class="flex flex-wrap items-center gap-3 text-sm text-stone-700">
      <label class="inline-flex items-center gap-2">
        <input v-model="form.wouldOrderAgain" type="checkbox" />
        Save for Later
      </label>
      <label class="inline-flex items-center gap-2">
        Visibility
        <select
          v-model="form.visibility"
          class="rounded-md border border-stone-300 bg-white px-2 py-1"
        >
          <option value="PUBLIC">Public</option>
          <option value="FRIENDS">Friends</option>
          <option value="PRIVATE">Private</option>
        </select>
      </label>
    </div>

    <UButton type="submit">Add to Sip Log</UButton>
    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
  </form>
</template>
