<script setup lang="ts">
const { demoUser, userEntries } = useMockData();
const entries = userEntries;

type DashboardContent = {
  header: { eyebrow: string; title: string; description: string };
  stats: Array<{ key: string; label: string; icon: string }>;
  recent: { title: string; cta: { label: string; to: string } };
  emptyState: { title: string; body: string };
};

const fallbackContent: DashboardContent = {
  header: {
    eyebrow: "Home",
    title: "Welcome back, {firstName}",
    description: "Your Taste, Logged - all in one place.",
  },
  stats: [
    { key: "totalSips", label: "Total Sips", icon: "i-lucide-notebook-tabs" },
    { key: "topSips", label: "Top Sips", icon: "i-lucide-trophy" },
    { key: "signatureSip", label: "Signature Sip", icon: "i-lucide-coffee" },
  ],
  recent: {
    title: "Recent Sips",
    cta: { label: "Log a Sip", to: "/entries/new" },
  },
  emptyState: {
    title: "No Recent Sips yet.",
    body: "Start with your first great cup.",
  },
};

const { data: dashboardData } = await useAsyncData("dashboard-content", () =>
  queryCollection("content").where("stem", "=", "dashboard/overview").first()
);

const content = computed(() => (dashboardData.value as DashboardContent | null) ?? fallbackContent);
const firstName = computed(() => demoUser.name.split(" ")[0] ?? demoUser.name);
const welcomeTitle = computed(() => content.value.header.title.replace("{firstName}", firstName.value));

const statValues = computed(() => ({
  totalSips: entries.length,
  topSips: entries.filter((entry) => entry.favorite).length,
  signatureSip: demoUser.favoriteDrink,
}));
</script>

<template>
  <div class="space-y-8">
    <section class="space-y-2">
      <p class="text-sm uppercase tracking-[0.2em] text-stone-500">{{ content.header.eyebrow }}</p>
      <h1 class="text-3xl font-semibold tracking-tight">{{ welcomeTitle }}</h1>
      <p class="text-stone-600">{{ content.header.description }}</p>
    </section>

    <DashboardStatsGrid :stats="content.stats" :values="statValues" />

    <section class="flex items-center justify-between">
      <h2 class="text-2xl font-semibold tracking-tight">{{ content.recent.title }}</h2>
      <UButton :to="content.recent.cta.to">{{ content.recent.cta.label }}</UButton>
    </section>

    <section class="grid gap-4 md:grid-cols-2">
      <template v-if="entries.length">
        <EntryCard v-for="entry in entries" :key="entry.id" :entry="entry" />
      </template>
      <UCard v-else>
        <div>
          <p class="font-semibold text-stone-900">{{ content.emptyState.title }}</p>
          <p class="text-sm text-stone-500">{{ content.emptyState.body }}</p>
        </div>
      </UCard>
    </section>
  </div>
</template>
