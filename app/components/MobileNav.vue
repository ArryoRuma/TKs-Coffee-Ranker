<script setup lang="ts">
const route = useRoute();
const open = ref(false);

const navItems = [
  { to: "/dashboard", label: "Home" },
  { to: "/entries/new", label: "Log a Sip" },
  { to: "/diary", label: "Sip Log" },
  { to: "/top-sips", label: "Top Sips" },
  { to: "/saved-sips", label: "Saved Sips" },
  { to: "/wanna-sip", label: "Wanna Sip" },
  { to: "/profile", label: "Profile" },
];

watch(() => route.path, () => {
  open.value = false;
});
</script>

<template>
  <div class="md:hidden">
    <button
      :aria-label="open ? 'Close menu' : 'Open menu'"
      class="rounded-md p-1.5 text-stone-600 hover:text-stone-900"
      @click="open = !open"
    >
      <UIcon :name="open ? 'i-lucide-x' : 'i-lucide-menu'" class="size-5" />
    </button>

    <div
      v-if="open"
      class="absolute left-0 top-full z-50 w-full border-b border-stone-200 bg-stone-50 px-5 py-4 shadow-sm"
    >
      <nav class="flex flex-col gap-1">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="rounded-md px-3 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
          :class="{ 'bg-stone-100 text-stone-900': route.path === item.to }"
          @click="open = false"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>
