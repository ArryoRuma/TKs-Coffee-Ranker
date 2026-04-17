<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";

definePageMeta({ layout: "landing", colorMode: "dark" });

type FeatureCard = { title: string; body: string; icon?: string };
type MetricItem = { value: string; label: string; class?: string };

type LandingContent = {
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    supporting: string;
    primaryCta: { label: string; to: string };
    secondaryCta: { label: string; to: string };
  };
  socialProof: string;
  howItWorks: { headline: string; title: string; cards: FeatureCard[] };
  coreFeatures: { headline: string; title: string; description: string; cards: FeatureCard[] };
  metrics: { headline: string; title: string; description: string; items: MetricItem[] };
  valueProps: Array<{ title: string; body: string }>;
  cta: { title: string; body: string; button: { label: string; to: string } };
  footer: string;
};

const fallbackContent: LandingContent = {
  seo: {
    title: "Sippd | Track every sip",
    description: "Sippd is your personal coffee log to rate, review, and remember every cup.",
  },
  hero: {
    eyebrow: "Now with Wanna Sip lists",
    title: "Track every sip.",
    lead: "Sippd is your personal coffee log to rate, review, and remember every cup.",
    supporting: "From your morning latte to your weekend pour-over, never forget what you loved.",
    primaryCta: { label: "Log your first sip", to: "/dashboard" },
    secondaryCta: { label: "Explore Sips", to: "/diary" },
  },
  socialProof: "Join people who are finally remembering what they actually like.",
  howItWorks: {
    headline: "How it works",
    title: "Three steps to knowing your taste.",
    cards: [
      { title: "1. Log a Sip", body: "Add what you are drinking, where you got it, and your Sip Score.", icon: "i-lucide-pen-line" },
      { title: "2. Build Your Taste", body: "Over time, identify patterns in what you love and what you skip.", icon: "i-lucide-trending-up" },
      { title: "3. Never Forget a Great Cup", body: "Your Sip Log becomes your personal memory for coffee.", icon: "i-lucide-brain" },
    ],
  },
  coreFeatures: {
    headline: "Features",
    title: "Everything your coffee habit needs.",
    description: "From your first sip to your all-time favorites, Sippd has every tool to build your coffee memory.",
    cards: [
      { title: "Log Every Coffee", body: "Track drinks, cafes, roasters, and tasting notes in seconds.", icon: "i-lucide-coffee" },
      { title: "Sip Score", body: "Rate each coffee so your favorites naturally rise to the top.", icon: "i-lucide-star" },
      { title: "Your Sip Log", body: "Keep a clean, scrollable history of every coffee you had.", icon: "i-lucide-scroll-text" },
      { title: "Saved Sips", body: "Bookmark coffees you want to come back to.", icon: "i-lucide-bookmark" },
      { title: "Wanna Sip", body: "Maintain a running list of coffees, cafes, and beans to try next.", icon: "i-lucide-list-todo" },
      { title: "Top Sips", body: "See your all-time best coffees automatically organized.", icon: "i-lucide-trophy" },
    ],
  },
  metrics: {
    headline: "By the numbers",
    title: "Built around your coffee habit.",
    description: "Simple, fast, and yours. Every number that matters for building your personal coffee memory.",
    items: [
      { value: "< 5s", label: "Time to log", class: "text-primary" },
      { value: "100%", label: "Your data", class: "text-success" },
      { value: "∞", label: "Coffees tracked", class: "text-info" },
      { value: "0", label: "Forgotten great cups", class: "text-warning" },
    ],
  },
  valueProps: [
    {
      title: "Know your taste.",
      body: "Most people drink great coffee and forget it the next day. Sippd helps you build memory for what you enjoy so every next cup gets better.",
    },
    {
      title: "From first sip to favorite.",
      body: "Whether it is a quick cold brew or a carefully dialed espresso, every cup tells a story. Sippd keeps track of them all.",
    },
  ],
  cta: {
    title: "Start logging your coffee.",
    body: "It only takes one sip to start building your taste.",
    button: { label: "Log your first sip", to: "/dashboard" },
  },
  footer: "Sippd - your coffee, remembered.",
};

const { data: landingData } = await useAsyncData("landing-content", () =>
  queryCollection("content").path("/landing/home").first()
);

const content = computed(() => (landingData.value as LandingContent | null) ?? fallbackContent);

useSeoMeta({
  title: () => content.value.seo.title,
  description: () => content.value.seo.description,
});

const heroLinks = computed<ButtonProps[]>(() => [
  {
    label: content.value.hero.primaryCta.label,
    to: content.value.hero.primaryCta.to,
    color: "primary",
    size: "xl",
  },
  {
    label: content.value.hero.secondaryCta.label,
    to: content.value.hero.secondaryCta.to,
    color: "neutral",
    variant: "soft",
    trailingIcon: "i-lucide-arrow-right",
    size: "xl",
  },
]);

const ctaLinks = computed<ButtonProps[]>(() => [
  {
    label: content.value.cta.button.label,
    to: content.value.cta.button.to,
    color: "primary",
    size: "xl",
  },
]);
</script>

