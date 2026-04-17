<script setup lang="ts">
const { wantToTry } = useMockData();

type WannaSipContent = {
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

const fallbackContent: WannaSipContent = {
  title: "Wanna Sip",
  form: {
    title: "Add to your wishlist",
    drinkPlaceholder: "Drink (e.g. Geisha V60)",
    cafePlaceholder: "Cafe",
    cityPlaceholder: "City (optional)",
    submit: "Add to Wanna Sip",
  },
  empty: "Nothing in Wanna Sip yet. Save coffees you want to try next.",
};

const { data: wannaSipData } = await useAsyncData("wanna-sip-content", () =>
  queryCollection("content").where("stem", "=", "wanna-sip/index").first()
);

const content = computed(() => (wannaSipData.value as WannaSipContent | null) ?? fallbackContent);
</script>

<template>
  <WannaSipManager :initial-items="wantToTry" :copy="content" />
</template>
