<script setup lang="ts">
definePageMeta({ layout: "landing" });

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
  howItWorks: { title: string; cards: Array<{ title: string; body: string }> };
  coreFeatures: { title: string; cards: Array<{ title: string; body: string }> };
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
    eyebrow: "Sippd",
    title: "Track every sip.",
    lead: "Sippd is your personal coffee log to rate, review, and remember every cup.",
    supporting: "From your morning latte to your weekend pour-over, never forget what you loved.",
    primaryCta: { label: "Log your first sip", to: "/dashboard" },
    secondaryCta: { label: "Explore Sips", to: "/diary" },
  },
  socialProof: "Join people who are finally remembering what they actually like.",
  howItWorks: {
    title: "How it works",
    cards: [
      { title: "1. Log a Sip", body: "Add what you are drinking, where you got it, and your Sip Score." },
      { title: "2. Build Your Taste", body: "Over time, identify patterns in what you love and what you skip." },
      { title: "3. Never Forget a Great Cup", body: "Your Sip Log becomes your personal memory for coffee." },
    ],
  },
  coreFeatures: {
    title: "Core features",
    cards: [
      { title: "Log Every Coffee", body: "Track drinks, cafes, roasters, and tasting notes in seconds." },
      { title: "Sip Score", body: "Rate each coffee so your favorites naturally rise to the top." },
      { title: "Your Sip Log", body: "Keep a clean, scrollable history of every coffee you had." },
      { title: "Saved Sips", body: "Bookmark coffees you want to come back to." },
      { title: "Wanna Sip", body: "Maintain a running list of coffees, cafes, and beans to try next." },
      { title: "Top Sips", body: "See your all-time best coffees automatically organized." },
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
</script>

<template>
  <main class="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-5 py-16 md:gap-14">
    <MarketingLandingHero v-bind="content.hero" />

    <p class="text-center text-lg text-stone-700">
      {{ content.socialProof }}
    </p>

    <MarketingContentCardSection
      :title="content.howItWorks.title"
      :cards="content.howItWorks.cards"
      columns="3"
    />

    <MarketingContentCardSection
      :title="content.coreFeatures.title"
      :cards="content.coreFeatures.cards"
      columns="2"
    />

    <MarketingValuePropsGrid :value-props="content.valueProps" />

    <MarketingLandingCta
      :title="content.cta.title"
      :body="content.cta.body"
      :button="content.cta.button"
    />

    <footer class="pb-2 text-center text-sm text-stone-500">{{ content.footer }}</footer>
  </main>
</template>
