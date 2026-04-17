<script setup lang="ts">
const props = defineProps<{ entryId: string }>();
const confirming = ref(false);

function handleDelete() {
  // TODO: call server API to delete entry
  navigateTo("/diary");
}
</script>

<template>
  <div v-if="confirming" class="flex items-center gap-2">
    <span class="text-sm text-stone-700">Delete this entry?</span>
    <UButton
      variant="outline"
      class="text-red-600 border-red-200 hover:bg-red-50"
      @click="handleDelete"
    >
      Yes, delete
    </UButton>
    <UButton variant="ghost" @click="confirming = false">Cancel</UButton>
  </div>
  <UButton v-else variant="outline" aria-label="Delete entry" @click="confirming = true">
    <UIcon name="i-lucide-trash-2" class="mr-1.5 size-3.5 text-red-500" />
    Delete
  </UButton>
</template>