<template>
  <div>
    <!-- Hero -->
    <UPageHero
      :ui="{
        wrapper: 'flex flex-col items-center',
        title: 'sm:text-6xl lg:text-7xl tracking-tighter leading-[1.05]',
        description: 'mt-5 max-w-xl mx-auto text-base sm:text-lg leading-relaxed text-default',
        links: 'gap-3',
      }"
    >
      <template #headline>
        <UBadge
          color="neutral"
          variant="soft"
          :label="content.hero.eyebrow"
          class="rounded-full px-3 py-1.5 gap-1.5 bg-white/5 backdrop-blur"
        >
          <template #leading>
            <UChip inset standalone :ui="{ base: 'animate-pulse ring-0' }" />
          </template>
        </UBadge>
      </template>

      <template #title>
        {{ content.hero.title }}
      </template>

      <template #description>
        {{ content.hero.lead }}<br class="hidden sm:block">
        {{ content.hero.supporting }}
      </template>

      <template #links>
        <div class="flex flex-wrap justify-center gap-3">
          <UButton v-for="link in heroLinks" :key="link.label as string" v-bind="link" />
        </div>
      </template>
    </UPageHero>

    <!-- How it works -->
    <UPageSection
      :ui="{
        root: 'py-24 sm:py-32',
        container: 'max-w-5xl',
        headline: 'font-mono font-medium text-xs text-primary uppercase tracking-[0.12em] text-center',
        title: 'max-w-lg mx-auto',
      }"
      :headline="content.howItWorks.headline"
      :title="content.howItWorks.title"
    >
      <div class="rounded-2xl border border-default bg-default overflow-hidden">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-px">
          <UPageCard
            v-for="card in content.howItWorks.cards"
            :key="card.title"
            :icon="card.icon"
            :title="card.title"
            :description="card.body"
            variant="naked"
            class="rounded-none duration-300"
            :ui="{
              leading: 'mb-5 flex size-9 justify-center rounded-lg bg-primary/10',
              leadingIcon: 'size-5 text-primary',
              title: 'text-sm font-semibold tracking-tight',
              description: 'text-sm leading-relaxed text-dimmed mt-1',
            }"
          />
        </div>
      </div>
    </UPageSection>

    <!-- Features -->
    <UPageSection
      :ui="{
        root: 'py-24 sm:py-32',
        container: 'max-w-5xl',
        headline: 'font-mono font-medium text-xs text-primary uppercase tracking-[0.12em] text-center',
        title: 'max-w-lg mx-auto',
        description: 'max-w-md mx-auto text-dimmed',
      }"
      :headline="content.coreFeatures.headline"
      :title="content.coreFeatures.title"
      :description="content.coreFeatures.description"
    >
      <div class="rounded-2xl border border-default bg-default overflow-hidden">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px">
          <UPageCard
            v-for="card in content.coreFeatures.cards"
            :key="card.title"
            :icon="card.icon"
            :title="card.title"
            :description="card.body"
            variant="naked"
            class="rounded-none duration-300"
            :ui="{
              leading: 'mb-5 flex size-9 justify-center rounded-lg bg-primary/10',
              leadingIcon: 'size-5 text-primary',
              title: 'text-sm font-semibold tracking-tight',
              description: 'text-sm leading-relaxed sm:line-clamp-2 lg:line-clamp-3 text-dimmed mt-1',
            }"
          />
        </div>
      </div>
    </UPageSection>

    <!-- Metrics -->
    <UPageSection
      :ui="{
        root: 'py-24 sm:py-32',
        container: 'max-w-5xl',
        headline: 'font-mono font-medium text-xs text-primary uppercase tracking-[0.12em] text-center',
        title: 'max-w-lg mx-auto',
        description: 'max-w-md mx-auto text-dimmed',
      }"
      :headline="content.metrics.headline"
      :title="content.metrics.title"
      :description="content.metrics.description"
    >
      <div class="rounded-2xl border border-default bg-default overflow-hidden">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-px">
          <UPageCard
            v-for="metric in content.metrics.items"
            :key="metric.label"
            :title="metric.value"
            :description="metric.label"
            variant="naked"
            class="rounded-none duration-300"
            :ui="{
              container: 'text-center',
              wrapper: 'items-center',
              title: ['text-4xl font-bold tracking-tight leading-none', metric.class],
              description: 'font-mono text-xs uppercase tracking-[0.06em] text-dimmed mt-3',
            }"
          />
        </div>
      </div>
    </UPageSection>

    <!-- CTA -->
    <UPageCTA
      variant="naked"
      :title="content.cta.title"
      :description="content.cta.body"
      :links="ctaLinks"
      :ui="{
        root: 'py-24 sm:py-32',
        container: 'max-w-3xl text-center',
        title: 'lg:text-5xl tracking-tighter whitespace-pre-line',
        description: 'mx-auto max-w-sm leading-relaxed text-dimmed',
        links: 'justify-center',
      }"
    />

    <UContainer>
      <footer class="pb-8 text-center text-sm text-dimmed">{{ content.footer }}</footer>
    </UContainer>
  </div>
</template>
