<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";

definePageMeta({
  layout: "landing",
  colorMode: "dark",
});

type LandingItem = {
  icon?: string;
  title: string;
  description: string;
};

type LandingMetric = {
  value: string;
  label: string;
  class?: string;
};

type LandingPage = {
  seo?: { title?: string; description?: string };
  title: string;
  description: string;
  hero: {
    headline: string;
    supporting: string;
    links: ButtonProps[];
  };
  socialProof?: string;
  howItWorks: {
    headline: string;
    title: string;
    description?: string;
    items: LandingItem[];
  };
  features: {
    headline: string;
    title: string;
    description: string;
    items: LandingItem[];
  };
  metrics: {
    headline: string;
    title: string;
    description: string;
    items: LandingMetric[];
  };
  valueProps?: Array<{ title: string; body: string }>;
  cta: {
    title: string;
    description: string;
    command?: string;
    links: ButtonProps[];
  };
  footer?: string;
};

const { data: page } = await useAsyncData("landing-home", () =>
  queryCollection("content").where("stem", "=", "landing/home").first()
);

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Landing content not found", fatal: true });
}

const landingPage = computed(() => page.value as unknown as LandingPage);

const title = computed(() => landingPage.value?.seo?.title || landingPage.value?.title || "Sippd");
const description = computed(
  () => landingPage.value?.seo?.description || landingPage.value?.description || "Track every sip"
);

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
});

const heroTitle = computed(() => {
  const [primary = "", ...secondaryParts] = (landingPage.value?.title ?? "").split("\n");

  return {
    primary,
    secondary: secondaryParts.join(" ").trim(),
  };
});

function enterMotion(delay: number = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  };
}

function scrollMotion(delay: number = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    inViewOptions: { once: true, amount: 1 },
    transition: { duration: 0.6, delay },
  };
}

function staggerMotion(index: number = 0) {
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    inViewOptions: { once: true, amount: 1 },
    transition: { duration: 0.6, delay: index * 0.08 },
  };
}

const { copy, copied } = useClipboard();
</script>

<template>
  <div>
    <UPageHero
      :ui="{
        root: 'pb-24 sm:pb-32',
        container: 'relative z-10 lg:py-32',
        wrapper: 'flex flex-col items-center',
        title: 'sm:text-6xl lg:text-7xl xl:text-[80px] tracking-tighter leading-[1.05]',
        description: 'mt-5 max-w-xl mx-auto text-base sm:text-lg leading-relaxed text-default',
        links: 'gap-3',
      }"
    >
      <template #headline>
        <Motion v-bind="enterMotion(0.2)">
          <UBadge
            color="neutral"
            variant="soft"
            :label="landingPage.hero.headline"
            class="rounded-full px-3 py-1.5 gap-1.5 bg-white/5 backdrop-blur"
          >
            <template #leading>
              <UChip inset standalone :ui="{ base: 'animate-pulse ring-0' }" />
            </template>
          </UBadge>
        </Motion>
      </template>

      <template #title>
        <Motion as="span" v-bind="enterMotion(0.35)" class="inline-block">
          {{ heroTitle.primary }}
          <br v-if="heroTitle.secondary">
          <span
            v-if="heroTitle.secondary"
            class="animate-shimmer bg-size-[200%_auto] bg-clip-text text-transparent"
            :style="{
              backgroundImage:
                'linear-gradient(135deg, var(--ui-primary), color-mix(in oklab, var(--ui-primary), white 28%), var(--ui-primary))',
              animationDuration: '10s',
            }"
          >
            {{ heroTitle.secondary }}
          </span>
        </Motion>
      </template>

      <template #description>
        <Motion as="span" v-bind="enterMotion(0.5)" class="inline-block">
          {{ landingPage.description }}<br class="hidden sm:block">
          {{ landingPage.hero.supporting }}
        </Motion>
      </template>

      <template #links>
        <Motion class="flex flex-wrap justify-center gap-3" v-bind="enterMotion(0.65)">
          <UButton
            v-for="link in landingPage.hero.links"
            :key="String(link.label)"
            v-bind="link"
          />
        </Motion>
      </template>

      <Motion class="mt-10" v-bind="scrollMotion(0.85)">
        <p class="font-mono uppercase text-xs tracking-[0.12em] text-dimmed text-center">
          {{ landingPage.socialProof }}
        </p>
      </Motion>
    </UPageHero>

    <UPageSection
      id="how-it-works"
      :ui="{
        root: 'py-24 sm:py-32',
        container: 'max-w-5xl',
        headline: 'font-mono font-medium text-xs text-primary uppercase tracking-[0.12em] text-center',
        title: 'max-w-lg mx-auto',
        description: 'max-w-md mx-auto text-dimmed',
      }"
    >
      <template #headline>
        <Motion as="span" v-bind="scrollMotion()" class="inline-block">
          {{ landingPage.howItWorks.headline }}
        </Motion>
      </template>

      <template #title>
        <Motion as="span" v-bind="scrollMotion(0.1)" class="inline-block">
          {{ landingPage.howItWorks.title }}
        </Motion>
      </template>

      <template #description>
        <Motion as="span" v-bind="scrollMotion(0.2)" class="inline-block">
          {{ landingPage.howItWorks.description }}
        </Motion>
      </template>

      <div class="rounded-2xl border border-default bg-default overflow-hidden">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-px">
          <Motion
            v-for="(item, index) in landingPage.howItWorks.items"
            :key="item.title"
            v-bind="staggerMotion(index)"
          >
            <UPageCard
              :icon="item.icon"
              :title="item.title"
              :description="item.description"
              class="rounded-none duration-300"
              variant="naked"
              :ui="{
                leading: 'mb-5 flex size-9 justify-center rounded-lg bg-primary/10',
                leadingIcon: 'size-5 text-primary',
                title: 'text-sm tracking-tight font-semibold',
                description: 'text-sm leading-relaxed text-dimmed',
              }"
            />
          </Motion>
        </div>
      </div>
    </UPageSection>

    <UPageSection
      id="features"
      :ui="{
        root: 'py-24 sm:py-32',
        container: 'max-w-5xl',
        headline: 'font-mono font-medium text-xs text-primary uppercase tracking-[0.12em] text-center',
        title: 'max-w-lg mx-auto',
        description: 'max-w-md mx-auto text-dimmed',
      }"
    >
      <template #headline>
        <Motion as="span" v-bind="scrollMotion()" class="inline-block">
          {{ landingPage.features.headline }}
        </Motion>
      </template>

      <template #title>
        <Motion as="span" v-bind="scrollMotion(0.1)" class="inline-block">
          {{ landingPage.features.title }}
        </Motion>
      </template>

      <template #description>
        <Motion as="span" v-bind="scrollMotion(0.2)" class="inline-block">
          {{ landingPage.features.description }}
        </Motion>
      </template>

      <div class="rounded-2xl border border-default bg-default overflow-hidden">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px">
          <Motion
            v-for="(feature, index) in landingPage.features.items"
            :key="feature.title"
            v-bind="staggerMotion(index)"
          >
            <UPageCard
              :icon="feature.icon"
              :title="feature.title"
              :description="feature.description"
              class="rounded-none duration-300"
              variant="naked"
              :ui="{
                leading: 'mb-5 flex size-9 justify-center rounded-lg bg-primary/10',
                leadingIcon: 'size-5 text-primary',
                title: 'text-sm tracking-tight font-semibold',
                description: 'text-sm leading-relaxed sm:line-clamp-2 lg:line-clamp-3 text-dimmed',
              }"
            />
          </Motion>
        </div>
      </div>
    </UPageSection>

    <UPageSection
      id="metrics"
      :ui="{
        root: 'py-24 sm:py-32',
        container: 'max-w-5xl',
        headline: 'font-mono font-medium text-xs text-primary uppercase tracking-[0.12em] text-center',
        title: 'max-w-lg mx-auto',
        description: 'max-w-md mx-auto text-dimmed',
      }"
    >
      <template #headline>
        <Motion as="span" v-bind="scrollMotion()" class="inline-block">
          {{ landingPage.metrics.headline }}
        </Motion>
      </template>

      <template #title>
        <Motion as="span" v-bind="scrollMotion(0.1)" class="inline-block">
          {{ landingPage.metrics.title }}
        </Motion>
      </template>

      <template #description>
        <Motion as="span" v-bind="scrollMotion(0.2)" class="inline-block">
          {{ landingPage.metrics.description }}
        </Motion>
      </template>

      <div class="rounded-2xl border border-default bg-default overflow-hidden">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-px">
          <Motion
            v-for="(metric, index) in landingPage.metrics.items"
            :key="metric.label"
            v-bind="staggerMotion(index)"
          >
            <UPageCard
              :title="metric.value"
              :description="metric.label"
              class="rounded-none duration-300"
              variant="naked"
              :ui="{
                root: 'text-center',
                wrapper: 'items-center',
                title: ['text-4xl font-bold tracking-tight leading-none', metric.class],
                description: 'font-mono text-xs uppercase tracking-[0.06em] text-dimmed mt-3',
              }"
            />
          </Motion>
        </div>
      </div>
    </UPageSection>

    <UPageCTA
      variant="naked"
      :ui="{
        root: 'py-24 sm:py-32',
        container: 'max-w-3xl text-center',
        title: 'lg:text-5xl tracking-tighter whitespace-pre-line',
        description: 'mx-auto max-w-sm leading-relaxed text-dimmed',
      }"
    >
      <template #title>
        <Motion as="span" v-bind="scrollMotion()" class="inline-block">
          {{ landingPage.cta.title }}
        </Motion>
      </template>

      <template #description>
        <Motion as="span" v-bind="scrollMotion(0.1)" class="inline-block">
          {{ landingPage.cta.description }}
        </Motion>
      </template>

      <template #links>
        <Motion class="flex flex-col items-center justify-center gap-6" v-bind="scrollMotion(0.2)">
          <UButton
            v-for="link in landingPage.cta.links"
            :key="String(link.label)"
            v-bind="link"
            size="xl"
          />

          <UButton
            v-if="landingPage.cta.command"
            :label="landingPage.cta.command"
            :trailing-icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
            color="neutral"
            variant="subtle"
            class="font-mono font-light text-toned gap-4"
            size="xl"
            :ui="{ trailingIcon: 'size-5' }"
            @click="copy(landingPage.cta.command)"
          />
        </Motion>
      </template>
    </UPageCTA>

    <UContainer v-if="landingPage.footer">
      <footer class="pb-8 text-center text-sm text-dimmed">{{ landingPage.footer }}</footer>
    </UContainer>
  </div>
</template>
